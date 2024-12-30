import './styles/main.css'
import { renderProductList } from './js/products.ts'

renderProductList()

// typescript för footer
const subscribeButton = document.getElementById("subscribe-button") as HTMLButtonElement;
const emailInput = document.getElementById("email-input") as HTMLInputElement;

subscribeButton.addEventListener("click", () => {
    const email = emailInput.value;

    if (validateEmail(email)) {
        alert(`BFF <3 Vi skickar nyhetsbrev till dig på, ${email}`);
        emailInput.value = "";
    } else {
        alert("Vänligen ange en giltig e-postadress.");
    }
});

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
