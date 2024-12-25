// import {books} from "../js/data.ts"
import { IBook } from "../Models/Book.ts";
import { printNames } from "./utils.ts";
import getBooks from "./service/bookService.ts"


export async function renderProductList(): Promise<void> {
  const productList = document.querySelector(".product-list")
  const books = await getBooks();
  console.log(books);
  
  if (productList) {
    productList.innerHTML = books.map(book => createBookCard(book)).join("");
  }
}

function createBookCard(book: IBook): string {
  const html = `
    <article class="product">
      <figure class="product-image">
        <a href="#">
          <img src="${book.cover}" alt="book cover of ${book.title} by ${printNames(book.author)}" />
        </a>
      </figure>
      <div class="product-info">
        <div class="title-container">
          <h3 class="product-title">${book.title}</h3>
          <time datetime="${book.year}" class="product-release-date">${book.year}</time>
        </div>
        <p class="product-author"><a href="#">${printNames(book.author)}</a></p>
      </div>
      <div class="product-price">
        <data value="${book.price}">${book.price}kr</data>
      </div>
      <div class="product-actions">
        <button type="button" class="add-to-cart-button" data-book-id="${book.id}">Lägg till</button>
        <button type="button" aria-label="Add to favorites" class="like-button" data-book-id="${book.id}">♥️</button>
      </div>
    </article>
  `;
  return html;
  // const container = document.querySelector('.product-list');
  // container.insertAdjacentHTML('beforeend', html);
}

// // Add event listeners after rendering
// document.addEventListener('click', (e) => {
//   if (e.target.matches('.add-to-cart-button')) {
//     const bookId = e.target.dataset.bookId;
//     // handleAddToCart(bookId);
//   }
//   if (e.target.matches('.like-button')) {
//     const bookId = e.target.dataset.bookId;
//     // handleLike(bookId);
//   }
// });