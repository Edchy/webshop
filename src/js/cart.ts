const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartContainer = document.querySelector(".shopping-cart") as HTMLElement;
const cartList = document.querySelector(".shopping-cart-list") as HTMLElement;

export function addToCart(book) {
  cart.push(book);
  renderCartUI(book);
}

export function renderCartUI(book) {
  if (cartContainer) {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    const cartItemImage = document.createElement("img");
    cartItemImage.src = book.cover;
    cartItemImage.alt = `Omslag för ${book.title} av ${book.author}`;
    cartItem.appendChild(cartItemImage);
    const cartItemDetails = document.createElement("div");
    cartItemDetails.classList.add("cart-item-details");
    cartItemDetails.textContent = `${book.title} - ${book.price} kr`;
    cartItem.appendChild(cartItemDetails);
    cartContainer.appendChild(cartItem);
  } else {
    console.error("Varukorgsbehållaren saknas i HTML.");
  }
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
