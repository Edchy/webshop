import { ICartBook } from "./Models/CartBook";

export function calculateTotalPrice(array: ICartBook[]): number {
  return array.reduce((total, curr) => total + curr.price * curr.quantity, 0);
}
export function calculateTotalBooks(array: ICartBook[]): string {
  return array.reduce((total, curr) => total + curr.quantity, 0).toString();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function updateLocalStorage(key: string, value: ICartBook[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function calulatePercentage(value: number, total: number) {
  return (value / total) * 100;
}

export function createStarElement(starNumber: number) {
  const starDiv = document.createElement("div");
  starDiv.className = `star-${starNumber}`;
  starDiv.ariaHidden = "true";

  // skapa svg med alla sina konstiga attribute
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("viewBox", "0 0 784.11 815.53");
  svg.setAttribute(
    "style",
    "shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  );
  svg.setAttribute("version", "1.1");
  svg.setAttribute("xml:space", "preserve");

  // g
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", "Layer_x0020_1");

  // metadata
  const metadata = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "metadata"
  );
  metadata.setAttribute("id", "CorelCorpID_0Corel-Layer");

  // path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
  );
  path.setAttribute("class", "fil0");

  // Appenda allt
  g.appendChild(metadata);
  g.appendChild(path);
  svg.appendChild(g);
  starDiv.appendChild(svg);

  // ge tillbaks div med allt inuti
  return starDiv;
}
