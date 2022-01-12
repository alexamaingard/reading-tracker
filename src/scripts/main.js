let state = {
    username: null,
    id: null,
    library: [], //bookIds
    filters: {
        bookSearchedByISBN: null,
        bookSearchedByTitleOrAuthor: null,
        filteredBooks: []
    },
    bookId: null,
    usersBooks: []
};

async function checkIfStoredBook(book){
    const res = await fetch(librariesURL);
    const library = await res.json();

    const pickedBook = library.filter(stored => stored.isbn === book.isbn);
    const alreadyStored = pickedBook.length;
    if(alreadyStored && !state.library.includes(pickedBook[0].id)){
        setState({bookId: pickedBook[0].id});
        state.library.push(pickedBook[0].id);
    }
    return alreadyStored? true : false;
}

async function fetchBook(){
    const bookInfo = await fetchBookInfo();
    const bookDescription = await fetchBookDescription();
    const book = cleanBookData(bookInfo, bookDescription);
    const alreadyStored = await checkIfStoredBook(book);
    if(!alreadyStored){
        await pushBookToLibrary(book);
    }
    await updateUserData();
}

async function pushBookToLibrary(book){
    let bookId;
    await fetch(librariesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (value) {
            bookId = value.id;
        }
    );
    setState({bookId: bookId});
    state.library.push(bookId);
}

function identifySearchFilter(searchInput){
    return isNaN(searchInput)? 'string' : 'number';
}

function filterByTitleOrAuthor(filter, dataSource, dataToFilter, callBack){
    const filterRegEx = new RegExp(filter, "i");
    const filtered = dataToFilter.filter(books => books.title.match(filterRegEx));
    dataToFilter.forEach(book => {
        book.authors.forEach(author => {
            if(author.match(filterRegEx)){
                filtered.push(book);
            }
        });
    })
    if(dataSource === 'state'){
        state.filters.filteredBooks = filtered;
    }
    else{
        swapState.filters.filteredBooks = filtered;
    }
    callBack();
}

function filterByISBN(filter, dataSource, dataToFilter, callBack){
    const filtered = dataToFilter.filter(books => books.isbn === filter);
    if(dataSource === 'state'){
        state.filters.filteredBooks = filtered;
    }
    else {
        swapState.filters.filteredBooks = filtered;
    }
    callBack();
}