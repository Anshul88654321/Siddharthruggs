# Rug Haven — Rug Shop Website

A simple, fast, static website for a small rug business. Customers browse
rugs, add them to a cart, and place their order by sending a pre-filled
message on WhatsApp. There is no backend, no database, no login, and no
online payment — just plain HTML, CSS, and JavaScript.

## What's inside

```
rug-store/
├── index.html         Home page
├── shop.html           Product grid (all rugs)
├── product.html         Single rug detail page
├── cart.html            Cart page
├── about.html            About page
├── contact.html           Contact page
├── css/
│   └── style.css         All styling
├── js/
│   ├── config.js          Business name + WhatsApp number (EDIT THIS)
│   ├── products.js         Rug catalog (EDIT THIS)
│   ├── cart.js               Cart logic (localStorage)
│   ├── main.js                 Shared header/footer
│   ├── shop.js                   Shop page logic
│   ├── product.js                  Product page logic
│   └── cart-page.js                  Cart page logic
└── images/               6 sample rug images (SVG placeholders)
```

There is no build step, no framework, and no npm dependencies. It's plain
HTML/CSS/JS that runs directly in the browser.

## 1. Run it locally

Because the pages load JavaScript files, you need to serve them over
a local web server (opening the HTML files directly with `file://` will
block the scripts in some browsers). Any simple static server works:

**Option A — Python (already installed on most machines):**
```bash
cd rug-store
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

**Option B — VS Code:**
Install the "Live Server" extension, right-click `index.html`, and choose
"Open with Live Server".

**Option C — Node's `serve` (if you have Node installed):**
```bash
npx serve rug-store
```

## 2. Change the products

Open `js/products.js`. Each rug is one entry in the `PRODUCTS` array:

```js
{
  id: 1,
  name: "Persian Beige",
  price: 4999,
  sizes: ["3x5 ft", "5x7 ft", "8x10 ft"],
  image: "images/rug1.svg",
  description: "Hand-knotted Persian-style rug...",
},
```

To add a rug: copy an existing block, give it a new unique `id`, and edit
the fields. To remove a rug: delete its block. To change price, sizes,
description, or name: just edit the value.

To use your own photos, drop image files into the `images/` folder (e.g.
`rug1.jpg`) and update the `image` path for that product, e.g.
`"images/rug1.jpg"`.

## 3. Change the WhatsApp number

Open `js/config.js`:

```js
whatsappNumber: "919876543210",
```

Use the full international number, digits only — no `+`, spaces, or
dashes. For example, an Indian number `+91 98765 43210` becomes
`"919876543210"`.

You can also edit `businessName`, `tagline`, `phone`, `email`, and
`address` in the same file — every page reads from here.

## 4. Push to GitHub

If this is a new project:
```bash
cd rug-store
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If you're updating an existing repo:
```bash
git add .
git commit -m "Update rugs"
git push
```

## 5. Deploy

This is a static site, so any static host works. Two easy options:

**GitHub Pages (free, no extra account needed):**
1. Push the project to a GitHub repository (see above).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save. Your site will be live at
   `https://<your-username>.github.io/<your-repo>/` within a minute or two.

**Netlify (also free):**
1. Go to [netlify.com](https://www.netlify.com) and sign in with GitHub.
2. Click "Add new site" → "Import an existing project" → pick your repo.
3. Leave the build command empty and set the publish directory to the
   project root (`/`).
4. Deploy. Netlify gives you a live URL immediately, and redeploys
   automatically every time you push to GitHub.

## How ordering works

1. Customer browses rugs on the Shop page.
2. Opens a rug to see details, picks a size and quantity.
3. Adds it to the cart (stored in the browser via `localStorage`).
4. On the Cart page, reviews items and totals.
5. Clicks "Order on WhatsApp" — this opens WhatsApp with a pre-written
   message listing every item, size, quantity, price, and the total.
6. The customer sends the message, and you complete the order manually.

There is no payment processing and no order database — every order comes
to you directly as a WhatsApp message.
