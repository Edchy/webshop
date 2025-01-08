import { addToFavorites } from "./favorites";
import { books } from "./data";
import { addToCart, mapBookToCartBook, renderCartUI } from "./cart";
import { IBook } from "./Models/Book";
import { ICartBook } from "./Models/CartBook";
import { createStarElement } from "./utils";

// hämta en referens till html-element, som finns i vår index.html
const productList = document.querySelector(".product-list") as HTMLUListElement;

// rendera en lista med våra produkter, denna funktion exporteras och anropas i "main.ts" när sidan laddats.
export function renderProductList() {
  // om listan och arrayen "finns"
  if (productList && books) {
    // loopa igenom arrayen och appenda resultat av funktionanropet till produktlistan(ul)
    books.forEach((book) => {
      const bookHTML = createBookElement(book);
      productList.appendChild(bookHTML);
    });
  }
}

function createBookElement(book: IBook) {
  // funktion som skapar starDivs

  // Bok
  const article = document.createElement("article");
  article.className = "product";

  // image
  const figure = document.createElement("figure");
  figure.className = "product-image";

  // länk till produktsidan, skicka med bok.id som url parameter
  const link = document.createElement("a");
  link.href = `product.html?id=${book.id}&title=${book.title}`;

  const img = document.createElement("img");
  img.src = book.cover;
  img.alt = `book cover of ${book.title} by ${book.author}`;

  link.appendChild(img);
  figure.appendChild(link);
  article.appendChild(figure);

  // produkt info
  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";

  const h3 = document.createElement("h3");
  h3.className = "product-title";
  h3.textContent = book.title;

  const time = document.createElement("time");
  time.className = "product-release-date";
  time.dateTime = book.year.toString();
  time.textContent = book.year.toString();

  titleContainer.append(h3);

  const authorP = document.createElement("p");
  authorP.className = "product-author";

  const authorLink = document.createElement("a");
  authorLink.href = "#";
  authorLink.textContent = book.author;

  authorP.appendChild(authorLink);
  productInfo.append(time, authorP);
  article.append(titleContainer, productInfo);

  const availability = document.createElement("div");
  availability.className = "product-availability";

  const priceDiv = document.createElement("div");
  priceDiv.className = "product-price";

  const priceData = document.createElement("data");
  priceData.value = book.price.toString();
  priceData.textContent = `${book.price}kr`;

  priceDiv.appendChild(priceData);

  availability.append(priceDiv);
  article.appendChild(availability);

  // Knapparna
  const actions = document.createElement("div");
  actions.className = "product-actions";

  // add to cart
  const addToCartBtn = document.createElement("button");
  addToCartBtn.type = "button";
  addToCartBtn.title = "Add to Cart";
  addToCartBtn.className = "add-to-cart-button";
  addToCartBtn.setAttribute("data-book-id", book.id.toString());
  // addToCartBtn.textContent = "lägg till";
  addToCartBtn.addEventListener("click", () => {
    const cartBook = mapBookToCartBook(book);
    addToCart(cartBook);
    renderCartUI();
  });

  // cart svg
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute(
    "class",
    "icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"
  );

  // path elements
  const paths = [
    { d: "M0 0h24v24H0z", stroke: "none", fill: "none" },
    { d: "M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" },
    { d: "M12.5 17h-6.5v-14h-2" },
    { d: "M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" },
    { d: "M16 19h6" },
    { d: "M19 16v6" },
  ];

  // skapa och appenda varje path
  paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData.d);
    if (pathData.stroke) path.setAttribute("stroke", pathData.stroke);
    if (pathData.fill) path.setAttribute("fill", pathData.fill);
    svg.appendChild(path);
  });
  addToCartBtn.append(svg);

  // add to favorite
  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className = "add-to-fav-button";
  favBtn.setAttribute("data-book-id", book.id.toString());
  favBtn.textContent = "🤍";
  favBtn.title = "Add to Favorites";
  favBtn.addEventListener("click", () =>
    addToFavorites(mapBookToCartBook(book))
  );

  for (let i = 1; i <= 6; i++) {
    favBtn.appendChild(createStarElement(i));
  }

  actions.append(addToCartBtn, favBtn);
  article.appendChild(actions);

  return article;
}
