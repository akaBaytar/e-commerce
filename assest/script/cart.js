//variables
let cartCount = document.querySelector(".shopping-card-icon");
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : localStorage.setItem("cart", JSON.stringify([]));

//functions
function displayTableItems() {
  const tableContainer = document.querySelector(".cart-item-container");
  let results = "";

  cart.forEach((item) => {
    results += `
        <tr class="cart-item">
            <td></td>
            <td class="cart-img">
                <img
                    src="${item.img.image}"
                    alt="${item.name}"
                />
            </td>
            <td class="cart-name">${item.name}</td>
            <td class="cart-price">$${item.price.newPrice.toFixed(2)}</td>
            <td class="cart-quantity">${item.quantity}</td>
            <td class="cart-subtotal">$${(
              item.price.newPrice * item.quantity
            ).toFixed(2)}</td>
            <td class="cart-delete">
            <span class="cart-delete-item">
                <i class="bi bi-x cart-delete-item-icon" data-id=${item.id}></i>
            </span>
            </td>
        </tr>
        `;
    tableContainer.innerHTML = results;
    deleteTableItems();
  });
}
displayTableItems();

function deleteTableItems() {
  const deleteButtons = document.querySelectorAll(".cart-delete-item-icon");
  let cartCount = document.querySelector(".shopping-card-icon");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = window.location.href;
      }
      cartCount.innerHTML = cart.length;
      displayTableItems();
      cartCalculation();
    });
  });
}

function cartCalculation() {
  let itemsTotal = 0;
  cart.length > 0 &&
    cart.map((item) => {
      itemsTotal += item.price.newPrice * item.quantity;
    });

  //cart total calculation
  const cartSubtotal = document.querySelector("#cart-subtotal");
  const fastCargo = document.querySelector("#fast-cargo");
  const cartTotal = document.querySelector("#cart-total");
  const fastCargoPrice = 30;

  cartSubtotal.innerHTML = `$${itemsTotal.toFixed(2)}`;
  cartTotal.innerHTML = `$${itemsTotal.toFixed(2)}`;

  fastCargo.addEventListener("change", (e) => {
    if (e.target.checked) {
      cartTotal.innerHTML = `$${(itemsTotal + fastCargoPrice).toFixed(2)}`;
    } else {
      cartTotal.innerHTML = `$${itemsTotal.toFixed(2)}`;
    }
  });

  //progress bar calculation
  const progressBar = document.querySelector(".progress-bar-progress");
  const freeCargoProgress = document.querySelector(".progress-bar-count");
  const freeCargo = 400;

  progressBar.style.width = `${(itemsTotal * 100) / freeCargo}%`;

  if (itemsTotal < freeCargo) {
    freeCargoProgress.innerHTML = `$${(freeCargo - itemsTotal).toFixed(2)}`;
  }
}
cartCalculation();
