
WEBSITE DOMAIN NAME: webdevg4b-catering.vercel.app
=====================================
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


Our Company: 

-Why we chose Star Catering?

We chose the name Star Catering because we believe it represents a certain level of excellence that our company aims to achieve, using a star as symbolism to represent being popular or "famous" for our high quality service and food. It evokes a bright and clean image, reflecting quality. The name Star Catering was also chosen due to a lack of businesses in the area sharing the same or similar title, allowing our company to stand out as unique while also avoiding potential copyright issues. 

We chose the catering industry as the basis for our company because it allowed for a robust implementation of the projects requirements, including checkout and payment features as well as an easily understandable baseline to include information on the company under a variety of different pages. Catering industries are a common yet underlooked part of the everyday world and are used at essentially every event serving food involving a large enough group of people. 

Our startup is special because with web UI implementation it allows for a headache free experience for customers looking to select a catering package by allowing customized ordering directly through the site rather than having to reach out to a company rep to make a selection. It offers a modernized way to select catering for any occasion. 