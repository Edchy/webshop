export let favorites: number[] = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

export function addToFavorites(bookId: number) {
  favorites.push(bookId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
