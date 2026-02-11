/**
 * Global MDX components
 *
 * These components are automatically available in all MDX files
 * without needing to import them.
 *
 * To add a new component:
 * 1. Create the component file in this folder
 * 2. Export it from this index file
 * 3. Add it to the `mdxComponents` object below
 */

/**
 * Components available globally in MDX files.
 * Keys are the component names used in MDX.
 */
export const mdxComponents = {
  // You can add custom components here:
  // Callout,
  // Counter,
  // etc.

  // You can also override default HTML elements here:
  // a: CustomLink,
  // img: CustomImage,
  // pre: CustomCodeBlock,
};

export type MDXComponents = typeof mdxComponents;
