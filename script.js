let myLibrary = [];

const booksView = document.getElementById("books-view");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return (title + " by " + author + ", " + pages + " pages, " + (read?"read":"not read yet"));
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    refreshBooksView();
}

function refreshBooksView() {
    booksView.innerHTML = "";

    let bookIndex = 0;
    myLibrary.forEach(book => {
        const bookDisplay = document.createElement('div');
        bookDisplay.setAttribute('data-library-index', bookIndex);
        bookDisplay.addEventListener('click', toggleReadStatus);
        bookDisplay.classList.add("book-display");


        const bookDisplayInformation = document.createElement('div');
        bookDisplayInformation.classList.add("book-display-information");
        bookDisplay.appendChild(bookDisplayInformation);

        const bookDisplayTitle = document.createElement('span');
        bookDisplayTitle.classList.add("book-display-title");
        bookDisplayTitle.textContent = book.title;
        bookDisplayInformation.appendChild(bookDisplayTitle);

        const bookDisplayAuthor = document.createElement('span');
        bookDisplayAuthor.classList.add("book-display-author");
        bookDisplayAuthor.textContent = book.author;
        bookDisplayInformation.appendChild(bookDisplayAuthor);

        const bookDisplayPages = document.createElement('span');
        bookDisplayPages.classList.add("book-display-pages");
        bookDisplayPages.textContent = book.pages + (book.pages != 1?" pgs":" pg");
        bookDisplayInformation.appendChild(bookDisplayPages);


        const bookDisplayActionsDiv = document.createElement('div');
        bookDisplayActionsDiv.classList.add('book-display-actions-div');
        bookDisplay.appendChild(bookDisplayActionsDiv);

        const bookDisplayDelete = document.createElement('button');
        bookDisplayDelete.classList.add("book-display-delete");
        bookDisplayDelete.textContent = "Delete";
        bookDisplayDelete.setAttribute('data-library-index', bookIndex);
        bookDisplayDelete.addEventListener('click', deleteBook);
        bookDisplayActionsDiv.appendChild(bookDisplayDelete);


        if(book.read) bookDisplay.classList.add("book-read");

        booksView.appendChild(bookDisplay);

        bookIndex++;
    });
}



const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener('click', toggleNewBookForm);

const newBookForm = document.getElementById("new-book-form");

function toggleNewBookForm(e) {
    if(newBookForm.style.display) newBookForm.style.display = "";
    else newBookForm.style.display = "block";
}




const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author");
const newBookPages = document.getElementById("pages");
const newBookHasRead = document.getElementById("has-read-checkbox");

const newBookSubmit = document.getElementById("submit");
newBookSubmit.addEventListener('click', addBook);

function addBook(e) {
    toggleNewBookForm();

    let title = newBookTitle.value;
    let author = newBookAuthor.value;
    let pages = newBookPages.value;
    let hasRead = newBookHasRead.checked;

    let book = new Book(title, author, pages, hasRead);
    addBookToLibrary(book);

    clearForm();
}

function deleteBook(e) {
    let bookIndex = this.getAttribute('data-library-index');
    myLibrary.splice(bookIndex,1);
    refreshBooksView();
}

function toggleReadStatus(e) {
    let bookIndex = this.getAttribute('data-library-index');
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    refreshBooksView();
}

function clearForm() {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookHasRead.checked = false;
}