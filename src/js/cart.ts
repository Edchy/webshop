import { ICartBook } from "./Models/CartBook";
import { IBook } from "./Models/Book";

// referenser
export const cart: ICartBook[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
const cartContainer = document.querySelector(".shopping-cart") as HTMLElement;
const cartList = document.querySelector(".shopping-cart-list") as HTMLElement;
//

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
  localStorage.setItem("cart", JSON.stringify(cart));
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
}

function deleteCartItem() {}

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
  const cartItemQuantity = document.createElement("input") as HTMLInputElement;
  const cartItemRemove = document.createElement("button") as HTMLButtonElement;
  cartItemRemove.textContent = "❌";

  cartItemQuantity.type = "number";
  cartItemQuantity.valueAsNumber = book.quantity;

  cartItemActions.append(cartItemQuantity, cartItemRemove);
  cartItem.append(cartItemDetails, cartItemActions);

  return cartItem;
}
