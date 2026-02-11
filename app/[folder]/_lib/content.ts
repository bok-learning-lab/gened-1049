import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// In a monorepo, the _content folder is at the root
// Check if _content exists in current dir, otherwise go up to monorepo root
const localContentDir = path.join(process.cwd(), '_content');
const rootContentDir = path.join(process.cwd(), '..', '..', '_content');
const contentDirectory = fs.existsSync(localContentDir) ? localContentDir : rootContentDir;

// _meta.json schema types
interface MetaEntry {
  title?: string;
  type?: 'page' | 'section';
  href?: string;
  hidden?: boolean;
  collapsed?: boolean;
}

type MetaValue = string | MetaEntry;
type MetaFile = Record<string, MetaValue>;

// _category_.json schema for folder metadata (Docusaurus-style)
interface CategoryMeta {
  label?: string;
  position?: number;
  collapsed?: boolean;
}

export interface ContentItem {
  slug: string;
  title: string;
  path: string;
  isDirectory: boolean;
  children?: ContentItem[];
  hidden?: boolean;
  collapsed?: boolean;
  href?: string;
  position?: number; // For sorting: items with position sort first, then alphabetically
}

export interface DocMetadata {
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface Doc {
  slug: string;
  content: string;
  metadata: DocMetadata;
  path: string;
}

/**
 * Get all content folders (e.g., 'manual')
 */
export function getContentFolders(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Load _meta.json from a directory if it exists
 */
function loadMeta(dirPath: string): MetaFile | null {
  const metaPath = path.join(dirPath, '_meta.json');
  if (!fs.existsSync(metaPath)) {
    return null;
  }
  try {
    const content = fs.readFileSync(metaPath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Parse a meta value into normalized fields
 */
function parseMetaValue(value: MetaValue): MetaEntry {
  if (typeof value === 'string') {
    return { title: value };
  }
  return value;
}

/**
 * Load _category_.json from a directory if it exists (Docusaurus-style folder metadata)
 */
function loadCategoryMeta(dirPath: string): CategoryMeta | null {
  const categoryPath = path.join(dirPath, '_category_.json');
  if (!fs.existsSync(categoryPath)) {
    return null;
  }
  try {
    const content = fs.readFileSync(categoryPath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Sort content items by position, then alphabetically.
 * Items with position come first (sorted by position), then items without position (sorted alphabetically).
 * Directories sort before files when positions are equal or both undefined.
 */
function sortContentItems(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) => {
    const aHasPosition = a.position !== undefined;
    const bHasPosition = b.position !== undefined;

    // Items with position come before items without
    if (aHasPosition && !bHasPosition) return -1;
    if (!aHasPosition && bHasPosition) return 1;

    // Both have position: sort by position
    if (aHasPosition && bHasPosition) {
      if (a.position !== b.position) {
        return a.position! - b.position!;
      }
      // Same position: directories first, then alphabetically
    }

    // Both without position (or same position): directories first, then alphabetically
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Recursively get all markdown files in a directory
 */
function getMarkdownFiles(dir: string, basePath: string = ''): ContentItem[] {
  const fullPath = path.join(contentDirectory, dir, basePath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const meta = loadMeta(fullPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  // Build a map of existing files/folders for quick lookup
  const existingItems = new Map<string, { entry: fs.Dirent; slug: string }>();
  for (const entry of entries) {
    if (entry.name === '_meta.json' || entry.name === '_category_.json') continue;

    if (entry.isDirectory()) {
      existingItems.set(entry.name, { entry, slug: entry.name });
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const slug = entry.name.replace(/\.(md|mdx)$/, '');
      existingItems.set(slug, { entry, slug });
    }
  }

  const items: ContentItem[] = [];
  const processedSlugs = new Set<string>();

  // Helper to create a ContentItem from an entry
  const createItem = (slug: string, entry: fs.Dirent, metaEntry?: MetaEntry): ContentItem => {
    const relativePath = path.join(basePath, entry.name);
    const fullEntryPath = path.join(fullPath, entry.name);

    if (entry.isDirectory()) {
      // Load _category_.json for folder metadata (Docusaurus-style)
      const categoryMeta = loadCategoryMeta(fullEntryPath);
      return {
        slug,
        // Priority: _meta.json title > _category_.json label > folder name
        title: metaEntry?.title || categoryMeta?.label || slug,
        path: relativePath,
        isDirectory: true,
        children: getMarkdownFiles(dir, relativePath),
        hidden: metaEntry?.hidden,
        collapsed: metaEntry?.collapsed ?? categoryMeta?.collapsed,
        position: categoryMeta?.position,
      };
    } else {
      const fileContents = fs.readFileSync(fullEntryPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        // Priority: _meta.json title > frontmatter nav_title > frontmatter title > filename
        title: metaEntry?.title || data.nav_title || data.title || slug,
        path: relativePath.replace(/\.(md|mdx)$/, ''),
        isDirectory: false,
        hidden: metaEntry?.hidden,
        position: data.sidebar_position,
      };
    }
  };

  // If meta exists, use its key order
  if (meta) {
    for (const [key, value] of Object.entries(meta)) {
      const metaEntry = parseMetaValue(value);

      // Handle external links (no corresponding file)
      if (metaEntry.href) {
        items.push({
          slug: key,
          title: metaEntry.title || key,
          path: key,
          isDirectory: false,
          href: metaEntry.href,
          hidden: metaEntry.hidden,
        });
        processedSlugs.add(key);
        continue;
      }

      // Find matching file/folder
      const existing = existingItems.get(key);
      if (existing) {
        items.push(createItem(existing.slug, existing.entry, metaEntry));
        processedSlugs.add(key);
      }
    }

    // Add orphan items (not in meta) at the end, sorted by position then alphabetically
    const orphans: ContentItem[] = [];
    for (const [slug, { entry }] of existingItems) {
      if (!processedSlugs.has(slug)) {
        orphans.push(createItem(slug, entry));
      }
    }
    items.push(...sortContentItems(orphans));
  } else {
    // No meta: sort by position then alphabetically
    for (const [slug, { entry }] of existingItems) {
      items.push(createItem(slug, entry));
    }
    sortContentItems(items);
  }

  // Filter out hidden items
  return items.filter(item => !item.hidden);
}

/**
 * Get navigation structure for a content folder
 */
export function getContentNavigation(folder: string): ContentItem[] {
  return getMarkdownFiles(folder);
}

/**
 * Get a specific doc by folder and slug path
 */
export function getDoc(folder: string, slugPath: string[]): Doc | null {
  if (slugPath.length === 0) {
    return null;
  }

  const filePath = path.join(contentDirectory, folder, ...slugPath);

  // Try .mdx first, then .md
  let fullPath = `${filePath}.mdx`;
  if (!fs.existsSync(fullPath)) {
    fullPath = `${filePath}.md`;
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: slugPath.join('/'),
    content,
    metadata: data,
    path: fullPath,
  };
}

/**
 * Get all possible paths for a content folder
 */
export function getAllDocPaths(folder: string): string[][] {
  const items = getMarkdownFiles(folder);
  const paths: string[][] = [];

  function traverse(items: ContentItem[], currentPath: string[] = []) {
    for (const item of items) {
      if (item.isDirectory) {
        traverse(item.children || [], [...currentPath, item.slug]);
      } else {
        paths.push([...currentPath, item.slug]);
      }
    }
  }

  traverse(items);
  return paths;
}
