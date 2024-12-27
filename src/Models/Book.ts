import { Author } from "./Author";

interface IBook {
  id: number;
  title: string;
  author: Author[];
  cover: string;
  year: number;
  price: number;
  // format: string;
  // genre: string;
  // lang: string;
  // discount: [boolean, number];
  // stock: number;
  // description?: string;
}

interface ICartBook extends IBook {
  quantity: number;
}

export type {IBook, ICartBook}