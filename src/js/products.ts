import { IBook } from "../Models/Book.ts";
import { printNames, calculateDiscount } from "./utils.ts";
import getBooks from "./service/bookService.ts"


export async function renderProductList(): Promise<void> {
  const productList = document.querySelector(".product-list") as HTMLUListElement
  const books = await getBooks();
  console.log(books);
  
  if (productList) {
    productList.innerHTML = books.map(book => createBookCard(book)).join("");
  }
}

// function getStockStatus(stock: number) {
//   if (stock < 1) return {status: 4, message: "slut i lager"}
//   if (stock < 20) return {status: 3, message: "få kvar i lager"}
//   if (stock < 50 && stock > 20) return {status: 2, message: "20+ i lager"}
//   if (stock > 50) return {status: 1, message: "50+ i lager"}
// }

function createBookCard({id, title, author, cover, year, price, discount, stock}: IBook): string {
  
  // const isDiscounted = discount && discount > 0;  
  const discountPrice: number = calculateDiscount(price, discount)
  const isOutOfStock: boolean = stock < 1;
  // const stockStatus = getStockStatus(stock);
  // console.log('status:', stockStatus);
  

  const html = `
    <article class="product">
    ${discount ? `<div class="discount-badge"><span>du sparar</span><span>${price - discountPrice}kr</span></div>` : ""}
      <figure class="product-image">
        <a href="product-test.html?id=${id}&title=${title}">
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
        <data class="${discount ? "strike" : ""}" value="${price}">${price}kr</data>    
        ${discount ? `<data value="${discountPrice}">${discountPrice}kr</data>` : ''}   
        <div class="${isOutOfStock ? "out-of-stock": "in-stock"} stock-indicator"></div>
      </div>

      <div data-x="hello" class="product-actions">
        <button ${isOutOfStock && "disabled"} type="button" class="add-to-cart-button" data-x-son="x" data-book-id="${id}">${isOutOfStock ? "Slut i lager" : "Lägg till"}</button>
        <button type="button" aria-label="Add to favorites" class="add-to-fav-button" data-book-id="${id}">⭐️</button>
      </div>
    </article>
  `;
  return html;

}


document.addEventListener('click', (e) => {
 if(e.target && e.target instanceof HTMLElement) {
   if (e.target.parentElement && e.target.matches('.add-to-cart-button')) {
    console.log(e.target.parentElement.dataset);
    
    const bookId = e.target.dataset.bookId;
    // handleAddToCart(bookId);
  }
  if (e.target.matches('.add-to-fav-button')) {
    const bookId = e.target.dataset.bookId;
    // handleLAddToFav(bookId);
  }
 }
});