import { balloons } from "balloons-js";
import { cart, removeFromCart, updateCart } from "./cart";
import { ICartBook } from "./Models/CartBook";
import { calculateTotalPrice } from "./utils";
import { validateEmail } from "./utils";

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
  deleteBtn.textContent = "  ❌  ";
  deleteBtn.className =  "cart-item-delete";
  deleteBtn.addEventListener("click", () => {
    removeFromCart(item.id);
    renderCheckoutCartUI();
  });

  const cartItemQuantity = document.createElement("input");
  cartItemQuantity.type = "number";
  cartItemQuantity.min = "1";
  cartItemQuantity.valueAsNumber = item.quantity;
  cartItemQuantity.className = "cart-item-quantity";
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

  totalPriceEl.textContent = `Totalt: ${totalPrice} kr`;
}

function validateContactInfo(): boolean {
  const name = (document.querySelector("#name") as HTMLInputElement).value;
  const email = (document.querySelector("#email") as HTMLInputElement).value;
  const address = (document.querySelector("#address") as HTMLInputElement).value;

  if (!name || !email || !address) {
    alert("Vänligen fyll i alla obligatoriska fält.");
    return false;
  }

  if (!validateEmail(email)) {
    alert("Vänligen ange en giltig e-postadress.");
    return false;
  }

  return true;
}

const purchaseButton = document.querySelector(".purchase-button") as HTMLButtonElement;

if (purchaseButton) {
  purchaseButton.addEventListener("click", (event) => {
    if (!validateContactInfo()) {
      event.preventDefault();
    } else {
      balloons();
      alert("Tack för ditt köp! Din beställning har mottagits.");
      localStorage.removeItem("cart");
      // window.location.href = "index.html";
    }
  });
} else {
  console.error("Knappen 'purchase-button' kunde inte hittas.");
}

// loadCart();
renderCheckoutCartUI();
