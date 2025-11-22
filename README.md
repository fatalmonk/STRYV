# STRYV – Modern Football Streetwear Frontend

High-performance, Next.js-powered e-commerce experience for the STRYV brand.

This repository contains the production-grade frontend for STRYV: a football-heritage-inspired streetwear brand.
The app is designed for speed, scalability, and premium visual storytelling.

---

## 🚀 Tech Stack

* **Next.js 14 (App Router)** - React framework with file-based routing
* **React 18** - UI library
* **TypeScript** - Type safety
* **Tailwind CSS** - Utility-first styling
* **Framer Motion** - Hero animations, scroll-based transitions
* **Lenis Smooth Scroll** - Smooth scrolling experience
* **Next/Image** - Optimized image loading
* **Context API** - Cart state management
* **Modular Architecture** - Components organized under `/components/stryv`

---

## 🧱 Features

### ⚡ Hero + Parallax System

* Sticky cinematic hero animation
* Parallax story section powered by Framer Motion + Lenis

### 🛒 Full Cart System

* Add to Cart
* Quantity controls
* Drawer cart
* Checkout modal
* Persistent cart state

### 🎽 Dynamic Product Collections

* Vintage Collection
* Iconic Moments Collection
* Shared `ProductCard` component
* Optimized images

### ⭐ Testimonials Section

* Clean card layout
* Rated feedback
* Fully typed with domain models

---

## 📁 Project Structure

```
src/
│
├── app/
│   └── page.tsx                # Landing entry
│
├── components/
│   └── stryv/
│       ├── StryvLandingRoot.tsx
│       │
│       ├── layout/
│       │   ├── StryvNavbar.tsx
│       │   └── StryvFooter.tsx
│       │
│       ├── sections/
│       │   ├── StickyHero.tsx
│       │   ├── ParallaxStorySection.tsx
│       │   ├── VintageCollectionSection.tsx
│       │   ├── MomentsCollectionSection.tsx
│       │   └── TestimonialsSection.tsx
│       │
│       ├── product/
│       │   ├── CartDrawer.tsx
│       │   └── CheckoutModal.tsx
│       │
│       └── ui/
│           └── ProductCard.tsx
│
├── context/
│   └── CartContext.tsx
│
└── lib/
    └── stryv/
        ├── types.ts
        ├── products.ts
        └── testimonials.ts
```

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

App runs at:
<http://localhost:3000>

---

## 🚀 Production Build

```bash
npm run build
npm run start
```

---

## 🧪 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 🔒 Commit Guidelines (Conventional Commits)

This repo uses Conventional Commits:

`<type>(optional scope): <short summary>`

* `feat`: add new feature
* `fix`: fix a bug
* `docs`: documentation only
* `style`: formatting, missing semicolons, no code change
* `refactor`: code restructure with no behavior change
* `perf`: improve performance
* `test`: adding tests
* `build`: build system changes
* `ci`: CI/CD configuration changes
* `chore`: repo maintenance

**Examples:**

* `feat(cart): add quantity update logic`
* `fix(navbar): prevent body scroll when menu is open`
* `refactor(products): extract ProductCard component`
* `docs(readme): update tech stack documentation`

---

## 🔧 Husky + Lint-Staged Setup

To enforce code quality before every commit, use the following setup.

Install dependencies:

```bash
npm install --save-dev husky lint-staged
```

Enable Husky:

```bash
npx husky install
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

Create Husky pre-commit hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

This ensures:

* Every commit is linted
* Every commit is formatted
* No broken code enters the repo

---

## 🤝 License

MIT
