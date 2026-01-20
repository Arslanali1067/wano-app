# Stars - Next.js Website

A modern investment app landing page built with Next.js, converted from a Webflow template.

## Features

- 🎨 Modern dark theme with golden accent colors
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 (App Router)
- 🎭 CSS Modules for scoped styling
- 📝 Blog system with dynamic routes
- ✨ Smooth animations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Add your images:

Replace the placeholder images in `/public/images/` with your actual images:
- `stars-logo.svg` - Your logo
- `cta-background.webp` - CTA section background
- `blog/blog-1.jpg` through `blog/blog-5.jpg` - Blog post images
- `favicon.png` - Your favicon

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
stars-nextjs/
├── public/
│   ├── icons/           # SVG icons
│   └── images/          # Images and blog photos
├── src/
│   ├── app/
│   │   ├── blog/        # Blog listing page
│   │   ├── post/[slug]/ # Dynamic blog post pages
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable components
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   └── Navbar.tsx
│   └── data/
│       └── blogPosts.ts # Blog post data
├── package.json
└── README.md
```

## Components

- **Navbar** - Responsive navigation with mobile menu
- **HeroSection** - Animated hero section with headline
- **BlogCard** - Individual blog post card
- **BlogGrid** - Grid layout for blog posts
- **CTASection** - Call-to-action with email form
- **Footer** - Site footer with links

## Customization

### Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --golden: #f5cc07;
  --background: #0b0b15;
  --background-light: #10101a;
  --text-primary: #fff;
  --text-secondary: #7d7d7d;
}
```

### Fonts

The site uses:
- **Instrument Serif** - For headings
- **Roboto** - For body text

### Blog Posts

Edit blog data in `src/data/blogPosts.ts` to add, remove, or modify blog posts.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This site can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Self-hosted

## License

This project is for educational purposes.
