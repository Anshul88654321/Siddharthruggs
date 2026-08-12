/* ============================================================
   CART
   Cart is stored in the browser's localStorage. No backend,
   no database. Each item: { id, name, price, size, qty }
   ============================================================ */

const CART_KEY = "rugCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Adds an item to the cart. If the same product+size already
// exists, increases its quantity instead of adding a duplicate row.
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id && i.size === item.size);
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

// Puts the current cart count into any element with id="cart-count"
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cartCount();
}

// Builds the WhatsApp order message for one or more items and
// returns a ready-to-open wa.me URL.
function buildWhatsAppLink(items) {
  let message = "Hi, I would like to order:\n";

  items.forEach((item, idx) => {
    if (items.length > 1) message += `\n${idx + 1}) `;
    message += `\nRug: ${item.name}`;
    message += `\nSize: ${item.size}`;
    message += `\nQuantity: ${item.qty}`;
    message += `\nPrice: ${formatPrice(item.price)}`;
    message += `\n`;
  });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  message += `\nTotal: ${formatPrice(total)}`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
}
