///export module
console.log("export module");

const shippingCost = 10;
const cart = [];
export { shippingCost, cart };

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity, type: "sugar" });
  console.log(`${quantity} ${product} added to cart`);
};

export default function (product, quantity) {
  cart.push({ product, quantity, type: "sugar" });
  console.log(`${quantity} ${product} added to cart`);
}
