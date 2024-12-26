import { Author } from "../Models/Author"

function printNames(array: Author[]): string {

  return array.map(author => `${author.lastname}, ${author.firstname.charAt(0)}.`).join()
}

function calculateDiscount(price: number, discount:number): number {
  return price - price * (discount / 100)
}

export {printNames, calculateDiscount}