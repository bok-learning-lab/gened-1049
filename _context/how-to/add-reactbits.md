# How to Add React Bits Components

React Bits is a collection of high-quality, interactive components for React applications. This guide covers how to add React Bits components to this project.

## Available Component Categories

### Text Effects
- Split Text, Blur Text, Circular Text, Text Type, Shuffle, Shiny Text
- Text Pressure, Curved Loop, Fuzzy Text, Gradient Text, Text Trail
- Falling Text, Text Cursor, Decrypted Text, True Focus, Scroll Float
- Scroll Reveal, ASCII Text, Scrambled Text, Rotating Text, Glitch Text
- Scroll Velocity, Variable Proximity, Count Up

### Interactive Elements
- Animated Content, Fade Content, Electric Border, Pixel Transition
- Glare Hover, Logo Loop, Target Cursor, Laser Flow, Magnet Lines
- Gradual Blur, Click Spark, Magnet, Sticker Peel, Pixel Trail
- Cubes, Metallic Paint, Noise, Shape Blur, Crosshair, Image Trail
- Ribbons, Splash Cursor, Meta Balls, Blob Cursor, Star Border

### Navigation & Layout
- Animated List, Scroll Stack, Bubble Menu, Magic Bento, Circular Gallery
- Card Nav, Stack, Fluid Glass, Pill Nav, Tilted Card, Masonry
- Glass Surface, Dome Gallery, Chroma Grid, Folder, Staggered Menu
- Model Viewer, Lanyard, Profile Card, Dock, Gooey Nav, Pixel Card
- Carousel, Spotlight Card, Flying Posters, Card Swap, Infinite Scroll
- Glass Icons, Decay Card, Flowing Menu, Elastic Slider, Counter
- Infinite Menu, Rolling Gallery, Stepper, Bounce Cards

### Backgrounds & Effects
- Liquid Ether, Prism, Dark Veil, Silk, Light Rays, Pixel Blast
- Aurora, Plasma, Particles, Gradient Blinds, Beams, Lightning
- Prismatic Burst, Galaxy, Dither, Faulty Terminal, Ripple Grid
- Dot Grid, Threads, Hyperspeed, Iridescence, Waves, Grid Distortion
- Ballpit, Orb, Letter Glitch, Grid Motion, Squares, Liquid Chrome, Balatro

## Installation Methods

### Method 1: Manual Installation (Recommended)

This is the straightforward approach that gives you full control over the code.

#### Steps:

1. **Pick a component** from the React Bits documentation
2. **Install dependencies** if required:
   ```bash
   pnpm install gsap  # Example for GSAP-based components
   ```
3. **Copy the component code** from the Code tab
4. **Create the component file** in your project (typically in `src/components/`)
5. **Import and use** the component in your pages

#### Example Usage:

```typescript
import SplitText from "./SplitText";

<SplitText
  text="Hello, you!"
  delay={100}
  duration={0.6}
/>
```

### Method 2: CLI Installation

React Bits also provides CLI commands for automated installation (check their documentation for latest CLI usage).

## Integration Guidelines

### File Organization
- Place React Bits components in `src/components/ui/` or `src/components/effects/`
- Use descriptive names that match the component functionality
- Group related components in subdirectories if needed
- **Naming convention**: keep shadcn-generated primitives in kebab-case (e.g. `dropdown-menu.tsx`) so `npx shadcn add` and `npx shadcn diff` can overwrite them cleanly, and use PascalCase for hand-authored React Bits features (e.g. `PrismaticBurst.tsx`) to mirror the exported component names and play nicely with IDE auto-imports.

### Styling Integration
- React Bits components work well with our Tailwind CSS + shadcn/ui setup
- Many components use CSS custom properties that integrate with our theming system
- Test dark mode compatibility for each component

### Performance Considerations
- Some components use GSAP or other animation libraries
- Consider lazy loading for heavy animation components
- Test performance impact on mobile devices

### Common Dependencies
React Bits components may require these packages:
```bash
pnpm install gsap framer-motion three @react-three/fiber
```

## Tips for Success

1. **Start simple** - Try text effects or basic animations first
2. **Check dependencies** - Always install required packages before copying code
3. **Test thoroughly** - Verify components work in both light and dark modes
4. **Customize freely** - The code is yours to modify and style as needed
5. **Performance first** - Monitor bundle size and runtime performance

## Example: Adding Prismatic Burst Background

Here's a step-by-step example of adding the Prismatic Burst background effect:

### 1. Install Dependencies
```bash
pnpm install ogl
```

### 2. Create the Component
Create `src/components/effects/prismatic-burst.tsx` with the complete code from React Bits:

```typescript
'use client'

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

// Full component code available from React Bits website
// Copy the complete TypeScript code including:
// - Vertex and fragment shaders
// - WebGL setup and uniforms
// - Animation logic and mouse interaction
// - Props interface and component implementation
```

Also create `src/components/effects/prismatic-burst.css`:

```css
.prismatic-burst-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

### 3. Component Props
The Prismatic Burst component accepts these props:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `intensity` | number | 2 | Overall brightness multiplier applied after accumulation |
| `speed` | number | 0.5 | Global time multiplier controlling ray motion & distortion |
| `animationType` | "rotate" \| "rotate3d" \| "hover" | "rotate3d" | Core motion style: planar rotation, full 3D rotation, or pointer hover orbit |
| `colors` | string[] | [] | Optional array of hex colors used as a gradient (otherwise spectral) |
| `distort` | number | 0 | Amount of bend/distortion applied to marching space (adds organic wobble) |
| `paused` | boolean | false | Freeze time progression when true (animation stops) |
| `offset` | { x?: number\|string; y?: number\|string } | { x: 0, y: 0 } | Pixel (or CSS length) offset of focal origin from center |
| `hoverDampness` | number | 0 | Smoothing factor (0-1) for pointer tracking when animationType='hover' |
| `rayCount` | number | undefined | If > 0 applies an angular comb filter to produce discrete ray spokes |
| `mixBlendMode` | CSSProperties['mixBlendMode'] \| 'none' | "lighten" | Canvas CSS mix-blend-mode (e.g. lighten, screen) or 'none' for normal |

### 4. Basic Usage
```typescript
import PrismaticBurst from '@/components/effects/prismatic-burst'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background effect */}
      <div className="fixed inset-0 -z-10">
        <PrismaticBurst
          intensity={2}
          speed={0.5}
          animationType="rotate3d"
          mixBlendMode="lighten"
        />
      </div>

      {/* Your page content */}
      <div className="relative z-10">
        {/* Content goes here */}
      </div>
    </div>
  )
}
```

### 5. Customization Examples
```typescript
// Custom colors
<PrismaticBurst
  colors={["#ff0000", "#00ff00", "#0000ff"]}
  intensity={1.5}
/>

// Hover interaction
<PrismaticBurst
  animationType="hover"
  hoverDampness={0.3}
  speed={0.8}
/>

// Discrete ray effect
<PrismaticBurst
  rayCount={12}
  distort={0.2}
  intensity={3}
/>
```

### 6. Performance Considerations
- Uses WebGL via OGL library for optimal performance
- Consider reducing `intensity` and `speed` on mobile devices
- Use `paused={true}` to stop animation when not visible
- Test mix-blend-mode compatibility across browsers

## Troubleshooting

- **Hydration errors**: Add `suppressHydrationWarning` to components with complex animations
- **Theme conflicts**: Ensure CSS custom properties align with our shadcn/ui theme
- **Bundle size**: Use dynamic imports for heavy components
- **TypeScript errors**: Add proper type definitions for external libraries
- **WebGL issues**: Ensure browser supports WebGL, provide fallbacks for older browsers
- **Mix-blend-mode**: Test across different browsers as support may vary
