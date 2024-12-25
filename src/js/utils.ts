import { Author } from "../Models/Author"

function printNames(array: Author[]): string {
return array.map(author => author.firstname.charAt(0) + " " + author.lastname).join(', ')
}

export {printNames}