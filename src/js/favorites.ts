export const favorites: Set<number> = new Set(
  JSON.parse(localStorage.getItem("favorites") || "[]")
);
