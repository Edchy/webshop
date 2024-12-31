interface IBook {
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
];

// rendera en lista med våra produkter, denna funktion exporteras och anropas i "main.ts" när sidan laddats.
export function renderProductList() {
  // hämta en referens till html-element, som finns i vår index.html
  const productList = document.querySelector(
    ".product-list"
  ) as HTMLUListElement;

  // om listan och arrayen "finns"
  if (productList && books) {
    // loopa igenom arrayen
    books.forEach((book) => {
      // Bok
      const article = document.createElement("article");
      article.className = "product";

      // image
      const figure = document.createElement("figure");
      figure.className = "product-image";

      // länk till produktsidan, skicka med bok.id som url parameter
      const link = document.createElement("a");
      link.href = `product-test.html?id=${book.id}&title=${book.title}`;

      const img = document.createElement("img");
      img.src = book.cover;
      img.alt = `book cover of ${book.title} by ${book.author}`;

      link.appendChild(img);
      figure.appendChild(link);
      article.appendChild(figure);

      // produkt info
      const productInfo = document.createElement("div");
      productInfo.className = "product-info";

      const titleContainer = document.createElement("div");
      titleContainer.className = "title-container";

      const h3 = document.createElement("h3");
      h3.className = "product-title";
      h3.textContent = book.title;

      const time = document.createElement("time");
      time.className = "product-release-date";
      time.dateTime = book.year.toString();
      time.textContent = book.year.toString();

      titleContainer.append(h3, time);

      const authorP = document.createElement("p");
      authorP.className = "product-author";

      const authorLink = document.createElement("a");
      authorLink.href = "#";
      authorLink.textContent = book.author;

      authorP.appendChild(authorLink);
      productInfo.append(titleContainer, authorP);
      article.appendChild(productInfo);

      const availability = document.createElement("div");
      availability.className = "product-availability";

      const priceDiv = document.createElement("div");
      priceDiv.className = "product-price";

      const priceData = document.createElement("data");
      priceData.value = book.price.toString();
      priceData.textContent = `${book.price}kr`;

      priceDiv.appendChild(priceData);

      availability.append(priceDiv);
      article.appendChild(availability);

      // Knapparna
      const actions = document.createElement("div");
      actions.className = "product-actions";

      const addToCartBtn = document.createElement("button");
      addToCartBtn.type = "button";
      addToCartBtn.className = "add-to-cart-button";
      addToCartBtn.setAttribute("data-book-id", book.id.toString());
      addToCartBtn.textContent = "lägg till";
      addToCartBtn.addEventListener("click", () => {
        console.log(book.id);
      });

      const favBtn = document.createElement("button");
      favBtn.type = "button";
      favBtn.className = "add-to-fav-button";
      favBtn.setAttribute("data-book-id", book.id.toString());
      favBtn.textContent = "✨";

      for (let i = 1; i <= 6; i++) {
        favBtn.appendChild(createStarElement(i));
      }

      actions.append(addToCartBtn, favBtn);
      article.appendChild(actions);
      productList.appendChild(article);
    });
  }
}

function createStarElement(starNumber: number) {
  const starDiv = document.createElement("div");
  starDiv.className = `star-${starNumber}`;

  // Create SVG element with all its attributes
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("viewBox", "0 0 784.11 815.53");
  svg.setAttribute(
    "style",
    "shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  );
  svg.setAttribute("version", "1.1");
  svg.setAttribute("xml:space", "preserve");

  // Create the g element
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", "Layer_x0020_1");

  // Create metadata
  const metadata = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "metadata"
  );
  metadata.setAttribute("id", "CorelCorpID_0Corel-Layer");

  // Create path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
  );
  path.setAttribute("class", "fil0");

  // Append all elements together
  g.appendChild(metadata);
  g.appendChild(path);
  svg.appendChild(g);
  starDiv.appendChild(svg);

  return starDiv;
}
