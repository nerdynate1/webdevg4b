Star Catering — Next.js + Tailwind app
=====================================

Modern, simple, and responsive UI for the Star Catering business. Built with Next.js App Router, Tailwind CSS, and shadcn/ui-style components.

Features
- Sidebar navigation (desktop) with: Home, Contact Us, Venues, FAQ, Occasions — implemented using shadcn/ui Sidebar primitives (components/ui/sidebar.tsx)
- Mobile hamburger menu with slide-in navigation drawer
- Shopping Cart in the top bar with live item count and Checkout page
- Light/Dark mode toggle with persistence
- Font size controls (A- / A+) system-wide
- Simulated Stripe checkout via API route with client-side credit card validation (Luhn, expiry, CVC)
- Toast notifications (sonner) when adding dishes to cart
- Skeleton loading state during payment processing on Checkout (shadcn/ui-style Skeleton)

Routes
- / — Home with example dishes and Add to Cart actions
- /contact — Contact form
- /venues — Sample venues
- /faq — Common questions
- /occasions — Occasions we serve
- /checkout — Order summary and payment form
- /api/checkout — Mock payment endpoint (POST)

Components
- components/ui/sidebar.tsx — Minimal shadcn/ui-compatible Sidebar primitives used by components/sidebar.tsx.
- components/ui/button.tsx — shadcn/ui-style Button with variants and asChild support.
- components/ui/skeleton.tsx — shadcn/ui-style Skeleton used for payment loading state.

Notes on shadcn/ui
- The project includes a minimal in-repo implementation of the Sidebar primitives to avoid external code generation. You can replace or extend with official shadcn/ui components at any time.

Getting Started
1. Install deps
   npm install
2. Run in development
   npm run dev
3. Open http://localhost:3000

Notes
- Payments are simulated. Use any Luhn-valid card number, e.g., 4242 4242 4242 4242, a future expiry (MM/YY), and 3-4 digit CVC.
- Theme preference and font size are stored in localStorage.
- If the cart is empty, the Checkout page shows an empty state and hides the payment form.
