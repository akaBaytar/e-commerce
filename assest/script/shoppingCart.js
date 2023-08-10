let cartCount = document.querySelector(".shopping-card-icon");

cartCount.innerHTML = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")).length
  : "0";
