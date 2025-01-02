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
  favorites.push(book);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

favPopoverBtn?.addEventListener("click", updateFavoritesUI);

function updateFavoritesUI() {
  favoritesPopover.innerHTML = favorites
    .map((fav) => `<div>${fav.title}</div>`)
    .join("");
}
