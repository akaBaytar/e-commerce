// variables
const productID = localStorage.getItem("productID")
  ? JSON.parse(localStorage.getItem("productID"))
  : localStorage.setItem("productID", JSON.stringify(1));

const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : localStorage.setItem("products", JSON.stringify([]));

const product = products.find((item) => item.id === Number(productID));

// DOM variables
const title = document.querySelector(".product-title");
title.innerHTML = product.name;

const oldPrice = document.querySelector(".old-price");
const newPrice = document.querySelector(".new-price");
oldPrice.innerHTML = `$${product.price.oldPrice.toFixed(2)}`;
newPrice.innerHTML = `$${product.price.newPrice.toFixed(2)}`;

const sku = document.querySelector(".sku-code");
sku.innerHTML = product.sku;

const productImage = document.querySelector(".product-photo img");
productImage.src = product.img.image;

const thumbnailContainer = document.querySelector(".product-thumbnails");
let result = "";
product.img.thumbnails.forEach((thumbnail) => {
  result += `
  <img
    src="${thumbnail}"
    width="100px"
    alt="Product Thumbnail"
  />`;
  thumbnailContainer.innerHTML = result;
});

// add to Cart
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const quantity = document.querySelector("#count");
const findCart = cart.find((item) => item.id === product.id);
const button = document.getElementById("add-to-cart-button");

if (findCart) {
  button.setAttribute("disabled", "disabled");
} else {
  button.addEventListener("click", () => {
    cart.push({ ...product, quantity: Number(quantity.value) });
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.innerHTML = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : "0";
    button.setAttribute("disabled", "disabled");
  });
}
