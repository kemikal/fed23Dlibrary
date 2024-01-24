let bookList = document.getElementById("bookList");
let bookInfo = document.getElementById("bookInfo");

function printBooks() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        console.log("böcker", data);

        data.map(book => {
            let li = document.createElement("li");
            li.innerText = book.bookName;

            li.addEventListener("click", () => {
                console.log("click", book.bookName);
                printBookInfo(book.id);
            })

            bookList.appendChild(li);
        })
    })
}

function printBookInfo(bookId) {
    bookInfo.innerHTML = "";
    fetch("http://localhost:3000/books/" + bookId)
    .then(res => res.json())
    .then(data => {
        console.log("En bok", data);

        let bookDiv = document.createElement("div");
        let bookTitle = document.createElement("h3");
        bookTitle.innerText = data.bookName;
        let bookAuthor = document.createElement("span");
        bookAuthor.innerText = data.Author;
        let bookISBN = document.createElement("span");
        bookISBN.innerText = data.isbn;
        let bookRented = document.createElement("span");
        bookRented.innerText = data.rented;

        let rentBtn = document.createElement("button");

        rentBtn.innerText = !data.rented ? "Låna" : "Lämna tillbaks";

        rentBtn.addEventListener("click", () => {
            fetch("http://localhost:3000/books/"+bookId, {
                method: "PATCH"
            })
            .then(res => res.json())
            .then(data => {
                console.log("Rent a book", data);
                printBookInfo(bookId);
            })
        })


        bookDiv.append(bookTitle, bookAuthor, bookISBN, rentBtn);
        bookInfo.appendChild(bookDiv);

    })
}

printBooks();