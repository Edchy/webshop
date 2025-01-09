import { addToCart, renderCartUI, mapBookToCartBook } from "./cart";
import { books } from "./data";
import { addToFavorites } from "./favorites";
import { createStarElement } from "./utils";
document.addEventListener("DOMContentLoaded", () => {
  const bookDetailsContainer = document.getElementById("book-details");
  // const cartContainer = document.getElementById("shopping-cart");

  if (!bookDetailsContainer) {
    console.error("Elementet med ID 'book-details' finns inte på sidan.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = Number(urlParams.get("id"));
  const bookTitle = urlParams.get("title");

  if (!bookId) {
    bookDetailsContainer.innerHTML = "<p>Bok-ID saknas!</p>";
    return;
  }

  const book = books.find((b) => b.id === bookId);
  document.title = bookTitle ? bookTitle.toString() : "404";

  if (book) {
    const link = document.createElement("a");
    link.href = `product.html?id=${book.id}&title=${book.title}`;

    const img = document.createElement("img");
    img.src = book.cover;
    img.alt = `Omslag för ${book.title} av ${book.author}`;
    link.appendChild(img);

    const mainContent = document.createElement("div");
    mainContent.className = "main-content";

    const productInformation = document.createElement("div");
    productInformation.className = "product-information";

    const productDetails = document.createElement("div");
    productDetails.className = "product-details";

    const h1 = document.createElement("h1");
    h1.className = "product-title";
    h1.textContent = book.title;

    const authorP = document.createElement("p");
    authorP.className = "product-author";

    const authorLink = document.createElement("a");
    authorLink.href = "#";
    authorLink.textContent = book.author;

    authorP.appendChild(authorLink);

    const priceDiv = document.createElement("div");
    priceDiv.className = "product-price";

    const priceData = document.createElement("data");
    priceData.value = book.price.toString();
    priceData.textContent = `${book.price} kr`;

    priceDiv.appendChild(priceData);

    const descriptionP = document.createElement("p");
    descriptionP.textContent = book.description ?? "Beskrivning saknas";

    const actions = document.createElement("div");
    actions.className = "product-action";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.type = "button";
    addToCartBtn.innerHTML = "Lägg till i varukorg";
    addToCartBtn.className = "add-to-cart-button";
    // addToCartBtn.setAttribute("data-book-id", book.id.toString());
    addToCartBtn.addEventListener("click", () => {
      const cartBook = mapBookToCartBook(book);
      addToCart(cartBook);
      renderCartUI();
    });

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "add-to-fav-button";
    // favBtn.setAttribute("data-book-id", book.id.toString());
    favBtn.textContent = "🤍";
    favBtn.title = "Add to Favorites";
    favBtn.addEventListener("click", () =>
      addToFavorites(mapBookToCartBook(book))
    );

    for (let i = 1; i <= 6; i++) {
      favBtn.appendChild(createStarElement(i));
    }

    actions.append(addToCartBtn, favBtn);

    productDetails.append(h1, authorP, priceDiv, descriptionP, actions);

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-img";
    imageContainer.appendChild(link);

    productInformation.append(imageContainer, productDetails);

    const additionalInfo = document.createElement("div");
    additionalInfo.className = "product-additional-info";

    const genreP = document.createElement("p");
    genreP.textContent = `Genre: ${book.genre}`;

    const yearP = document.createElement("p");
    yearP.textContent = `Utgivningsår: ${book.year}`;

    const languageP = document.createElement("p");
    languageP.textContent = `Språk: ${book.lang}`;

    const pagesP = document.createElement("p");
    pagesP.textContent = `Antal sidor: ${book.pages}`;

    const formatP = document.createElement("p");
    formatP.textContent = `Format: ${book.format}`;

    additionalInfo.append(genreP, yearP, languageP, pagesP, formatP);

    mainContent.append(productInformation, additionalInfo);

    bookDetailsContainer.appendChild(mainContent);
  }
});
