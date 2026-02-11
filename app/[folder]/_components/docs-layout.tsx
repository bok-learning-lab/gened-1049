'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

interface ContentItem {
  slug: string;
  title: string;
  path: string;
  isDirectory: boolean;
  children?: ContentItem[];
}

interface DocsLayoutProps {
  folder: string;
  navigation: ContentItem[];
  currentPath?: string;
  children: React.ReactNode;
  /**
   * Optional prefix for sidebar links (e.g. `/x/paper`). Default route uses empty string.
   */
  basePath?: string;
}

export function DocsLayout({ folder, navigation, currentPath, children, basePath }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-md print:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <ThemeToggle />
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-950 border-r border-gray-300 dark:border-gray-800
          overflow-y-auto z-40 transition-transform duration-300 print:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 block"
          >
            gened-1049
          </Link>
          <Sidebar navigation={navigation} folder={folder} currentPath={currentPath} basePath={basePath} />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-0 print:m-0">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-12 print:max-w-none print:p-0">
          {children}
        </div>
      </main>
    </div>
  );
}
