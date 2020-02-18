const div = document.createElement('div');
const formDiv = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let user = [];
const xButton = document.getElementById('modal-close-btn');

function fetchData(URL) { //reusable fetch function, parses user to JSON
    return fetch(URL)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('404 there was a problem!', error));
}
fetchData("https://randomuser.me/api/?nat=US&results=12")

    .then(user => {
        generateGallery(user);
        eventListener(user);
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

function generateGallery(user) { //Generates and displays user to gallery div
    user = user.results;
    user.map(person => {

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


function generateModal(user) {

    users = user.results;
    const containerDiv = document.createElement('DIV');
    containerDiv.className = 'modal-container';
    let userInfo ="";
   users.map(user => {
      
      let html =  `
 <div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${user.picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.phone}</p>
        <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
        <p class="modal-text">Birthday ${user.dob.date}</p>
    </div>
</div>

`; userInfo += html;

 // // IMPORTANT: Below is only for exceeds tasks 
    // <div class="modal-btn-container">
    //     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    //     <button type="button" id="modal-next" class="modal-next btn">Next</button>
    // </div>
    // </div>

       
    }).join('');
   
    containerDiv.innerHTML += userInfo;
   
    gallery.appendChild(containerDiv);
    
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener('click',  () => {
        containerDiv.remove();
    
    });
    
}


function eventListener(user){
gallery.addEventListener('click', e => {

    if (e.target.className.includes('card')) {
        
        generateModal(user);
       // console.log(generateModal(e.currentTarget));
    }

});

}
