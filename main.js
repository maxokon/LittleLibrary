//Adding books
const addBooksForm = document.getElementById("addBooksForm");
const table = document.getElementById("tbodyID");

function addBooksFormHalndler(e) {
  e.preventDefault();
  let titleTag = document.getElementById("title");
  let authorTag = document.getElementById("author");
  let ownershipTag;
  let readingStatusTag;
  let ratingTag;
  let reviewTag = document.getElementById("review");

  let trTag = document.createElement("tr");
  let tdTitleTag = document.createElement("td");
  let tdAuthorTag = document.createElement("td");
  let tdOwnershipTag = document.createElement("td");
  let tdReadingStatusTag = document.createElement("td");
  let tdRatingTag = document.createElement("td");
  let tdReviewTag = document.createElement("td");
  let tdDeleteTag = document.createElement("td");

  tdTitleTag.innerText = titleTag.value;
  tdAuthorTag.innerText = authorTag.value;
}

addBooksForm.addEventListener("submit", addBooksFormHalndler);
