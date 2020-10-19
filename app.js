// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addToBookList = function(book){

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

UI.prototype.clearInputFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = function(message, className){
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

UI.prototype.deleteBook = function(target){
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove();

        // Initialize UI Constructor
        const ui = new UI();

        // Success Alert
        ui.showAlert('Book Deleted', 'success');
    }
}

// Event Listener
document.querySelector('#book-form').addEventListener('submit', runFirstEvent);
document.querySelector('#book-list').addEventListener('click', runSecondEvent);

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

        // Call clearInputFields FUnction
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

    e.preventDefault();
}
