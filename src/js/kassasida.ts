import { balloons } from "balloons-js";
import { cart, removeFromCart, updateCart } from "./cart";
import { ICartBook } from "./Models/CartBook";
import { calculateTotalPrice } from "./utils";

const cartContainer = document.querySelector(".cart-container") as HTMLElement;
const totalPriceEl = document.querySelector(".total-price") as HTMLElement;
let totalPrice = 0;

function createCheckoutItem(item: ICartBook) {
  const productRow = document.createElement("div");
  productRow.className = "cart-checkout-item";
  
  const title = document.createElement("span");
  title.className = "cart-title";
  title.textContent = item.title;

  const quantity = document.createElement("span");
  quantity.textContent = `${item.quantity} st`;

  const price = document.createElement("span");
  price.textContent = `${item.price} kr`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    removeFromCart(item.id);
    renderCheckoutCartUI();
  });

  const cartItemQuantity = document.createElement("input");
  cartItemQuantity.type = "number";
  cartItemQuantity.min = "1";
  cartItemQuantity.valueAsNumber = item.quantity;
  cartItemQuantity.addEventListener("change", () => {
    updateCart(item.id, cartItemQuantity.valueAsNumber);
    renderCheckoutCartUI();
  });

  productRow.append(title, quantity, price, cartItemQuantity, deleteBtn);
  return productRow;
}

function renderCheckoutCartUI() {
  if (!cartContainer) return;
  if (cart.length > 0) {
    cartContainer.innerHTML = "";
    cart.forEach((item) => {
      const book = createCheckoutItem(item);
      cartContainer.appendChild(book);
      // totalPrice += item.price * item.quantity;
    });
  } else {
    cartContainer.textContent = "Din varukorg är tom.";
  }
  totalPrice = calculateTotalPrice(cart);

  totalPriceEl.textContent = `Total: ${totalPrice} kr`;
}

  const purchaseButton = document.querySelector(
    ".purchase-button"
  ) as HTMLButtonElement;

  if (purchaseButton) {
    purchaseButton.addEventListener("click", () => {
      balloons();
      alert("Tack för ditt köp! Din beställning har mottagits.");
      localStorage.removeItem("cart");
      // window.location.href = "index.html";
    });
  } else {
    console.error("Knappen 'purchase-button' kunde inte hittas.");
  }

// loadCart();
renderCheckoutCartUI();
