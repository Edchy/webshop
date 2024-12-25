interface IBook {
  title: string;
  author: string[];
  format: string;
  year: number;
  genre: string;
  lang: string;
  cover: string;
  price: number;
  discount: [boolean, number]; // [discount?, discounted price]
  stock: number;
  description?: string;
}

interface ICartBook extends IBook {
  quantity: number;
}