import { TAuthor } from "../Models/Author"
import { TDiscount } from "../Models/Book";

function printNames(array: TAuthor[]): string {

  return array.map(author => `${author.lastname}, ${author.firstname.charAt(0)}.`).join()
}

function calculateDiscount(price: number, discount:TDiscount): number {
  if (!discount) {
    return price;
  }
  return price - price * (discount / 100)
}

export {printNames, calculateDiscount}