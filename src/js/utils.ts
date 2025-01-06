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
