// import {books} from "../js/data.ts"
import { IBook } from "../Models/Book.ts";
import { printNames, calculateDiscount } from "./utils.ts";
import getBooks from "./service/bookService.ts"


export async function renderProductList(): Promise<void> {
  const productList = document.querySelector(".product-list")
  const books = await getBooks();
  console.log(books);
  
  if (productList) {
    productList.innerHTML = books.map(book => createBookCard(book)).join("");
  }
}

function createBookCard({id, title, author, cover, year, price, discount}: IBook): string {

  const isDiscounted = discount > 0;  
  const discountPrice = calculateDiscount(price, discount)
  
  const html = `
    <article class="product">
  
      <figure class="product-image">
        <a href="#">
          <img src="${cover}" alt="book cover of ${title} by ${printNames(author)}" />
        </a>
      </figure>
      <div class="product-info">
        <div class="title-container">
          <h3 class="product-title">${title}</h3>
          <time datetime="${year}" class="product-release-date">${year}</time>
        </div>
        <p class="product-author"><a href="#">${printNames(author)}</a></p>
      </div>

      <div class="product-price">
        <data class="${isDiscounted ? "strike" : ""}" value="${price}">${price}kr</data>    
        ${isDiscounted ? `<data value="${discountPrice}">${discountPrice}kr</data>` : ''}    
      </div>

      <div class="product-actions">
        <button type="button" class="add-to-cart-button" data-x-son="x" data-book-id="${id}">Lägg till</button>
        <button type="button" aria-label="Add to favorites" class="like-button" data-book-id="${id}">♥️</button>
      </div>
    </article>
  `;
  return html;
  // const container = document.querySelector('.product-list');
  // container.insertAdjacentHTML('beforeend', html);
}

// Add event listeners after rendering
document.addEventListener('click', (e) => {
 if(e.target && e.target instanceof HTMLElement) {
   if (e.target.matches('.add-to-cart-button')) {
    console.log(e.target.dataset);
    
    const bookId = e.target.dataset.bookId;
    // handleAddToCart(bookId);
  }
  if (e.target.matches('.like-button')) {
    const bookId = e.target.dataset.bookId;
    // handleLike(bookId);
  }
 }
});