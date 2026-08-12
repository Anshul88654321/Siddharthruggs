function renderProductPage() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const p = PRODUCTS.find((x) => x.id === id);

  if (!p) {
    container.innerHTML = `<p class="empty-state">Rug not found. <a href="shop.html">Back to shop</a></p>`;
    return;
  }

  document.title = `${p.name} — ${CONFIG.businessName}`;

  container.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="product-detail-info">
      <h1>${p.name}</h1>
      <span class="product-price">${formatPrice(p.price)}</span>
      <p class="description">${p.description}</p>

      <div class="field">
        <label for="size-select">Size</label>
        <select id="size-select">
          ${p.sizes.map((s) => `<option value="${s}">${s}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label for="qty-input">Quantity</label>
        <input type="number" id="qty-input" value="1" min="1">
      </div>

      <div class="detail-actions">
        <button class="btn btn-outline" id="add-cart-btn">Add to Cart</button>
        <button class="btn btn-whatsapp" id="whatsapp-btn">Order on WhatsApp</button>
      </div>
    </div>
  `;

  document.getElementById("add-cart-btn").addEventListener("click", () => {
    const size = document.getElementById("size-select").value;
    const qty = Math.max(1, Number(document.getElementById("qty-input").value) || 1);
    addToCart({ id: p.id, name: p.name, price: p.price, size, qty });
    alert(`${p.name} added to cart.`);
  });

  document.getElementById("whatsapp-btn").addEventListener("click", () => {
    const size = document.getElementById("size-select").value;
    const qty = Math.max(1, Number(document.getElementById("qty-input").value) || 1);
    const link = buildWhatsAppLink([{ name: p.name, price: p.price, size, qty }]);
    window.open(link, "_blank");
  });
}

renderProductPage();
