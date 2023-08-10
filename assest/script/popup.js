//variables
const popupClose = document.querySelector(".popup-container .close-button");
const popupButton = document.querySelector(".popup-button");
const popupWrapper = document.querySelector(".popup-wrapper");
const popupContainer = document.querySelector(".popup-container");
const popupCheckbox = document.querySelector("#popup-checkbox");
const popupTimer = 3000;

//fuction
popupCheckbox.addEventListener("click", (e) => {
  if (e.target.checked) {
    localStorage.setItem("popup", JSON.stringify("dont-show-again"));
  } else {
    localStorage.removeItem("popup");
  }
});

setTimeout(() => {
  localStorage.getItem("popup")
    ? popupWrapper.classList.remove("show-popup")
    : popupWrapper.classList.add("show-popup");
}, popupTimer);

//events
popupClose.addEventListener("click", () =>
  popupWrapper.classList.remove("show-popup")
);

popupButton.addEventListener("click", () =>
  popupWrapper.classList.remove("show-popup")
);

document.addEventListener("click", (e) => {
  if (!e.composedPath().includes(popupContainer)) {
    popupWrapper.classList.remove("show-popup");
  }
});
