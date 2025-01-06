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
  favorites.forEach((book) => favoritesPopover.append(createHTML(book)));
}

function createHTML(obj: ICartBook) {
  const h1 = document.createElement("h1");
  h1.innerHTML = "Favoriter";

  const div = document.createElement("div");
  div.className = "fav-book";

  const cover = document.createElement("img");
  cover.src = obj.cover;

  const title = document.createElement("h3");
  title.textContent = obj.title;

  const link = document.createElement("a");
  link.href = "product.html?id=" + obj.id;
  link.appendChild(title);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeBook(obj.id));

  div.append(h1, cover, link, removeBtn);
  return div;
}

function removeBook(id: number) {
  console.log(id);
  const filtered = favorites.filter((book) => book.id !== id);
  favorites = [...filtered];
  updateLocalStorage("favorites", favorites);
  updateFavoritesUI();
}
