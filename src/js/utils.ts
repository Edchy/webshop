import { ICartBook } from "./Models/CartBook";

export function calculateTotal(array: ICartBook[]): number {
  return array.reduce((total, curr) => total + curr.price, 0);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function updateLocalStorage(key: string, value: ICartBook[]) {
  localStorage.setItem(key, JSON.stringify(value));
}
