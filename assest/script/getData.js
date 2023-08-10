// import
import { carousel } from "./carousel.js";

// local storage set item (json file from /database/data.json)
(async () => {
  const products = await fetch("../../assest/script/database/data.json");
  const data = await products.json();

  data ? localStorage.setItem("products", JSON.stringify(data)) : [];
  productFunc(data);
  carousel();
})();

// add to cart variables
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// local storage get item (product cards)
function productFunc(productCard) {
  const productCardContainer1 = document.getElementById(
    "carousel-card-container1"
  );
  const productCardContainer2 = document.getElementById(
    "carousel-card-container2"
  );

  let results = "";
  productCard.forEach((card) => {
    results += `<li class="card glide__slide">
    <span class="discount">-${card.discount}%</span>
    <div class="shortcut-buttons">
      <i class="add-to-cart bi bi-bag-fill" data-id=${card.id}>
        <span class="tooltip" data-id=${card.id}>Add to Cart</span>
      </i>
      <i class="bi bi-heart-fill">
        <span class="tooltip">Add to Favorites</span></i>
      <i class="bi bi-eye product-link" data-id=${card.id}>
        <span class="tooltip" data-id=${card.id}>
          Show Details
        </span>
      </i>
      <i class="bi bi-share-fill">
        <span class="tooltip">Share</span>
      </i>
    </div>
    <div class="card-top">
      <img
        class="product-img product-link"
        src="${card.img.image}"
        alt="Product"
        data-id=${card.id}
      />
      <img
        class="product-img-hover product-link"
        src="${card.img.thumbnails[1]}"
        alt="Product Secong Img"
        data-id=${card.id}
      />
    </div>
    <div class="card-bottom">
      <p class="product-name product-link" data-id=${card.id}>${card.name}</p>
      <div class="product-stars">
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      </div>
      <div class="product-price">
        <p class="new-price">$${card.price.newPrice.toFixed(2)}</p>
        <span class="old-price">$${card.price.oldPrice.toFixed(2)}</span>
      </div>
    </div>
  </li>`;
    productCardContainer1 ? (productCardContainer1.innerHTML = results) : "";
    productCardContainer2 ? (productCardContainer2.innerHTML = results) : "";
    addtoCart(productCard);
  });
  productRoute();
}

// add to cart function
function addtoCart(productCard) {
  const addtoCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.querySelector(".shopping-card-icon");

  addtoCartButtons.forEach((button) => {
    const inCart = cart.find((item) => item.id === Number(button.dataset.id));

    if (inCart) {
      button.classList.add("disabled");
    } else {
      button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const findProduct = productCard.find(
          (product) => product.id === Number(id)
        );
        cart.push({ ...findProduct, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        button.classList.add("disabled");
        cartCount.innerHTML = cart.length;
      });
    }
  });
}

// get product route for single-product.html
function productRoute() {
  const productLink = document.querySelectorAll(".product-link");
  productLink.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      localStorage.setItem("productID", JSON.stringify(id));
      window.location.href = "/single-product.html";
    });
  });
}
