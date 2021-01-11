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
        uploadPizza();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// executes upon attempt to submit new pizza when internet connection is not available (e.g. when add-pizza.js's fetch().catch() method executes, as this indicates some kind of network failure)
function saveRecord(record) {
    // opens a new (temporary) db transaction with read and write permissions; note this is different from SQL and MongoDB for which there is a constant direct connection; helps idb to maintain accurate reading of data it stores so that data is not constantly in flux
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // provides access to object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // adds record to store via add() method
    pizzaObjectStore.add(record);
}

function uploadPizza() {
    // opens a transaction on db
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // accesses object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // gets and sets records from store to variable; getAll() DOES NOT auto receive all data from object store; this method is actually an asynchronous function to which we must attach an event handler in order to retrieve data
    const getAll = pizzaObjectStore.getAll();

    getAll.onsuccess = function() {
        // sends data array to api server if it is present in indexDB's store
        if (getAll.result.length > 0) {
            // the Mongoose create() method can handle both single objects or an array of objects, so a single route and controller method can handle this request given either situation
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                // open one more transaction
                const transaction = db.transaction(['new_pizza'], 'readwrite');
                // access new_pizza object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                // clear items in store
                pizzaObjectStore.clear();

                alert('All saved pizzas have been submitted');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}

// listens for app coming back online
window.addEventListener('online', uploadPizza);