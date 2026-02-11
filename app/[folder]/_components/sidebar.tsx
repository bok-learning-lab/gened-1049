'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ExternalLink, FileText, Folder, Printer } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../_lib/utils';

interface ContentItem {
  slug: string;
  title: string;
  path: string;
  isDirectory: boolean;
  children?: ContentItem[];
  hidden?: boolean;
  collapsed?: boolean;
  href?: string;
}

interface SidebarProps {
  navigation: ContentItem[];
  folder: string;
  currentPath?: string;
  /**
   * Optional prefix for links (e.g. `/x/paper`). Default route uses empty string.
   */
  basePath?: string;
}

function joinHref(basePath: string | undefined, folder: string, itemPath: string) {
  const base = (basePath || '').replace(/\/+$/, '');
  const full = `${base}/${folder}${itemPath ? `/${itemPath}` : ''}`;
  return full.replace(/\/+/g, '/');
}

export function Sidebar({ navigation, folder, currentPath, basePath }: SidebarProps) {
  const pathname = usePathname();
  const printAllHref = joinHref(basePath, folder, 'print-all');

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <NavItem
          key={item.path}
          item={item}
          folder={folder}
          currentPath={currentPath}
          basePath={basePath}
          level={0}
        />
      ))}

      <div className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700">
        <Link
          href={printAllHref}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
            'hover:bg-gray-200 dark:hover:bg-gray-900',
            'text-gray-600 dark:text-gray-400'
          )}
        >
          <Printer className="h-4 w-4" />
          <span>Print All</span>
        </Link>
      </div>
    </nav>
  );
}

interface NavItemProps {
  item: ContentItem;
  folder: string;
  currentPath?: string;
  level: number;
  basePath?: string;
}

function NavItem({ item, folder, currentPath, level, basePath }: NavItemProps) {
  // Use collapsed from meta, default to open for level 0
  const [isOpen, setIsOpen] = useState(item.collapsed !== undefined ? !item.collapsed : level === 0);
  const pathname = usePathname();
  const href = joinHref(basePath, folder, item.path);
  const isActive = currentPath === item.path || pathname === href;

  if (item.isDirectory) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            'hover:bg-gray-200 dark:hover:bg-gray-900',
            'text-gray-800 dark:text-gray-200',
            level > 0 && 'pl-6'
          )}
        >
          <ChevronRight
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen && 'rotate-90'
            )}
          />
          <Folder className="h-4 w-4" />
          <span>{item.title}</span>
        </button>
        {isOpen && item.children && item.children.length > 0 && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <NavItem
                key={child.path}
                item={child}
                folder={folder}
                currentPath={currentPath}
                basePath={basePath}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // External link
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-start gap-2 px-3 py-2 rounded-md text-sm transition-colors',
          'hover:bg-gray-200 dark:hover:bg-gray-900',
          'text-gray-800 dark:text-gray-200',
          level > 0 && 'pl-6'
        )}
      >
        <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>{item.title}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'flex items-start gap-2 px-3 py-2 rounded-md text-sm transition-colors',
        'hover:bg-gray-200 dark:hover:bg-gray-900',
        isActive
          ? 'bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium'
          : 'text-gray-800 dark:text-gray-200',
        level > 0 && 'pl-6'
      )}
    >
      <FileText className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <span>{item.title}</span>
    </Link>
  );
}
