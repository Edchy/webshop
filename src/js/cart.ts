import { ICartBook } from "./Models/CartBook";
import { IBook } from "./Models/Book";
import { calculateTotal, updateLocalStorage } from "./utils";

// referenser
export const cart: ICartBook[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
// const cartOpenBtn = document.querySelector(
//   "button[popovertarget='shopping-cart']"
// );
const cartContainer = document.querySelector(".shopping-cart") as HTMLElement;
const cartList = document.querySelector(".shopping-cart-list") as HTMLElement;
const priceTotalOutput = document.querySelector(
  ".shopping-cart-total"
) as HTMLElement;
//
// cartOpenBtn?.addEventListener("click", () => console.log("hi"));

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

function updateQuantity(item: ICartBook, plusOrMinus: string) {
  if (plusOrMinus === "+") item.quantity++;
  if (plusOrMinus === "-") item.quantity--;
}

export function addToCart(newBook: ICartBook) {
  const existingBook: ICartBook | undefined = cart.find(
    (item: ICartBook) => item.id === newBook.id
  );

  if (existingBook) {
    // existingBook.quantity += 1;
    updateQuantity(existingBook, "+");
  } else {
    cart.push(newBook);
  }
  updateLocalStorage("cart", cart);
  renderCartUI(); // move away, single responsibility
  console.log(cart);
}

export function renderCartUI() {
  if (cartList) {
    cartList.innerHTML = "";
    cart.forEach((item: ICartBook) => {
      const cartItem = createCartItem(item);
      cartList.append(cartItem);
    });
  }
  if (priceTotalOutput) {
    const total = calculateTotal(cart).toString();
    priceTotalOutput.textContent = cart.length > 0 ? total : "";
  }
}

function removeFromCart(id: number) {
  const indexToRemove = cart.findIndex((item) => item.id === id);
  cart.splice(indexToRemove, 1);
  updateLocalStorage("cart", cart);
  renderCartUI();
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
  cartItemRemove.addEventListener("click", () => removeFromCart(book.id));

  const cartItemQuantity = document.createElement("input") as HTMLInputElement;
  cartItemQuantity.type = "number";
  cartItemQuantity.valueAsNumber = book.quantity;
  cartItemQuantity.addEventListener("change", () => {
    updateCart(book.id, cartItemQuantity.valueAsNumber);
  });

  cartItemActions.append(cartItemQuantity, cartItemRemove);
  cartItem.append(cartItemDetails, cartItemActions);

  return cartItem;
}

function updateCart(bookId: number, newQuantity: number) {
  const indexInArray = cart.findIndex((item) => item.id === bookId);
  cart[indexInArray].quantity = newQuantity;
  console.log(cart);

  renderCartUI();
}
