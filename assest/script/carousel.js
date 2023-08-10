export function carousel() {
  const productCardContainer1 = document.getElementById(
    "carousel-card-container1"
  );
  const productCardContainer2 = document.getElementById(
    "carousel-card-container2"
  );

  const config = {
    bound: true,
    startAt: 0,
    perView: 4,
    gap: 30,
    animationDuration: 500,
    breakpoints: {
      1200: {
        perView: 3,
      },
      992: {
        perView: 2,
      },
      576: {
        perView: 1,
      },
    },
  };
  productCardContainer1 && new Glide(".carousel1", config).mount();
  productCardContainer2 && new Glide(".carousel2", config).mount();
}