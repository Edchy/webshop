import { addToCart, renderCartUI } from "./cart";
import { books } from "./data";
import { IBook } from "./Models/Book";
import { ICartBook } from "./Models/CartBook";
import { updateLocalStorage } from "./utils";

const favoritesPopover = document.querySelector(".favorites") as HTMLElement;
const favPopoverBtn = document.querySelector(
  "button[popovertarget='favorites']"
) as HTMLButtonElement;

// gör om till Set ? (inga dubbletter by default, lättare att ta bort)
export let favorites: ICartBook[] = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

export function addToFavorites(book: ICartBook) {
  // kanske plocka ut 3-4 egenskaper och göra favorites till datatyp: IFavoriteBooks []
  const bookExistsInFavorites = favorites.some((fav) => fav.id === book.id);
  console.log(bookExistsInFavorites);

  if (!bookExistsInFavorites) {
    favorites.push(book);
    updateLocalStorage("favorites", favorites);
  }
}

favPopoverBtn?.addEventListener("click", updateFavoritesUI);

function updateFavoritesUI() {
  favoritesPopover.innerHTML = "";

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";
  const header = document.createElement("h1");
  header.innerHTML = "Favoriter";
  header.className = "fav-header";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.innerHTML = "X";

  titleContainer.append(header, closeBtn);
  favoritesPopover.append(titleContainer);

  favorites.forEach((book) => {
    favoritesPopover.append(createHTML(book));
  });
}

function createHTML(book: ICartBook) {
  const favContainer = document.createElement("div");
  favContainer.className = "fav-container";

  const favTitle = document.createElement("h3");
  favTitle.textContent = book.title;
  favTitle.className = "book-title";

  const cover = document.createElement("img");
  cover.src = book.cover;
  cover.className = "book-cover";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Ta bort";
  removeBtn.className = "btn-remove";
  removeBtn.addEventListener("click", () => removeBook(book.id));

  const moveToCartBtn = document.createElement("button");
  moveToCartBtn.textContent = "Flytta till varukorg";
  moveToCartBtn.className = "btn-move-to-cart";
  moveToCartBtn.addEventListener("click", () => {
    addToCart(book);
    removeBook(book.id);
    renderCartUI();
  });

  const bookContainer = document.createElement("div");
  bookContainer.className = "book-container";

  buttonContainer.append(moveToCartBtn, removeBtn);
  bookContainer.append(cover, favTitle, buttonContainer);

  favContainer.appendChild(bookContainer);

  return favContainer;
}

function removeBook(id: number) {
  console.log(id);
  const filtered = favorites.filter((book) => book.id !== id);
  favorites = [...filtered];
  updateLocalStorage("favorites", favorites);
  updateFavoritesUI();
}
