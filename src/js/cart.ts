import { ICartBook } from "./Models/CartBook";
import { IBook } from "./Models/Book";

// referenser
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
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

export function addToCart(book: ICartBook) {
  const existingBook: ICartBook = cart.find(
    (item: ICartBook) => item.id === book.id
  );
  console.log(existingBook);
  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push(book);
  }

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

  const cartItemQuantity = document.createElement("input") as HTMLInputElement;
  cartItemQuantity.type = "number";
  cartItemQuantity.valueAsNumber = book.quantity;

  cartItem.append(cartItemDetails, cartItemQuantity);

  return cartItem;
}

//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   const existingBook = cart.find((item: { id: number }) => item.id === book.id);
//   if (existingBook) {
//     existingBook.quantity += 1;
//   } else {
//     cart.push({ ...book, quantity: 1 });
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   console.log(`Boken "${book.title}" lades till i varukorgen.`);
// });

// addToCartBtn.addEventListener("click", () => {

// });
