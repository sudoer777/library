let myLibrary = [];

let booksView = document.getElementById("books-view");

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