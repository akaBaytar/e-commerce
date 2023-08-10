//variables
let comments = [];
let commentUsername = "";
let commentText = "";

// DOM variables
const reviewContainer = document.querySelector(".review-list");
const reviewCount = document.querySelector("#reviewCount");
const textarea = document.querySelector("#review-form-textarea");
const username = document.querySelector("#review-form-username");
const addCommentButton = document.querySelector("#addcomment-button");

//events
textarea.addEventListener("input", (e) => {
  commentText = e.target.value;
});

username.addEventListener("input", (e) => {
  commentUsername = e.target.value;
});

addCommentButton.addEventListener("click", addComment);

// fuctions
function addComment() {
  let result = "";
  comments.push({ text: commentText, name: commentUsername });
  comments.forEach((comment) => {
    result += `
          <li class="review-item">
          <div class="user-image">
            <img src="../img/avatars/avatar2.jpg" alt="User IMG" />
          </div>
          <div class="user-review">
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="user-meta">
              <strong class="username"> ${comment.name} </strong>
              <span>-</span>
              <div class="meta-date">April 23,2024</div>
            </div>
            <p class="review"> ${comment.text} </p>
          </div>
        </li>
          `;
      reviewCount.innerHTML = comments.length;
      reviewContainer.innerHTML = result;
      textarea.value = "";
      username.value = "";
  });
}
