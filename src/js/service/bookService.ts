import fetchData from "./serviceBase"
import { IBook } from "../../Models/Book";

// const key = import.meta.env.VITE_API_KEY;
const URL = "/src/data.json"

export default async function getBooks(): Promise<IBook[]> {
  const books: IBook[] = await fetchData(URL)
  return books;
}
