'use strict';

function init() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var srtHTMLs = books.map(function (book) {
        return `
         <tr>
             <td>${book.name}</td>
             <td>${book.price}</td>
             <td><img src="${book.imgUrl}"></td>
             <td>   <button class="button1" onclick="renderModal(${book.id})">Watch</button>
                    <button class="button2" onclick="onUpdateBookPrice(${book.id})">Update Price</button>
                    <button class="button3" onclick="onRemoveBook(${book.id})">Remove</button>
             </td>
        </tr>`
    })
    document.querySelector('.table-content').innerHTML = srtHTMLs.join('')
}

function renderModal(bookId) {
    var modalContent = document.querySelector('.modal-content')
    var books = getBooks()
    var book = books.find(function (book) {
        return book.id === bookId;
    })
    var strHTML = `
    <button onclick="onCloseModal()" class="close-button">x</button>
    <h1>Name: ${book.name}</h1>
    <img src="${book.imgUrl}" alt="${book.name} Cover">
    <h2>Author: ${book.author}</h2> 
    <h2>Rating:${book.rating}</h2>
    Rate:<input class="rate-input" type="number" min="0" max="10" placeholder="0-10">
    <button onclick="onUpdateRating(${bookId})" class="rating-button">Update</button>
    `
    modalContent.innerHTML = strHTML
    var modal = document.querySelector('.modal')
    modal.classList.remove('hide')

}
function onCloseModal() {
    var modal = document.querySelector('.modal')
    modal.classList.add('hide')
}

function onUpdateBookPrice(bookId) {
    var price = +prompt('New Price? ($USD)')

    updateBookPrice(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    var isSure = confirm('Are you sure?')
    if (!isSure) return;

    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    addBook()
    renderBooks()
}

function onUpdateRating(bookId) {
    var elRatingInput = document.querySelector('.rate-input')
    var newRating = elRatingInput.value
    UpdateRating(bookId, newRating)
    renderModal(bookId)
}

