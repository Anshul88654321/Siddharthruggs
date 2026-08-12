function renderShopGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="product-card">
      <a href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}">
      </a>
      <div class="product-card-body">
        <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-size">${p.sizes[0]}</div>
        <div class="product-card-actions">
          <button class="btn btn-outline" onclick="quickAdd(${p.id})">Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn btn-primary">View Details</a>
        </div>
      </div>
    </div>
  `
  ).join("");
}

function quickAdd(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  addToCart({ id: p.id, name: p.name, price: p.price, size: p.sizes[0], qty: 1 });
  alert(`${p.name} added to cart.`);
}

renderShopGrid();
