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

    myLibrary.forEach(book => {
        let bookDisplay = document.createElement('div');
        bookDisplay.classList.add("book-display");
        
        let bookDisplayTitle = document.createElement('span');
        bookDisplayTitle.classList.add("book-display-title");
        bookDisplayTitle.textContent = book.title;
        bookDisplay.appendChild(bookDisplayTitle);

        let bookDisplayAuthor = document.createElement('span');
        bookDisplayAuthor.classList.add("book-display-author");
        bookDisplayAuthor.textContent = book.author;
        bookDisplay.appendChild(bookDisplayAuthor);

        let bookDisplayPages = document.createElement('span');
        bookDisplayPages.classList.add("book-display-pages");
        bookDisplayPages.textContent = book.pages + (book.pages != 1?" pgs":" pg");
        bookDisplay.appendChild(bookDisplayPages);

        if(book.read) bookDisplay.classList.add("book-read");

        booksView.appendChild(bookDisplay);
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

function clearForm() {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookHasRead.checked = false;
}