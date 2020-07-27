// localStorage.setItem('books',JSON.stringify([]));
// Class Book
class Book{
    constructor(serialNo,title,author,type){
        this.serialNo = serialNo;
        this.title = title;
        this.author = author;
        this.type = type;
    }
}

// Class Store: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(serialNo){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            
            if(book.serialNo === serialNo){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

// Class UI: Handles UI tasks
class UI {
    static displayBooks(){

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))
    }
    static addBookToList(book){
        const tableBody = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.serialNo}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete" id="delete">X</a></td>
        `
        tableBody.appendChild(row)
    }
    static clearInput(){
     document.querySelector('#serialNo').value = '';
     document.querySelector('#title').value = '';
     document.querySelector('#author').value = '';
     document.querySelector('#type').value = '';
    }
    static deleteBook(element){
        if(element.classList.contains('delete')){
           element.parentElement.parentElement.remove();
           UI.showAlert('Book Deleted Successfully','info');
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        const text = document.createTextNode(message);
        div.appendChild(text);
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(() =>{
            document.querySelector('.alert').remove()
        },3000);
    }
}



//Events diplay books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Events add a book
const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const serialNo = document.querySelector('#serialNo').value; 
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const type = document.querySelector('#type').value;

    if(serialNo === ''|| title === '' || author === '' || type === ''){
        UI.showAlert('Enter all fields','danger')
    }
    else{
        const book = new Book(serialNo,title,author,type)
   
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert('Book added Successfully','success');
        UI.clearInput();
      
    }
})


//Events Remove a book
const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (e) =>{
    UI.deleteBook(e.target);
    const row = e.target.parentElement.parentElement;
    const serialNo = row.firstChild.textContent;
    Store.removeBook(serialNo);
});
