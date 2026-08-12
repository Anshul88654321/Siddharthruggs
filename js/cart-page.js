function renderCartPage() {
  const tableBody = document.getElementById("cart-body");
  const summary = document.getElementById("cart-summary");
  const empty = document.getElementById("cart-empty");
  if (!tableBody) return;

  const cart = getCart();

  if (cart.length === 0) {
    document.getElementById("cart-table-wrap").style.display = "none";
    summary.style.display = "none";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  document.getElementById("cart-table-wrap").style.display = "block";
  summary.style.display = "flex";

  tableBody.innerHTML = cart
    .map(
      (item, i) => `
    <tr>
      <td>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">${item.size}</div>
      </td>
      <td>${formatPrice(item.price)}</td>
      <td>
        <input type="number" class="qty-input" min="1" value="${item.qty}" data-index="${i}">
      </td>
      <td>${formatPrice(item.price * item.qty)}</td>
      <td><button class="remove-link" data-index="${i}">Remove</button></td>
    </tr>
  `
    )
    .join("");

  document.getElementById("cart-total").textContent = formatPrice(cartTotal());

  tableBody.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const idx = Number(e.target.dataset.index);
      const qty = Math.max(1, Number(e.target.value) || 1);
      updateCartQty(idx, qty);
      renderCartPage();
    });
  });

  tableBody.querySelectorAll(".remove-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      removeFromCart(idx);
      renderCartPage();
    });
  });

  document.getElementById("cart-whatsapp-btn").addEventListener("click", () => {
    const link = buildWhatsAppLink(getCart());
    window.open(link, "_blank");
  });
}

renderCartPage();
