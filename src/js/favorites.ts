import { IBook } from "./products";

const favoritesPopover = document.querySelector(".favorites") as HTMLElement;
const favPopoverBtn = document.querySelector(
  "button[popovertarget='favorites']"
) as HTMLButtonElement;

// gör om till Set ? (inga dubbletter by default, lättare att ta bort)
export let favorites: IBook[] = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

export function addToFavorites(book: IBook) {
  // kanske plocka ut 3-4 egenskaper och göra favorites till datatyp: IFavoriteBooks []
  const bookExistsInFavorites = favorites.some((fav) => fav.id === book.id);
  console.log(bookExistsInFavorites);

  if (!bookExistsInFavorites) {
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

favPopoverBtn?.addEventListener("click", updateFavoritesUI);

function updateFavoritesUI() {
  favoritesPopover.innerHTML = "";
  favorites.forEach((book) => favoritesPopover.append(createHTML(book)));
}

function createHTML(obj: IBook) {
  const div = document.createElement("div");
  div.className = "fav-book";

  const cover = document.createElement("img");
  cover.src = obj.cover;

  const title = document.createElement("h3");
  title.textContent = obj.title;

  const link = document.createElement("a");
  link.href = "product-test.html?id=" + obj.id;
  link.appendChild(title);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeBook(obj.id));

  div.append(cover, link, removeBtn);
  return div;
}

function removeBook(id: number) {
  console.log(id);
  const filtered = favorites.filter((book) => book.id !== id);
  favorites = [...filtered];
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesUI();
}
