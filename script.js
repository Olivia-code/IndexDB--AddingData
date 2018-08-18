window.onload = function(){

    var isDbOpened = false;

    var dbName = 'library';
    var dbVersion = 1;

    var dbRequest = indexedDB.open(dbName, dbVersion);

    dbRequest.onupgradeneeded = ((e)=>{
        var db = event.target.result;

        db.createObjectStore('books', { keyPath: 'isbn'});
    });

    dbRequest.onsuccess = ((e)=>{
        console.log("Db is Successfully opened!")
        isDbOpened = true;
    });

    dbRequest.onerror = ((e)=> {
        console.log("Db has an error! (:")
        isDbOpened = false;
    })



    $('#create-book-form').submit((e) => {
        e.preventDefault() // prevent the normal behaviour of submit behavior .
        
        if (isDbOpened) {

        // Form INPUTS

        const isbn = $('#isbn').val();
        const name = $('#name').val();
        const publication = $('#year').val();

        // Book Object

        var book = {
            isbn: isbn, 
            name: name,
            publication: publication,
            createdAt: new Date().getTime()
        };
            // Handling DB 
        var db = dbRequest.result;
        
            // Creating Transaction
        var transaction = db.transaction("books", "readwrite");

            // Handling Object Store
        var store = transaction.objectStore("books");

            // Adding Object to Object Store
        var request =  store.add(book);

        // Book is Added
        request.onsuccess = ((e)=> {
            alert("Book is added!");
        });

        // Book is Not Added

        request.onerror = ((e)=> {
            alert("Book is not Added!");
        });

      } else {
          alert("There is a DB Problem!");
      }
    });

}