const addBooksForm = document.getElementById("addBooksForm");
const table = document.getElementById("tbodyID");

//function to get book entries from the form and adding them to local storage
function addBooksFormHalndler(e) {
  e.preventDefault();
  let dateID = Date.now();
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
  let tdEditTag = document.createElement("td");
  let tdDeleteTag = document.createElement("td");

  tdTitleTag.innerText = titleTag.value;
  tdAuthorTag.innerText = authorTag.value;
  tdOwnershipTag.innerText = ownershipTag;
  tdReadingStatusTag.innerText = readingStatusTag;
  tdRatingTag.innerText = ratingTag;
  tdReviewTag.innerText = reviewTag;
  tdEditTag.innerHTML = `<button class="btn btn-info" id=${dateID} onclick="editBook(this)" >Edit</button>`;
  tdDeleteTag.innerHTML = `<button class="btn btn-danger" id=${dateID} onclick="removeBook(this)" >Remove</button>`;

  trTag.appendChild(tdTitleTag);
  trTag.appendChild(tdAuthorTag);
  trTag.appendChild(tdOwnershipTag);
  trTag.appendChild(tdReadingStatusTag);
  trTag.appendChild(tdRatingTag);
  trTag.appendChild(tdReviewTag);
  trTag.appendChild(tdEditTag);
  trTag.appendChild(tdDeleteTag);

  table.append(trTag);

  addBooksForm.reset();

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
function removeBook(e) {
  const getID = e.id;
  //deletes a tr tag from users side
  e.parentElement.parentElement.remove();

  //deletes from local storage
  let library = JSON.parse(localStorage.getItem("bookEntry"));
  let updatedLibrary = library.filter((book) => {
    if (book.id != getID) {
      return book;
    }
  });

  localStorage.setItem("bookEntry", JSON.stringify(updatedLibrary));
}

//edit function
function editBook(e) {
  document.getElementById("submitBTN").style.display = "none";
  document.getElementById("updateBTN").style.display = "block";

  document.getElementById("title").value =
    e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

  document.getElementById("author").value =
    e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

  document.getElementById("review").value =
    e.parentElement.previousElementSibling.innerHTML;
}

addBooksForm.addEventListener("submit", addBooksFormHalndler);
addBooksForm.reset();

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
      let tdEditTag = document.createElement("td");
      let tdDeleteTag = document.createElement("td");

      tdTitleTag.innerText = book.title;
      tdAuthorTag.innerText = book.author;
      tdOwnershipTag.innerText = book.ownership;
      tdReadingStatusTag.innerText = book.reading_status;
      tdRatingTag.innerText = book.rating;
      tdReviewTag.innerText = book.review;
      tdEditTag.innerHTML = `<button class="btn btn-info" id=${book.id} onclick="editBook(this)" >Edit</button>`;
      tdDeleteTag.innerHTML = `<button class="btn btn-danger" id=${book.id} onclick="removeBook(this)" >Remove</button>`;

      trTag.appendChild(tdTitleTag);
      trTag.appendChild(tdAuthorTag);
      trTag.appendChild(tdOwnershipTag);
      trTag.appendChild(tdReadingStatusTag);
      trTag.appendChild(tdRatingTag);
      trTag.appendChild(tdReviewTag);
      trTag.appendChild(tdEditTag);
      trTag.appendChild(tdDeleteTag);

      table.append(trTag);
    });
  }
};
