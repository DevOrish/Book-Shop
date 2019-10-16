'use strict';
var gTrans = {
    title: {
        en: 'BookShop',
        he: 'חנות הספרים שלך'
    },
    'watch-btn': {
        en: 'Watch',
        he: 'פרטים',
    },
    'update-price-btn': {
        en: 'Update Price',
        he: 'עדכן מחיר',
    },
    'remove-btn': {
        en: 'Remove',
        he: 'הסר',
    },
    name: {
        en: 'Name',
        he: 'שם',
    },
    author: {
        en: 'Author',
        he: 'מחבר',
    },
    rating: {
        en: 'Rating',
        he: 'דירוג',
    },
    rate: {
        en: 'Rate',
        he: 'דרג',
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    photo: {
        en: 'Photo',
        he: 'תמונה',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    'add-btn': {
        en: 'Add A Book',
        he: 'הוסף ספר',
    },
    sure: {
        en: 'Are you sure?',
        he: 'בטוח כפרה?',
    },
    'select-language': {
        en: 'Select-language',
        he: 'בחר שפה',
    },
    'added-name-msg': {
        en: 'New book name?',
        he: 'שם הספר שברצונך להוסיף?',
    },
    'added-price-msg': {
        en: 'New book price?',
        he: 'מחיר הספר החדש?',
    },
    'added-author-msg': {
        en: 'Author\'s name?',
        he: 'שם המחבר?',
    },
    'new-price': {
        en: 'New price?($USD)',
        he: 'מחיר חדש? (שח)',
    }

}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);
        el.innerText = txt;
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    else return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function convertToIls(num) {
    if (gCurrLang === 'he') return num *= 3.4;
    else return num
}