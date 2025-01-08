import { ICartBook } from "./Models/CartBook";
import { IBook } from "./Models/Book";
import {
  calculateTotalPrice,
  calculateTotalBooks,
  calulatePercentage,
  updateLocalStorage,
} from "./utils";

export const cart: ICartBook[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
const shoppingCart = document.querySelector(".shopping-cart") as HTMLElement;
const cartList = document.querySelector(".shopping-cart-list") as HTMLElement;
const priceTotalOutput = document.querySelector(
  ".shopping-cart-total"
) as HTMLElement;
const cartNotification = document.querySelector(
  ".cart-notification"
) as HTMLElement;
const progressBar = document.querySelector(
  ".free-shipping-progress-container .inner"
) as HTMLElement;
const clearCartBtn = document.querySelector(
  ".clear-cart-btn"
) as HTMLButtonElement;

clearCartBtn.addEventListener("click", () => {
  clearCart();
  renderCartUI();
});
export function clearCart() {
  cart.length = 0;
  localStorage.removeItem("cart");
}

export function mapBookToCartBook(book: IBook): ICartBook {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    cover: book.cover,
    price: book.price,
    quantity: 1,
  };
}

export function addToCart(newBook: ICartBook) {
  const existingBook: ICartBook | undefined = cart.find(
    (item: ICartBook) => item.id === newBook.id
  );

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push(newBook);
  }
  updateLocalStorage("cart", cart);
  console.log(cart);
  shoppingCart.showPopover(); // MAYBE?
}

export function renderCartUI() {
  cartList.innerHTML = "din varukorg är tom";
  const total = calculateTotalPrice(cart);

  if (cartList && cart.length > 0) {
    cartList.innerHTML = "";
    cart.forEach((item: ICartBook) => {
      const cartItem = createCartItem(item);
      cartList.append(cartItem);
    });
  }
  if (priceTotalOutput) {
    priceTotalOutput.textContent =
      cart.length > 0 ? `Totalt: ${total.toString()}kr` : "";
  }
  if (cartNotification) {
    cartNotification.innerHTML = calculateTotalBooks(cart);
    cartNotification.classList.add("just-added-animation");
    setTimeout(() => {
      cartNotification.classList.remove("just-added-animation");
    }, 200);
  }
  if (progressBar) {
    const progress = calulatePercentage(total, 599); // ta bort magic number
    progressBar.style.width = progress < 100 ? `${progress}%` : "100%";
    const progressText = document.querySelector(".progress-message");
    if (progressText)
      progressText.textContent =
        total < 599
          ? `${599 - total}kr kvar till fri frakt`
          : "Grattis du har fri frakt";
  }
}

export function removeFromCart(id: number) {
  const indexToRemove = cart.findIndex((item) => item.id === id);
  cart.splice(indexToRemove, 1);
  updateLocalStorage("cart", cart);
}

function createCartItem(book: ICartBook) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  const cartItemImage = document.createElement("img");
  cartItemImage.src = book.cover;
  // cartItemImage.alt = `Omslag för ${book.title} av ${book.author}`;
  cartItem.appendChild(cartItemImage);

  const cartItemDetails = document.createElement("div");
  cartItemDetails.classList.add("cart-item-details");
  cartItemDetails.textContent = `${book.title} - ${book.price} kr`;

  const cartItemActions = document.createElement("div");
  cartItemActions.classList.add("cart-item-actions");

  const cartItemRemove = document.createElement("button") as HTMLButtonElement;
  cartItemRemove.textContent = "❌";
  cartItemRemove.addEventListener("click", () => {
    removeFromCart(book.id);
    renderCartUI();
  });

  const cartItemQuantity = document.createElement("input") as HTMLInputElement;
  cartItemQuantity.type = "number";
  cartItemQuantity.min = "1";
  cartItemQuantity.valueAsNumber = book.quantity;
  cartItemQuantity.addEventListener("change", () => {
    updateCart(book.id, cartItemQuantity.valueAsNumber);
    renderCartUI();
  });

  cartItemActions.append(cartItemQuantity, cartItemRemove);
  cartItem.append(cartItemDetails, cartItemActions);

  return cartItem;
}

export function updateCart(bookId: number, newQuantity: number) {
  if (newQuantity < 1) return;
  const indexInArray = cart.findIndex((item) => item.id === bookId);
  if (indexInArray !== -1) {
    cart[indexInArray].quantity = newQuantity;
    console.log(cart);
    updateLocalStorage("cart", cart);
  }
}

const closeCartButton = document.querySelector(".close-cart") as HTMLElement;
// const openCartButton = document.querySelector(
//   '[popovertarget="shopping-cart"]'
// ) as HTMLElement;

if (closeCartButton && shoppingCart) {
  closeCartButton.addEventListener("click", () => {
    // shoppingCart.setAttribute("popover", "");
    shoppingCart.hidePopover();
  });
}

// if (openCartButton && shoppingCart) {
//   openCartButton.addEventListener("click", () => {
//     shoppingCart.setAttribute("popover", "open");
//   });
// }
