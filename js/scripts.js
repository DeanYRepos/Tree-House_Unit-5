const div = document.createElement('div');
const formDiv = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let users;
const xButton = document.getElementById('modal-close-btn');
const headerContainer = document.getElementById('header-inner-container');

function fetchData(URL) { //reusable fetch function, parses data to JSON
    return fetch(URL)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('404 there was a problem!', error));
}
fetchData("https://randomuser.me/api/?nat=US&results=12")

    .then(data => {
        generateGallery(data);
        generateModal(data);
         generateForm();
    });

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);

    } else {
        return Promise.reject(new Error(response.statusText));
    }

}

function generateForm() {


    const form = ` <form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;


   formDiv.innerHTML += form;
  
}

function generateGallery(data) { //Generates and displays users to gallery div
    users = data.results;
    users.map(person => {

        const galleryDiv =
            `
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src=${person.picture.large} alt=${person}
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
    </div>
</div>`;
        gallery.innerHTML += galleryDiv;
    });



}

function generateModal(data) {

    users = data.results;
    users.map(person => {
        const modalDiv = `
 <div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${person.picture.large} alt=${person}>
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${person.email}</p>
        <p class="modal-text cap">${person.location.city}</p>
        <hr>
        <p class="modal-text">${person.phone}</p>
        <p class="modal-text">${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
        <p class="modal-text">Birthday ${person.dob.date}</p>
    </div>
</div>
`

    //    gallery.innerHTML = modalDiv;
        // // IMPORTANT: Below is only for exceeds tasks 
        // <div class="modal-btn-container">
        //     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        //     <button type="button" id="modal-next" class="modal-next btn">Next</button>
        // </div>
        // </div>
    });
}

gallery.addEventListener('click', e => {

    gallery.innerHTML +=  generateModal(e.target);

});

// xButton.addEventListener('click', e => {


    
// })