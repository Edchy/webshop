import { books } from "./products";

document.addEventListener("DOMContentLoaded", () => {
  const bookDetailsContainer = document.getElementById("book-details");
  const cartContainer = document.getElementById("shopping-cart");

  if (!bookDetailsContainer) {
    console.error("Elementet med ID 'book-details' finns inte på sidan.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = Number(urlParams.get("id"));

  if (!bookId) {
    bookDetailsContainer.innerHTML = "<p>Bok-ID saknas!</p>";
    return;
  }

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    bookDetailsContainer.innerHTML = "<p>Ingen bok hittades!</p>";
    return;
  }

  const link = document.createElement("a");
  link.href = `product-test.html?id=${book.id}&title=${book.title}`;

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

  const addBtn = document.createElement("button");
  addBtn.innerHTML = "Lägg till i varukorg";
  addBtn.className = "add-btn";

  addBtn.addEventListener("click", () => {
    if (cartContainer) {
      const cartContain = document.createElement("ul");
      cartContain.className = "cart-contain";

      const cartItem = document.createElement("li");
      cartItem.className = "cart-item";

      // Skapa en div för bilden
      const imageWrapper = document.createElement("div");
      imageWrapper.className = "image-wrapper";
      const cartCover = document.createElement("img");
      cartCover.src = book.cover;
      cartCover.className = "cart-cover";
      imageWrapper.appendChild(cartCover);

      // Skapa en div för titel och pris
      const detailsWrapper = document.createElement("div");
      detailsWrapper.className = "details-wrapper";
      const cartTitle = document.createElement("h1");
      cartTitle.innerHTML = `${book.title}`;
      cartTitle.className = "cart-title";
      const cartPrice = document.createElement("span");
      cartPrice.innerHTML = `${book.price} kr`;
      cartPrice.className = "cart-price";
      detailsWrapper.append(cartTitle, cartPrice);

      const buttonsWrapper = document.createElement("div");
      const plusBtn = document.createElement("button");
      plusBtn.innerHTML = "plus";
      const minusBtn = document.createElement("button");
      minusBtn.innerHTML = "minus";
      buttonsWrapper.append(plusBtn, minusBtn);

      cartItem.append(imageWrapper, detailsWrapper, buttonsWrapper);
      cartContain.appendChild(cartItem);
      cartContainer.appendChild(cartContain);
    } else {
      console.error("Varukorgsbehållaren saknas i HTML.");
    }
  });

  productDetails.append(h1, authorP, priceDiv, descriptionP, addBtn);

  const imageContainer = document.createElement("div");
  imageContainer.className = "product-image";
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
});
