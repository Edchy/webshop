import { ICartBook } from "./Models/CartBook";
import { IBook } from "./Models/Book";
import {
  calculateTotalPrice,
  calculateTotalBooks,
  updateLocalStorage,
} from "./utils";

export const cart: ICartBook[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
const cartList = document.querySelector(".shopping-cart-list") as HTMLElement;
const priceTotalOutput = document.querySelector(
  ".shopping-cart-total"
) as HTMLElement;
const cartNotification = document.querySelector(
  ".cart-notification"
) as HTMLElement;

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
}

export function renderCartUI() {
  cartList.innerHTML = "din varukorg är tom";

  if (cartList && cart.length > 0) {
    cartList.innerHTML = "";
    cart.forEach((item: ICartBook) => {
      const cartItem = createCartItem(item);
      cartList.append(cartItem);
    });
  }
  if (priceTotalOutput) {
    const total = calculateTotalPrice(cart).toString();
    priceTotalOutput.textContent = cart.length > 0 ? total : "";
  }
  if (cartNotification) {
    cartNotification.innerHTML = calculateTotalBooks(cart);
    cartNotification.classList.add("just-added-animation");
    setTimeout(() => {
      cartNotification.classList.remove("just-added-animation");
    }, 200);
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
const shoppingCart = document.querySelector(".shopping-cart") as HTMLElement;
const openCartButton = document.querySelector(
  '[popovertarget="shopping-cart"]'
) as HTMLElement;

if (closeCartButton && shoppingCart) {
  closeCartButton.addEventListener("click", () => {
    shoppingCart.setAttribute("popover", "");
    // shoppingCart.hidePopover();
  });
}

if (openCartButton && shoppingCart) {
  openCartButton.addEventListener("click", () => {
    shoppingCart.setAttribute("popover", "open");
  });
}
