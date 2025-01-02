import { IBook } from "./products";

const favoritesPopover = document.querySelector(".favorites") as HTMLElement;
const favPopoverBtn = document.querySelector(
  "button[popovertarget='favorites']"
) as HTMLButtonElement;

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

  favorites.forEach((fav) => {
    const title = document.createElement("h3");
    title.textContent = fav.title;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    favoritesPopover.append(title, removeBtn);
  });
}
