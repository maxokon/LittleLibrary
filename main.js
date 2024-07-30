//Adding books
const addBooksForm = document.getElementById("addBooksForm");
const table = document.getElementById("tbodyID");

function addBooksFormHalndler(e) {
  e.preventDefault();
  let dateID = Date.now;
  let titleTag = document.getElementById("title");
  let authorTag = document.getElementById("author");
  let ownershipTag = $("#ownershipID input:radio:checked").val();
  let readingStatusTag = $("#readingID input:radio:checked").val();
  let ratingTag = $("#ratingID input:radio:checked").val();
  let reviewTag = document.getElementById("review").value;

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
  tdOwnershipTag.innerText = ownershipTag;
  tdReadingStatusTag.innerText = readingStatusTag;
  tdRatingTag.innerText = ratingTag;
  tdReviewTag.innerText = reviewTag;
  tdDeleteTag.innerHTML = `<button class="btn btn-danger" id=${dateID} onclick="this.parentElement.parentElement.remove()" >Remove</button>`;

  trTag.appendChild(tdTitleTag);
  trTag.appendChild(tdAuthorTag);
  trTag.appendChild(tdOwnershipTag);
  trTag.appendChild(tdReadingStatusTag);
  trTag.appendChild(tdRatingTag);
  trTag.appendChild(tdReviewTag);
  trTag.appendChild(tdDeleteTag);

  table.append(trTag);

  //Local Storage
  let library = [];

  if (localStorage.getItem("bookEntry")) {
    library = JSON.parse(localStorage.getItem("bookEntry"));
  }

  let newBook = {
    id: dateID,
    title: titleTag.value,
    author: authorTag,
    ownership: ownershipTag,
    reading_status: readingStatusTag,
    rating: ratingTag,
    review: reviewTag,
  };

  library.push(newBook);
  localStorage.setItem("bookEntry", JSON.stringify(library));
}

//delete function
/*
function (e) {
  const getID = e.id;
}
*/

addBooksForm.addEventListener("submit", addBooksFormHalndler);

//loading the book entries
window.onload = function () {
  let library = [];
  if (this.localStorage.getItem("bookEntry")) {
    library = JSON.parse(this.localStorage.getItem("bookEntry"));

    library.forEach((book) => {
      let trTag = document.createElement("tr");
      let tdTitleTag = document.createElement("td");
      let tdAuthorTag = document.createElement("td");
      let tdOwnershipTag = document.createElement("td");
      let tdReadingStatusTag = document.createElement("td");
      let tdRatingTag = document.createElement("td");
      let tdReviewTag = document.createElement("td");
      let tdDeleteTag = document.createElement("td");

      tdTitleTag.innerText = book.title;
      tdAuthorTag.innerText = book.author;
      tdOwnershipTag.innerText = book.ownership;
      tdReadingStatusTag.innerText = book.reading_status;
      tdRatingTag.innerText = book.rating;
      tdReviewTag.innerText = book.review;
      tdDeleteTag.innerHTML = `<button class="btn btn-danger" id=${book.id} onclick="this.parentElement.parentElement.remove()" >Remove</button>`;

      trTag.appendChild(tdTitleTag);
      trTag.appendChild(tdAuthorTag);
      trTag.appendChild(tdOwnershipTag);
      trTag.appendChild(tdReadingStatusTag);
      trTag.appendChild(tdRatingTag);
      trTag.appendChild(tdReviewTag);
      trTag.appendChild(tdDeleteTag);

      table.append(trTag);
    });
  }
};
