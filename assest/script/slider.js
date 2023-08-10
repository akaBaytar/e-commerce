// variables
const slide = document.querySelectorAll(".slide");
const slideDot = document.querySelectorAll(".slide-dot");
const prevButton = document.querySelector(".prev-slide-button");
const nextButton = document.querySelector(".next-slide-button");
let timer = 5000;

// functions
function prevSlide() {
  var activeSlide = document.querySelector(".activeSlide");
  var activeDot = document.querySelector(".activeDot");

  activeSlide.classList.remove("activeSlide");
  activeDot.classList.remove("activeDot");
  if (activeSlide.previousElementSibling) {
    activeSlide.previousElementSibling.classList.add("activeSlide");
    activeDot.previousElementSibling.classList.add("activeDot");
  } else {
    slide[slide.length - 1].classList.add("activeSlide");
    slideDot[slideDot.length - 1].classList.add("activeDot");
  }
}

function nextSlide() {
  var activeSlide = document.querySelector(".activeSlide");
  var activeDot = document.querySelector(".activeDot");

  activeSlide.classList.remove("activeSlide");
  activeDot.classList.remove("activeDot");
  if (activeSlide.nextElementSibling) {
    activeSlide.nextElementSibling.classList.add("activeSlide");
    activeDot.nextElementSibling.classList.add("activeDot");
  } else {
    slide[0].classList.add("activeSlide");
    slideDot[0].classList.add("activeDot");
  }
}

//interval
let slideInterval = setInterval(nextSlide, timer);

//orientation dots
for (let i = 0; i < slideDot.length; i++) {
  slideDot[i].addEventListener("click", () => {
    var activeSlide = document.querySelector(".activeSlide");
    var activeDot = document.querySelector(".activeDot");

    activeSlide.classList.remove("activeSlide");
    activeDot.classList.remove("activeDot");
    slide[i].classList.add("activeSlide");
    slideDot[i].classList.add("activeDot");

    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, timer);
  });
}

// function invocation
prevButton.addEventListener("click", () => {
  prevSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, timer);
});

nextButton.addEventListener("click", () => {
  nextSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, timer);
});
