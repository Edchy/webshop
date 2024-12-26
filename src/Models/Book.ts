import { Author } from "./Author";

interface IBook {
  id: number;
  title: string;
  author: Author[];
  cover: string;
  year: number;
  format: string;
  genre: string;
  lang: string;
  description?: string;
  price: number;
  discount: number;
  stock: number;
}

interface ICartBook extends IBook {
  quantity: number;
}

export type {IBook, ICartBook}