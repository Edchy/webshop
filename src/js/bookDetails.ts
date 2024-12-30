import { books } from "./products";

document.addEventListener("DOMContentLoaded", () => {
  const bookDetailsContainer = document.getElementById("book-details");

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

  bookDetailsContainer.appendChild(link);

  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";

  const h1 = document.createElement("h1");
  h1.className = "product-title";
  h1.textContent = book.title;

  const time = document.createElement("time");
  time.className = "product-release-date";
  time.dateTime = book.year.toString();
  time.textContent = book.year.toString();

  titleContainer.append(h1, time);

  const authorP = document.createElement("p");
  authorP.className = "product-author";

  const authorLink = document.createElement("a");
  authorLink.href = "#";
  authorLink.textContent = book.author;

  authorP.appendChild(authorLink);

  const descriptionP = document.createElement("p");
  descriptionP.textContent = book.description ?? "Beskrivning saknas";

  const genreP = document.createElement("p");
  genreP.textContent = `Genre: ${book.genre}`;

  productInfo.append(titleContainer, authorP, descriptionP, genreP);
  bookDetailsContainer.appendChild(productInfo);

  const availability = document.createElement("div");
  availability.className = "product-availability";

  const priceDiv = document.createElement("div");
  priceDiv.className = "product-price";

  const priceData = document.createElement("data");
  priceData.value = book.price.toString();
  priceData.textContent = `${book.price} kr`;

  priceDiv.appendChild(priceData);
  availability.append(priceDiv);
  bookDetailsContainer.appendChild(availability);
});
