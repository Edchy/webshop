import { ICartBook } from "./Models/CartBook";

export function calculateTotal(array: ICartBook[]) {
  return array.reduce((total, curr) => total + curr.price, 0);
}
