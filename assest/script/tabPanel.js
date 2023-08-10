//variables
const tabButton = document.querySelectorAll(".tab-panel-item");
const tabContent = document.querySelectorAll(".meta-tab-panel-item");

const tabPanelWrapper = document.querySelector(".tab-panel-wrapper");

//functions
tabPanelWrapper.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  if (id) {
    tabButton.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");
    tabContent.forEach((content) => content.classList.remove("active"));
    let content = document.getElementById(id);
    content.classList.add("active");
  }
});
