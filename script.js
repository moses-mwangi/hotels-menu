////////////////////// import module ///////////////////////////////
import "./shoppingCart.js";
// import { addToCart, shippingCost as price, cart } from "./shoppingCart.js";
// console.log(cart);
// console.log(price);
// addToCart("bread", 5);
/*
import * as shopping from "./shoppingCart.js";
console.log("import module");
console.log(shopping.cart);
console.log(shopping.shippingCost);
shopping.addToCart("bread", 5);

import add from "./shoppingCart.js";
add("meat pork", 8);

console.log("start fetching data");
const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, body: data.at(-1).body };
};
const lastPost = await getLastPost();
console.log(lastPost);
console.log("finish fetching data");
*/

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
    addToCart,
  };
})();
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2.shippingCost);
console.log(ShoppingCart2.totalPrice);
