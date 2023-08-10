//variables
const modal = document.querySelector(".search-wrapper");
const modalContainer = document.querySelector(".search-container");

const searchButton = document.querySelector(".bi-search");
const closeButton = document.querySelector(".close-button");

//events
searchButton.addEventListener("click", () => {
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
});

closeButton.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
});

document.addEventListener("click", (e) => {
  if (
    !e.composedPath().includes(modalContainer) &&
    !e.composedPath().includes(searchButton)
  ) {
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
  }
});

//functions
function searchItem() {
  const products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  const searchWrapper = document.querySelector(".search-results");
  let results = "";
  products.forEach((product) => {
    results += `
    <li class="search-item" data-id=${product.id}>
      <div class="search-item-image">
        <img src="${product.img.image}">
      </div>
      <div class="search-item-text">
        <h6 class="search-item-title">${product.name}</h6>
        <p class="search-item-sku">SKU: ${product.sku}</p>
        <strong class="search-item-price">
          $${product.price.newPrice.toFixed(2)}
        </strong>
      </div>
    </li>
    `;
  });
  searchWrapper.innerHTML = results;
  filterItem();
  goItem();
}
searchItem();

function goItem() {
  const items = document.querySelectorAll(".search-results .search-item");
  items.forEach((item) =>
    item.addEventListener("click", () => {
      let id = item.dataset.id;
      if (id) {
        localStorage.setItem("productID", JSON.stringify(id));
        window.location.href = "../../single-product.html";
      }
    })
  );
}

function filterItem() {
  const searchInput = document.querySelector(".search-center input");
  let value = "";
  let filtered = [];

  searchInput.addEventListener("input", (e) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const searchWrapper = document.querySelector(".search-results");
    value = e.target.value.trim().toLowerCase();
    filtered = products.filter((item) =>
      item.name.trim().toLowerCase().includes(value)
    );
    let result = "";
    filtered.forEach((product) => {
      result += `
      <li class="search-item" data-id=${product.id}>
        <div class="search-item-image">
          <img src="${product.img.image}">
        </div>
        <div class="search-item-text">
          <h6 class="search-item-title">${product.name}</h6>
          <p class="search-item-sku">SKU: ${product.sku}</p>
          <strong class="search-item-price">
            $${product.price.newPrice.toFixed(2)}
          </strong>
        </div>
      </li>
      `;
    });
    if (filtered.length == 0) {
      result = `<p style="line-height: 2rem; min-height: 2rem; padding-left: 0.2rem"> We can't seem to find the product you're looking for.</p>`;
    }
    searchWrapper.innerHTML = result;
    goItem();
  });
}
