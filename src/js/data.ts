export interface IBook {
  id: number;
  title: string;
  author: string;
  cover: string;
  year: number;
  format: string;
  genre: string;
  lang: string;
  pages: number;
  description?: string;
  price: number;
  discount: number;
  stock: number;
}
// skapa en array av "IBooks"
export const books: IBook[] = [
  {
    id: 389,
    title: "The Travelling Cat Chronicles",
    author: "Hiro Arikawa",
    cover:
      "https://image.bokus.com/images/9780857526335_383x_the-travelling-cat-chronicles",
    year: 2024,
    format: "Pocket",
    genre: "Some genre",
    pages: 199,
    lang: "English",
    description: "Some descr...",
    price: 182,
    discount: 0,
    stock: 100,
  },
  {
    id: 390,
    title: "Cats in Hats",
    author: "Jo Clark",
    cover: "https://s1.adlibris.com/images/57824764/cats-in-hats.jpg",
    year: 2024,
    format: "Pocket",
    genre: "Some genre",
    pages: 199,
    lang: "English",
    description: "Some descr...",
    price: 182,
    discount: 0,
    stock: 100,
  },
  {
    id: 211,
    title: "Cats Galore",
    author: "Susam Herbert",
    cover: "https://image.bokus.com/images/9780500239360_383x_cats-galore",
    year: 2024,
    format: "Pocket",
    genre: "Some genre",
    pages: 199,
    lang: "English",
    description: "Some descr...",
    price: 211,
    discount: 0,
    stock: 100,
  },
  {
    id: 212,
    title: "The Blanket Cats",
    author: "Kiyoshi Shigematsu",
    cover: "https://s1.adlibris.com/images/69129281/the-blanket-cats.jpg",
    year: 2024,
    format: "Pocket",
    genre: "Some genre",
    pages: 199,
    lang: "English",
    description: "Some descr...",
    price: 173,
    discount: 0,
    stock: 100,
  },
  {
    id: 213,
    title: "Fire and Ice",
    author: "Erin Hunter",
    cover: "https://s2.adlibris.com/images/5761385/fire-and-ice.jpg",
    year: 2006,
    format: "Pocket",
    genre: "Some genre",
    pages: 352,
    lang: "English",
    description: "Some descr...",
    price: 126,
    discount: 0,
    stock: 100,
  },
  {
    id: 214,
    title: "Darkest Hour",
    author: "Erin Hunter",
    cover: "https://s2.adlibris.com/images/4205512/darkest-hour.jpg",
    year: 2008,
    format: "Pocket",
    genre: "Some genre",
    pages: 368,
    lang: "English",
    description: "Some descr...",
    price: 126,
    discount: 0,
    stock: 100,
  },
  {
    id: 215,
    title: "Rising Storm",
    author: "Erin Hunter",
    cover: "https://s1.adlibris.com/images/4407882/rising-storm.jpg",
    year: 2006,
    format: "Pocket",
    genre: "Some genre",
    pages: 320,
    lang: "English",
    description: "Some descr...",
    price: 126,
    discount: 0,
    stock: 100,
  },
  {
    id: 66,
    title: "Letters To The Human Race From the Cat",
    author: "Vicky Halls",
    cover:
      "https://image.bokus.com/images/9781788405546_383x_letters-to-the-human-race-from-the-cat",
    year: 2024,
    format: "Pocket",
    genre: "Some genre",
    pages: 199,
    lang: "English",
    description: "Some descr...",
    price: 167,
    discount: 0,
    stock: 100,
  },
  {
    id: 1,
    title: "Yellowface",
    author: "Rebecka F. Kuang",
    cover: "https://s2.adlibris.com/images/63247538/yellowface.jpg",
    year: 2020,
    format: "Pocket",
    genre: "Some genre",
    pages: 309,
    lang: "English",
    description: "Some descr...",
    price: 150,
    discount: 0,
    stock: 100,
  },
  {
    id: 2,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    cover:
      "https://cdn.waterstones.com/bookjackets/large/9780/2413/9780241347782.jpg ",
    year: 2018,
    format: "Hardback",
    genre: "Crime",
    pages: 401,
    lang: "English",
    description: "Some descr...",
    price: 150,
    discount: 0,
    stock: 200,
  },
  {
    id: 3,
    title: "Learn with Peppa: First Coding sticker activity book",
    author: "Peppa Pig",
    cover:
      "https://cdn.waterstones.com/bookjackets/large/9780/2416/9780241645697.jpg",
    year: 2024,
    format: "Paperback",
    genre: "Kids",
    pages: 404,
    lang: "English",
    description: "Some descr...",
    price: 99,
    discount: 0,
    stock: 200,
  },
  {
    id: 4,
    title:
      "Medicinsk teknik - Teori, planering och genomförande (bok + digital produkt)",
    author: "Lennart Boman",
    cover:
      "https://s2.adlibris.com/images/55125289/medicinsk-teknik---teori-planering-och-genomforande-bok-digital-produkt.jpg",
    year: 2024,
    format: "Paperback",
    genre: "Studier",
    pages: 404,
    lang: "Swedish",
    description: "Some descr...",
    price: 481,
    discount: 0,
    stock: 200,
  },
  {
    id: 5,
    title: "Onyx Storm (svensk utgåva)",
    author: "Rebecca Yarros",
    cover:
      "https://image.bokus.com/images/9789189516229_200x_onyx-storm-svensk-utgava_haftad",
    year: 2025,
    format: "Paperback",
    genre: "fiction",
    pages: 698,
    lang: "Swedish",
    description: "Some descr...",
    price: 249,
    discount: 0,
    stock: 200,
  },
  {
    id: 6,
    title: "Fourth Wing (svensk utgåva)",
    author: "Rebecca Yarros",
    cover:
      "https://image.bokus.com/images/9789189516076_200x_fourth-wing-svensk-utgava_haftad",
    year: 2023,
    format: "Paperback",
    genre: "fiction",
    pages: 622,
    lang: "Swedish",
    description: "Some descr...",
    price: 199,
    discount: 0,
    stock: 200,
  },
];
