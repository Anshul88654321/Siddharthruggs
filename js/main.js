/* ============================================================
   SHARED LAYOUT
   Renders the same header/footer on every page so we don't
   repeat markup. "active" is the current page's nav id.
   ============================================================ */

function renderHeader(active) {
  const el = document.getElementById("site-header");
  if (!el) return;

  const link = (href, label, id) =>
    `<a href="${href}" class="nav-link${active === id ? " active" : ""}">${label}</a>`;

  el.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">${CONFIG.businessName}</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu">☰</button>
      <nav class="nav" id="nav">
        ${link("index.html", "Home", "home")}
        ${link("shop.html", "Shop", "shop")}
        ${link("about.html", "About", "about")}
        ${link("contact.html", "Contact", "contact")}
        <a href="cart.html" class="nav-link cart-link${active === "cart" ? " active" : ""}">
          Cart <span class="cart-badge" id="cart-count">0</span>
        </a>
      </nav>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));

  updateCartBadge();
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;

  el.innerHTML = `
    <div class="footer-inner">
      <p class="footer-brand">${CONFIG.businessName}</p>
      <p>${CONFIG.address}</p>
      <p>${CONFIG.phone} &middot; ${CONFIG.email}</p>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} ${CONFIG.businessName}. All rights reserved.</p>
    </div>
  `;
}
