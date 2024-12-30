import { TAuthor } from "./Author";
// import IStock from "./Stock";

type TDiscount = number | null;

interface IBook {
  id: number;
  title: string;
  author: TAuthor[];
  cover: string;
  year: number;
  format: string;
  genre: string;
  lang: string;
  pages: number;
  description?: string;
  price: number;
  discount: TDiscount;
  stock: number;
}

interface ICartBook extends IBook {
  quantity: number;
}

export type {IBook, ICartBook, TDiscount}