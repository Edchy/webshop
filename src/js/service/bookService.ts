import fetchData from "./serviceBase"
import { IBook } from "../../Models/Book";

// const key = import.meta.env.VITE_API_KEY;
const URL = "/src/data.json"
// const URL = "http://localhost:3000/api/books"

export default async function getBooks() {
  try {
    const books = await fetchData(URL)
    return books;
  } catch(err) {
    console.log("error----", err);
    
  }
}
