function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const cartContainer = document.querySelector(".cart-container") as HTMLElement;
  const totalPriceEl = document.querySelector(".total-price") as HTMLElement;

  let totalPrice = 0;

  if (cart.length > 0) {
    cart.forEach((item: { id: number; title: string; price: number; quantity: number }) => {
      const productRow = document.createElement("div");
      productRow.className = "cart-item";

      productRow.innerHTML = `
        <span>${item.title}</span>
        <span>${item.quantity} st</span>
        <span>${item.price * item.quantity} kr</span>
      `;
      cartContainer.appendChild(productRow);

      totalPrice += item.price * item.quantity;
    });
  } else {
    cartContainer.textContent = "Din varukorg är tom.";
  }

  totalPriceEl.textContent = `Total: ${totalPrice} kr`;
}

  function handlePurchase() {
    const purchaseButton = document.querySelector(".purchase-button") as HTMLButtonElement;

    if (purchaseButton) {
      purchaseButton.addEventListener("click", () => {
        alert("Tack för ditt köp! Din beställning har mottagits.");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      });
    } else {
      console.error("Knappen 'purchase-button' kunde inte hittas.");
    }
  }


  loadCart();
  handlePurchase();
