//TEST ISBN: 9780141986388

/* API URLs */
const descriptionURL_I = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const searchURL_I = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
const searchURL_II = '&jscmd=data&format=json';

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

function isValidISBN(isbn){
    if(isbn.length === 10 || isbn.length === 13){
        for(let i = 0; i < isbn.length; i++){
            if(isNaN(parseInt(isbn.charAt(i)))){
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

function cleanBookData(info, desc){
    const title = info[`ISBN:${state.filters.bookSearchedByISBN}`].title;
    const authors = [];
    info[`ISBN:${state.filters.bookSearchedByISBN}`].authors.forEach(author => {
        authors.push(author.name);
    });
    const url = info[`ISBN:${state.filters.bookSearchedByISBN}`].url;
    const coverURLs = info[`ISBN:${state.filters.bookSearchedByISBN}`].cover;
    let description;
    if(typeof(desc) === 'object'){
        description = desc.items[0].volumeInfo.description;
    }
    else {
        description = desc;
    }
    return book = {
        isbn: state.filters.bookSearchedByISBN,
        title: title,
        authors: authors,
        url: url,
        coverURLs: coverURLs,
        description: description 
    };
}

async function updateUserData(){
    await fetch(usersURL + state.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: state.username, library: state.library, id: state.id})
    })
}

async function fetchBookInfo(){
    const searchURL = searchURL_I + state.filters.bookSearchedByISBN + searchURL_II;

    const res = await fetch(searchURL);
    const data = await res.json();
    return data;
}

async function fetchBookDescription(){
    const descriptionURL = descriptionURL_I + state.filters.bookSearchedByISBN;

    const res = await fetch(descriptionURL);
    const data = await res.json();
    return data.totalItems? data: 'No description available';
}

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

async function renderBooksInLibrary(parentElement, dataSource){
    parentElement.innerText = '';

    const res = await fetch(librariesURL);
    const library = await res.json();

    if(dataSource === 'state'){
        if(state.filters.filteredBooks.length > 0){
            state.filters.filteredBooks.forEach(book => {
                renderBook(book, parentElement, dataSource);
            });
        }
        else{
            state.usersBooks = [];
            state.library.forEach(bookId => {
                state.usersBooks.push(library.filter(book => book.id === bookId)[0]);
            });
            state.usersBooks.forEach(book => {
                renderBook(book, parentElement, dataSource);
            });
        } 
    }
    else {
        if(swapState.filters.filteredBooks.length > 0){
            swapState.filters.filteredBooks.forEach(book => {
                renderBook(book, parentElement, dataSource);
            });
        }
        else{
            swapState.selectedUsersBooks = [];
            swapState.selectedUser.library.forEach(bookId => {
                swapState.selectedUsersBooks.push(library.filter(book => book.id === bookId)[0]);
            })
            swapState.selectedUsersBooks.forEach(book => {
                renderBook(book, parentElement, dataSource);
            });
        }

    }
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

async function renderUserPage(){
    mainPage.innerText = '';
    const h1 = createElementWithClass('h1', 'page-title');
    h1.innerText = 'Your Library';
    const userLibrary = renderUserLibrary();
    mainPage.append(h1, userLibrary);
    
    const searchBookInput = document.querySelector('#search-in-library');
    const searchBookForm = document.querySelector('.search-bar-container');
    searchBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if(searchBookInput !== ''){
            const searchFilter = identifySearchFilter(searchBookInput.value);
            const filter = searchBookInput.value;
            if(searchFilter === 'string'){
                state.filters.bookSearchedByTitleOrAuthor = filter;
                filterByTitleOrAuthor(filter, 'state', state.usersBooks, renderUserPage);
            }
            else {
                state.filters.bookSearchedByISBN = filter;
                filterByISBN(filter, 'state', state.usersBooks, renderUserPage);
            }
        }
    });

    const addBookInput = document.querySelector('#add-to-library');
    const addBookForm = document.querySelector('.add-book-container');
    addBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const validISBN = isValidISBN(addBookInput.value);
        if(validISBN){
            state.filters.bookSearchedByISBN = addBookInput.value;
            await fetchBook();
            renderUserPage();
            addBookInput.value = '';
        }
    });
}

async function createNewUser(user){
    const res = await fetch(usersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        });
    const newUser = await res.json();
    return newUser;
}

function copyUserData(user){
    setState({id: user.id, library: user.library});
}

async function getUserData(userSource){
    const usersData = await fetchUsers();
    let user;
    if(userSource === 'state'){
        user = usersData.filter(user => user.username === state.username)[0];
        if(user === undefined){
            user = await createNewUser({username: state.username, library: []});
        }
    }
    else{
        user = usersData.filter(user => user.username === swapState.selectedUser.username)[0];
    }
    return user;
}

const getUsernameForm = document.querySelector('.get-username-form');
const getUsernameInput = document.querySelector('#username');
const signInText = document.querySelector('.sign-in-text');

function getUsername(){
    getUsernameForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if(getUsernameInput.value !== ''){
            signInBehaviour = 'Sign Out';
            signInText.innerText = signInBehaviour;
            state.username = getUsernameInput.value;
            getUsernameInput.value = '';
            const user = await getUserData('state');
            copyUserData(user);
            renderUserPage();
        }
    });
}

signInText.innerText = signInBehaviour;
getUsername();