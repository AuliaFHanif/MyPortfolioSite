# ✨ Y2K Portfolio Website ✨

A modern portfolio website with nostalgic Y2K aesthetics, built with Next.js, TypeScript, and Tailwind CSS.

![Y2K Portfolio](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎨 Features

- **Y2K Aesthetic Design** - Nostalgic early 2000s web design with modern functionality
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript** - Fully typed for better development experience
- **Component-Based Architecture** - Modular and reusable components
- **Smooth Animations** - Engaging hover effects and transitions
- **SEO Optimized** - Meta tags and semantic HTML for better search visibility
- **Fast Performance** - Built with Next.js App Router for optimal loading speeds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/y2k-portfolio.git
   cd y2k-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
y2k-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with navbar & footer
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   ├── projects/
│   │   │   └── page.tsx        # Projects page
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DecorativeElements.tsx
│   │   ├── home/               # Home page components
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── QuickInfo.tsx
│   │   │   └── FeaturedProjects.tsx
│   │   ├── projects/           # Project components
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectGrid.tsx
│   │   ├── about/              # About page components
│   │   │   ├── AboutContent.tsx
│   │   │   └── SkillsGrid.tsx
│   │   └── contact/            # Contact components
│   │       ├── ContactForm.tsx
│   │       └── SocialLinks.tsx
│   └── lib/
│       ├── types.ts            # TypeScript types
│       └── data.ts             # Mock data
├── public/
│   ├── images/                 # Image assets
│   └── projects/               # Project screenshots
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## ⚙️ Configuration

### 1. Update Personal Information

Edit `src/lib/data.ts` to add your:
- Projects
- Skills
- Social media links

### 2. Add Your Photo

Place your profile photo at:
```
public/images/profile.jpg
```

Then update `HeroBanner.tsx` to use it:
```tsx
<Image 
  src="/images/profile.jpg" 
  alt="Your Name"
  fill
  className="object-cover"
/>
```

### 3. Customize Content

- **Name**: Search for "[YOUR NAME]" and replace throughout
- **Bio**: Update text in `components/about/AboutContent.tsx`
- **Hero Banner**: Edit `components/home/HeroBanner.tsx`
- **Projects**: Add to `lib/data.ts` and add images to `public/projects/`

### 4. Update Metadata

Edit `src/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your custom description',
};
```

## 🎨 Customization

### Colors

The project uses Tailwind CSS. Main colors can be customized in components:
- **Purple**: `purple-200`, `purple-300`, `purple-600`
- **Pink**: `pink-200`, `pink-300`, `pink-400`
- **Yellow**: `yellow-200`, `yellow-300`, `yellow-400`
- **Blue**: `blue-200`, `blue-300`, `blue-400`

### Fonts

Default font is `Courier New` (monospace). To change, edit `src/app/globals.css`:
```css
:root {
  font-family: 'Your-Font-Name', monospace;
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and use in the appropriate page
3. Follow the Y2K design pattern (borders, shadows, bold colors)

## 📦 Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```


## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint


## 📧 Contact

Aulia Farhan Hanif - [@cartephilius](https://twitter.com/cartephilius) - fhanif180902@email.com

Project Link: [https://github.com/AuliaFHanif/MyPortfolioSite](https://github.com/AuliaFHanif/MyPortfolioSite)

---

Made by Aulia Farhan Hanif
THIS IS A VIBECODED PROJECT

