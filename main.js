const addBooksForm = document.getElementById("addBooksForm");
const table = document.getElementById("tbodyID");

//function to get book entries from the form and adding them to local storage
function addBooksFormHalndler(e) {
  e.preventDefault();
  let dateID = Date.now();
  let titleTag = document.getElementById("title").value;
  let authorTag = document.getElementById("author").value;
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

  tdTitleTag.innerText = titleTag;
  tdAuthorTag.innerText = authorTag;
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
    title: titleTag,
    author: authorTag,
    ownership: ownershipTag,
    readingStatus: readingStatusTag,
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
  const getID = e.id;

  document.getElementById("title").value =
    e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

  document.getElementById("author").value =
    e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

  document.getElementById("review").value =
    e.parentElement.previousElementSibling.innerHTML;

  e.parentElement.parentElement.remove();

  //delete data in the local storage
  let library = JSON.parse(localStorage.getItem("bookEntry"));
  let updatedLibrary = library.filter((book) => {
    if (book.id != getID) {
      return book;
    }
  });

  localStorage.setItem("bookEntry", JSON.stringify(updatedLibrary));
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
      tdReadingStatusTag.innerText = book.readingStatus;
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


//download a csv file
function downloadFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = filename;
  a.click();

  //clearing anchor element 
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 0)
};


 //convert to a flat file
 function convertToCsv() {
  let library = JSON.parse(localStorage.getItem("bookEntry"));

  let csvFile = "ID,TITLE,AUTHOR,OWNERSHIP,READING STATUS,RATING,REVIEW\n"

  library.forEach((book) => {
    let row = book.id + "," + book.title + "," + book.author + "," + book.ownership + "," + book.readingStatus + "," + book.rating + "," + book.review + "\n"
    csvFile += row
  })

  var entries = new Blob([csvFile], {type: "text/csv"});

  downloadFile(entries, "your_library.csv");
};


