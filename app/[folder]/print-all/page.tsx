import { getContentFolders, getContentNavigation, getDoc, type ContentItem } from '../_lib/content';
import { notFound } from 'next/navigation';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from '../_components/mdx';
import { MDXContent } from '../_components/mdx-content';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    folder: string;
  }>;
}

export async function generateStaticParams() {
  const folders = getContentFolders();
  return folders.map((folder) => ({ folder }));
}

export async function generateMetadata({ params }: PageProps) {
  const { folder } = await params;
  return {
    title: `Print All - ${folder} - GENED 1049`,
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

// Flatten all docs from navigation tree
function getAllDocs(items: ContentItem[], folder: string): { title: string | null; content: string; path: string; filePath: string; tags: string[] }[] {
  const docs: { title: string | null; content: string; path: string; filePath: string; tags: string[] }[] = [];

  for (const item of items) {
    if (item.isDirectory && item.children) {
      docs.push(...getAllDocs(item.children, folder));
    } else if (!item.isDirectory && !item.href) {
      const slugPath = item.path.split('/').filter(Boolean);
      const doc = getDoc(folder, slugPath);
      if (doc) {
        docs.push({
          title: doc.metadata.title || null,
          content: doc.content,
          path: item.path,
          filePath: doc.path,
          tags: Array.isArray(doc.metadata.tags) ? doc.metadata.tags : [],
        });
      }
    }
  }

  return docs;
}

export default async function PrintAllPage({ params }: PageProps) {
  const { folder } = await params;

  if (!getContentFolders().includes(folder)) {
    notFound();
  }

  const navigation = getContentNavigation(folder);
  const allDocs = getAllDocs(navigation, folder);

  // Sort alphabetically by title
  allDocs.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));

  // Compile all docs
  const compiledDocs = await Promise.all(
    allDocs.map(async (doc) => {
      // Use 'md' format for .md files (more permissive with HTML), 'mdx' for .mdx files
      const format = doc.filePath.endsWith('.mdx') ? 'mdx' : 'md';
      const compiled = await compile(doc.content, {
        outputFormat: 'function-body',
        format,
        development: process.env.NODE_ENV === 'development',
      });
      const { default: Content } = await run(compiled, {
        ...runtime,
        baseUrl: import.meta.url,
      });
      return { ...doc, Content };
    })
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12 print:max-w-none print:p-8">
        <div className="mb-8 print:hidden">
          <Link
            href={`/${folder}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to {folder}
          </Link>
        </div>

        <div className="space-y-16 print:space-y-0">
          {compiledDocs.map((doc, index) => (
            <article
              key={doc.path}
              className={`prose prose-slate dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 ${index > 0 ? 'print:break-before-page' : ''}`}
            >
              {doc.title && (
                <h1 className="text-4xl tracking-tight mb-2" style={{ fontWeight: 900 }}>{doc.title}</h1>
              )}
              <TagList tags={doc.tags} />
              <MDXContent>
                <doc.Content components={mdxComponents} />
              </MDXContent>
              {index < compiledDocs.length - 1 && (
                <hr className="mt-16 border-gray-300 dark:border-gray-700 print:hidden" />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
