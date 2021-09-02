// initialize all the id from the index file 
const searchField = document.getElementById('search-field');

// search field click function 
const searchBook = document.getElementById('search-btn').addEventListener('click', function () {
    const getFieldText = searchField.value;
    searchField.value = '';
    getApiData(getFieldText);
});

const showItems = document.getElementById("show-items");
const countSearchResult = document.getElementById("count-result");


// fetch all the data items from api 
const getApiData = (searchText) => {
    // error checking 
    if (searchText === '') {
        countSearchResult.innerHTML = '';
        showItems.innerHTML = `
        <h3 class="text-center p-3 bg-danger text-light">Enter some text</h3>
        `;

    } else {
        // fetch data by the value of search field
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => showSearchData(data.docs, searchText, data.numFound));

    }

}


//  Display Search Data 

const showSearchData = (books, searchText, numFound) => {
    let count = 0;
    showItems.innerHTML = "";

    // implement 
    books.forEach((element) => {
        count++;
        const newDiv = document.createElement("div");
        newDiv.classList.add("col");
        const imgId = element.cover_i;


        // ======== inside Html design =====;
        newDiv.innerHTML = `
            <div class="card mx-auto" style="width: 18rem; height:40rem;">
                <img  src="https://covers.openlibrary.org/b/id/${imgId}-M.jpg" class="img-fluid" alt="books-image">  
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> <span class="fw-bold">Author:</span> ${element.author_name}</p>
                    <p class="card-text"> <span class="fw-bold">Publisher:</span> ${element.publisher}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a> 
                </div>
                <div class="card-footer">
                     <small class="text-muted">First Published: ${element.first_publish_year}</small>
                </div>
            </div>
        
        `;
        showItems.appendChild(newDiv);
    });

    // no result found error message
    if (count === 0) {
        countSearchResult.innerHTML = `<h5 class=" text-center bg-success p-3">No result found</h5>`;
    }
    //  search result count message
    else {
        countSearchResult.innerHTML = `
        <h5 class=" text-center bg-warning p-3"> Total: ${numFound} result found</h5>
        <h5 class="text-success">
        ${searchText}'s  displaying ${count} result</h5>`;
    }
}