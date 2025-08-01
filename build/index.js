"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
// --- DATA ---
// List of available products in the store
const products = [
    { id: 1, name: 'Apple', price: 1.5 },
    { id: 2, name: 'Bread', price: 2.0 },
    { id: 3, name: 'Milk', price: 1.2 },
];
// The user's shopping cart, initially empty
const cart = [];
// --- FUNCTIONS ---
/**
 * Displays all available products to the user.
 */
function viewProducts() {
    console.log('Available Products:');
    for (const product of products) {
        console.log(`${product.id}. ${product.name} - $${product.price.toFixed(2)}`);
    }
}
/**
 * Adds a selected product to the shopping cart.
 */
function addProductToCart() {
    viewProducts();
    const choice = prompt('Enter the product number to add to the cart: ');
    const productNumber = parseInt(choice);
    if (isNaN(productNumber) || productNumber < 1 || productNumber > products.length) {
        console.log('Invalid product number. Please try again.');
        return;
    }
    const selectedProduct = products[productNumber - 1];
    // Check if the product is already in the cart
    const cartItem = cart.find(item => item.id === selectedProduct.id);
    if (cartItem) {
        cartItem.quantity++;
    }
    else {
        cart.push(Object.assign(Object.assign({}, selectedProduct), { quantity: 1 }));
    }
    console.log(`${selectedProduct.name} added to cart!`);
}
/**
 * Displays the contents of the shopping cart and the total price.
 */
function viewCart() {
    if (cart.length === 0) {
        console.log('Your cart is empty.');
        return;
    }
    console.log('Your Cart:');
    let total = 0;
    for (const item of cart) {
        console.log(`- ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`);
        total += item.price * item.quantity;
    }
    console.log(`Total: $${total.toFixed(2)}`);
}
/**
 * Displays the final receipt and exits the program.
 */
function checkout() {
    if (cart.length === 0) {
        console.log('Your cart is empty. Nothing to check out.');
        return;
    }
    console.log('Final Receipt:');
    let total = 0;
    for (const item of cart) {
        console.log(`- ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`);
        total += item.price * item.quantity;
    }
    console.log(`Total Amount: $${total.toFixed(2)}`);
    console.log('Thank you for shopping with us!');
}
// --- MAIN APPLICATION LOGIC ---
/**
 * Main function to run the shopping cart application.
 */
function main() {
    let running = true;
    while (running) {
        console.log('\nWelcome to the Mini Shopping Cart!');
        console.log('What would you like to do?');
        console.log('1. View Products');
        console.log('2. Add Product to Cart');
        console.log('3. View Cart');
        console.log('4. Checkout & Exit');
        const choice = prompt('Enter your choice: ');
        switch (choice) {
            case '1':
                viewProducts();
                break;
            case '2':
                addProductToCart();
                break;
            case '3':
                viewCart();
                break;
            case '4':
                checkout();
                running = false;
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 4.');
                break;
        }
        if (running) {
            console.log('----------------------------');
        }
    }
}
// Start the application
main();
