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
             <td>${formatCurrency(convertToIls(book.price))}</td>
             <td><img src="${book.imgUrl}"></td>
             <td>   
             <button class="button1" onclick="renderModal(${book.id})" data-trans="watch-btn">Watch</button>
                    <button class="button2" onclick="onUpdateBookPrice(${book.id})" data-trans="update-price-btn">Update Price</button>
                    <button class="button3" onclick="onRemoveBook(${book.id})" data-trans="remove-btn">Remove</button>
             </td>
        </tr>`
    })
    document.querySelector('.table-content').innerHTML = srtHTMLs.join('')
    doTrans();

}

function renderModal(bookId) {
    var modalContent = document.querySelector('.modal-content')
    var books = getBooks()
    var book = books.find(function (book) {
        return book.id === bookId;
    })
    var strHTML = `
    <button onclick="onCloseModal()" class="close-button">x</button>
    <h1><span data-trans="name">Name</span>: ${book.name}</h1>
    <img src="${book.imgUrl}" alt="${book.name} Cover">
    <h2><span data-trans="author">Author</span>: ${book.author}</h2> 
    <h2><span data-trans="rating"></span>: ${book.rating}</h2>
    <p data-trans="rate">Rate:</p><input class="rate-input" type="number" min="0" max="10" placeholder="0-10">
    <button onclick="onUpdateRating(${bookId})" class="rating-button" data-trans="update-btn">Update</button>`
    modalContent.innerHTML = strHTML
    var modal = document.querySelector('.modal')
    modal.classList.remove('hide')
    doTrans();

}
function onCloseModal() {
    var modal = document.querySelector('.modal')
    modal.classList.add('hide')
}

function onUpdateBookPrice(bookId) {
    var price = +prompt(getTrans('new-price'))

    updateBookPrice(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    var isSure = confirm(getTrans('sure'))
    if (!isSure) return;

    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var name = prompt(getTrans('added-name-msg'))
    var price = +prompt(getTrans('added-price-msg'))
    var author = prompt(getTrans('added-author-msg'))
    var book = createBook(name, price, 'img/noimage.png', author);
    addBook(book)
    renderBooks()
}

function onUpdateRating(bookId) {
    var elRatingInput = document.querySelector('.rate-input')
    var newRating = elRatingInput.value
    UpdateRating(bookId, newRating)
    renderModal(bookId)
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    renderBooks()
}