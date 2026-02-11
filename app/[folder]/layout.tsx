import { Inter } from 'next/font/google';
import { ThemeScript } from './_components/theme-script';
import './styles.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function FolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeScript />
      <div className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </div>
    </>
  );
}
