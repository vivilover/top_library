let myLibrary = [
  {
    "bookname": "Fashion Magazine",
    "author": "vogue",
    "read": "read"
  },
  {
    "bookname": "bible",
    "author": "God",
    "read": "not-read"
  },
]

let form = document.querySelector('.book-add-form') // can change to ('form')
let formBookName = document.querySelector('#bookname')
let formBookAuthor = document.querySelector('#author-name')
let formReadButtons = document.getElementsByClassName('readbtn') // form 'read', 'not-read' buttons
const formSubmitBtn = document.querySelector('bookform-submit-btn') // might not need this code
let readStatus = undefined // radioButton read-status from form
let totalBooks = 0
let totalRead = 0
let totalNotRead = 0
let ttlBookDiv = document.querySelector('.total-book')
let ttlReadBookDiv = document.querySelector('.total-read-book')
let ttlUnreadBookDiv = document.querySelector('.total-unread-book')

function Book(bookname, author, readProgress) {
  // the constructor...
  this.bookname = bookname;
  this.author = author;
  this.readProgress = readProgress
  totalBooks += 1

  if (this.readProgress == 'read') {
    totalRead += 1
  } else if (this.readProgress == 'not-read') {
    totalNotRead += 1
  }
}

// clear book form
function clearForm() {
  formBookName.value = ''
  formBookAuthor.value = ''
  let radioBtns = document.getElementsByName('book-read-or-not')
  for(let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].checked = false
  }
}

// display total number of books on top right corner
function displayBookStats() {
  ttlBookDiv.textContent = totalBooks
  ttlReadBookDiv.textContent = totalRead
  ttlUnreadBookDiv.textContent = totalNotRead
}

function addBookToLibrary() {
  const container = document.querySelector('.library-container')

  // add default books to the UI
  myLibrary.forEach(book => {
    let bookObj = new Book(book.bookname, book.author, book.read)
    const title = document.createElement('div')
    title.classList.add('book-title')
    title.textContent = bookObj.bookname

    const author = document.createElement('div')
    author.classList.add('book-author')
    author.textContent = bookObj.author

    const readOrNot = document.createElement('div')
    readOrNot.classList.add('book-read')
    readOrNot.textContent = bookObj.readProgress
    if (bookObj.readProgress == 'read') {
      readOrNot.style.backgroundColor = 'rgba(60, 179, 113, 0.5)'
    } else {
      readOrNot.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    }
    readOrNot.addEventListener('click', toggleColor)
    container.appendChild(title)
    container.appendChild(author)
    container.appendChild(readOrNot)
  })
  displayBookStats()
}

form.onsubmit = function(e) {
  e.preventDefault()
  var radioBtns = document.getElementsByName('book-read-or-not')

  for(let i = 0; i < radioBtns.length; i++) {
    if(radioBtns[i].checked) {
      readStatus = radioBtns[i].value
    }
  }

  const bookObj = new Book(formBookName.value, formBookAuthor.value, readStatus)
  const container = document.querySelector('.library-container')

  const title = document.createElement('div') // title column
  title.classList.add('book-title')
  title.textContent = bookObj.bookname

  const author = document.createElement('div') // author column
  author.classList.add('book-author')
  author.textContent = bookObj.author

  const read = document.createElement('div') // readStatus column
  read.classList.add('book-read')
  read.textContent = bookObj.readProgress
  read.addEventListener('click', toggleColor)
  // console.log(bookObj.readProgress)
  if (bookObj.readProgress == 'read') {
    read.style.backgroundColor = 'rgba(60, 179, 113, 0.5)'
  } else {
    read.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
  }

  container.appendChild(title)
  container.appendChild(author)
  container.appendChild(read)

  clearForm()
  displayBookStats()
}

addBookToLibrary();

// Change colors of 'Status' btns onclick
const readStatusBtn = document.querySelectorAll('.book-read')

function toggleColor() {
  if (this.textContent == 'read') {
    this.textContent = 'not-read'
    this.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    totalNotRead += 1
    totalRead -= 1
    displayBookStats()
  } else if (this.textContent == 'not-read') {
    this.textContent = 'read'
    this.style.backgroundColor = 'rgba(60, 179, 113, 0.5)'
    totalRead += 1
    totalNotRead -= 1
    displayBookStats()
  }
}