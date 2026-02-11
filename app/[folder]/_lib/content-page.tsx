import { notFound } from 'next/navigation';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { getContentFolders, getContentNavigation, getDoc, type ContentItem } from './content';
import { DocsLayout } from '../_components/docs-layout';
import { MDXContent } from '../_components/mdx-content';
import { mdxComponents } from '../_components/mdx';

export type StylePreset = {
  /**
   * A small, curated set of styles we generate static params for.
   * (The route will still work for any style name; this is just for SSG.)
   */
  stylesForSSG: string[];
  /**
   * Tailwind classes applied to the <article>.
   */
  articleClassName: (style?: string) => string;
};

export const stylePreset: StylePreset = {
  stylesForSSG: ['default', 'paper', 'mono'],
  articleClassName: (style?: string) => {
    const base =
      'prose prose-slate dark:prose-invert max-w-none ' +
      'prose-headings:font-extrabold prose-headings:tracking-tight ' +
      'prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl ' +
      'prose-a:text-blue-600 dark:prose-a:text-blue-400 ' +
      'prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950';

    if (!style || style === 'default') return base;

    if (style === 'paper') {
      return (
        base +
        ' rounded-xl border border-gray-200 dark:border-gray-800 ' +
        'bg-white/70 dark:bg-gray-950/40 shadow-sm ' +
        'p-6 md:p-10'
      );
    }

    if (style === 'mono') {
      return base + ' font-mono prose-headings:font-semibold';
    }

    // Unknown style: fall back to base (but keep route working).
    return base;
  },
};

function findFirstDoc(items: ContentItem[]): ContentItem | null {
  for (const item of items) {
    if (!item.isDirectory) return item;
    if (item.children && item.children.length > 0) {
      const found = findFirstDoc(item.children);
      if (found) return found;
    }
  }
  return null;
}

export function assertValidFolder(folder: string) {
  const folders = getContentFolders();
  if (!folders.includes(folder)) notFound();
}

export function resolveDocPath(folder: string, slug: string[]): string[] {
  if (slug.length > 0) return slug;

  // If no slug, try README or index, otherwise first available doc in nav.
  const readmeDoc = getDoc(folder, ['README']);
  if (readmeDoc) return ['README'];

  const indexDoc = getDoc(folder, ['index']);
  if (indexDoc) return ['index'];

  const navigation = getContentNavigation(folder);
  const firstDoc = findFirstDoc(navigation);
  if (!firstDoc) notFound();

  return firstDoc.path.split('/').filter(Boolean);
}

export async function compileDocToComponent(source: string, filePath?: string) {
  // Use 'md' format for .md files (more permissive with HTML), 'mdx' for .mdx files
  const format = filePath?.endsWith('.mdx') ? 'mdx' : 'md';

  const compiled = await compile(source, {
    outputFormat: 'function-body',
    format,
    development: process.env.NODE_ENV === 'development',
  });
  const { default: Content } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  // Return a component that injects the global MDX components
  return function MDXPage() {
    return <Content components={mdxComponents} />;
  };
}

function TagList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-6 not-prose">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export async function renderContentPage(opts: {
  folder: string;
  slug?: string[];
  /**
   * Prefix used for sidebar links. Example: '' (default) or `/x/paper`.
   */
  basePath?: string;
  /**
   * Style name used to adjust the article look.
   */
  style?: string;
}) {
  const { folder, slug = [], basePath, style } = opts;

  assertValidFolder(folder);

  const docPath = resolveDocPath(folder, slug);
  const doc = getDoc(folder, docPath);
  if (!doc) notFound();

  const navigation = getContentNavigation(folder);
  const tags = Array.isArray(doc.metadata.tags) ? doc.metadata.tags : [];

  let Content: React.ComponentType;
  try {
    Content = await compileDocToComponent(doc.content, doc.path);
  } catch (error) {
    console.error('MDX compilation error:', error);
    notFound();
  }

  return (
    <DocsLayout
      folder={folder}
      navigation={navigation}
      currentPath={docPath.join('/')}
      basePath={basePath}
    >
      <article className={stylePreset.articleClassName(style)}>
        {doc.metadata.title && (
          <h1 className="text-4xl tracking-tight mb-2" style={{ fontWeight: 900 }}>{doc.metadata.title}</h1>
        )}
        <TagList tags={tags} />
        <MDXContent>
          <Content />
        </MDXContent>
      </article>
    </DocsLayout>
  );
}
