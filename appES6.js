// Book Class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI{
    addToBookList(book){
        const list = document.querySelector('#book-list');

        // Create tr element
        let tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`

        // Append tr to list
        list.appendChild(tr);
    }

    clearInputFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showAlert(message, className){
        // Create div
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.textContent = message;

        // Add alert div before form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // To remove div after 3s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }

    deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();

            // Initialize UI Constructor
             const ui = new UI();

            // Success Alert
            ui.showAlert('Book Deleted', 'success');
        }
    }
}

// Local Storage
class Store{

    static getBooks(){

        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBook(){
        const books = Store.getBooks();

        // Initialize UI Constructor
        const ui = new UI();

        books.forEach(function(book) {

            // Call addToBookList Function to display book
            ui.addToBookList(book);
        });
    }

    static removeBook(target){
        if(target.classList.contains('delete')){
            let isbn = target.parentElement.previousElementSibling.textContent;
            
            const books = Store.getBooks();

            books.forEach(function(book, index){
                if(isbn === book.isbn){
                    books.splice(index, 1);
                }

                localStorage.setItem('books', JSON.stringify(books));
            });
        }
    }
}

// Event Listener
document.querySelector('#book-form').addEventListener('submit', runFirstEvent);
document.querySelector('#book-list').addEventListener('click', runSecondEvent);
document.addEventListener('DOMContentLoaded', Store.displayBook); // DOM Load Event

// runSecondEvent Function
function runFirstEvent(e){

    //Form Input Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Initialize Book Constructor
    const book = new Book(title, author, isbn);

    // Initialize UI Constructor
    const ui = new UI();

    if(title!='' && author!='' && isbn!=''){

         // Call addToBookList Function
         ui.addToBookList(book);

        // Add to Local Storage
        Store.addBook(book);

        // Call clearInputFields Function
        ui.clearInputFields();

        // Succcess Alert
        ui.showAlert('Book Added', 'success');
    }
    else{
        // Error Alert
        ui.showAlert('Please fill in all the fields','error');
    }

    e.preventDefault();
}


// runSecondEvent Function
function runSecondEvent(e){

    // Initialize UI Constructor
    const ui = new UI();

    ui.deleteBook(e.target);

    Store.removeBook(e.target)

    e.preventDefault();
}