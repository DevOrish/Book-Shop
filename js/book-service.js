'use strict';
var gNextId = 101;
var gBooks;
const BOOKS_KEY = 'books'

createBooks()
function createBooks() {
    var books = loadBooksFromStorage();

    if (!books || books.length === 0) {
        var books = [
            createBook('harry Potter 2', 20, 'img/1.jpg', 'J.K. Roaling'),
            createBook('Mulu\'s Adventures', 1, 'img/2.jpg', 'Sigmund Freud'),
            createBook('Koko The Singer Biography', 999, 'img/3.jpg', 'Zrobavel Halimi'),
            createBook('Holy Bible', 15, 'img/4.png', 'God')
        ]
    }
    gBooks = books;
    saveBooksToStorage();
    gNextId = gBooks[gBooks.length-1].id + 1;

}

function createBook(name, price, imgUrl, author) {
    return {
        id: gNextId++,
        name,
        price,
        imgUrl,
        author,
        rating: 0
    }
}

function getBooks() {
    return gBooks;
}

function addBook() {
    var name = prompt('Book Name?')
    var price = +prompt('Book Price?($USD)')
    var author = prompt('Author?')
    var book = createBook(name, price, 'img/noimage.png', author);
    gBooks.unshift(book);
    saveBooksToStorage()
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) { return book.id === bookId })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage()
}

function updateBookPrice(bookId, price) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    if (!book) return;
    book.price = price;
    saveBooksToStorage()
}

function UpdateRating(bookId, rating) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    if (!book) return;
    book.rating = rating;
    saveBooksToStorage()
}

function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}

