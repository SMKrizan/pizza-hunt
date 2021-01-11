// creates variable to hold/store the db-object connection
let db;
// acting as event listener for the db: establishes a "pizza_hunt" connection to IndexedDB database and sets its version to 1. 'indexedDB' is a global variable and part of the browser's 'window' object (e.g. would also work to put '...window.indexedDB.open...'). 
const request = indexedDB.open('pizza_hunt', 1);

// emits the first time its run and then if the db version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // saves reference to db
    const db = event.target.result;
    // creates object store called 'new_pizza' set to have an auto-incrementing primary key
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// event handler
request.onsuccess = function(event) {
    // once db w/ object store is succesfully created and/or connection established, saves reference to db in global variable
    db = event.target.result;

    // checks whether app is online, if yes runs uploadPizza() function to send all local db data to api
    if (navigator.onLine) {

    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

