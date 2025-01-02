import { IBook } from "./products";

export let favorites: IBook[] = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

export function addToFavorites(book: IBook) {
  // kanske plocka ut 3-4 egenskaper och göra favorites till datatyp: IFavoriteBooks []
  favorites.push(book);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
