////////////////////// import module ///////////////////////////////
// import "./shoppingCart.js";
// import { addToCart, shippingCost as price, cart } from "./shoppingCart.js";
// console.log(cart);
// console.log(price);
// addToCart("bread", 5);
import * as shopping from "./shoppingCart.js";
console.log("import module");
console.log(shopping.cart);
console.log(shopping.shippingCost);
shopping.addToCart("bread", 5);

import add from "./shoppingCart.js";
add("meat pork", 8);

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, body: data.at(-1).body };
};
const lastPost = await getLastPost();
console.log(lastPost);
