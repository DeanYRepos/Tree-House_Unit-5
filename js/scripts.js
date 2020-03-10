const formDiv = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let cards = document.querySelectorAll('.card');
const containerDiv = document.createElement('DIV');
const next = document.getElementById("modal-next");
const prev = document.getElementById("modal-prev");
const modalCounter = 0;
const buttonContainer = document.getElementsByClassName("modal-btn-container");
    
function fetchData(URL) { //reusable fetch function, parses user to JSON
    return fetch(URL)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('404 there was a problem!', error));
}
fetchData("https://randomuser.me/api/?nat=US&results=12") //fetch data function, fetches 12 users iteratates users in callback function
    // calls functions to generate gallery, form and, event handler
    .then(user => {
        generateGallery(user.results);
        eventListener(user.results);

        generateForm();
    });

function checkStatus(response) { //function checks status of promise and returns response
    if (response.ok) {
        return Promise.resolve(response);

    } else {
        return Promise.reject(new Error(response.statusText));
    }

}

function generateForm() { // function generates form for search bar

    const form = ` <form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

    formDiv.innerHTML += form;

}

function generateGallery(user) { //Generates and displays users to gallery div

    const galleryDiv = user.map(person => {
        return `
<div class="card" >
    <div class="card-img-container">
        <img class="card-img" src=${person.picture.large} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
    </div>
</div>`;

    });
    gallery.innerHTML += galleryDiv.join('');

}

function generateModal(user, i) { //generates and displays user modal to created div element
    const originalDOB = new Date(user[i].dob.date);
    const formattedDOB = originalDOB.toLocaleDateString(); //reformatted birth date
    
    let html = `
 <div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${user[i].picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${user[i].name.first} ${user[i].name.last}</h3>
        <p class="modal-text">${user[i].email}</p>
        <p class="modal-text cap">${user[i].location.city}</p>
        <hr>
        <p class="modal-text">${user[i].phone}</p>
        <p class="modal-text">${user[i].location.street.number} ${user[i].location.street.name}, ${user[i].location.city}, ${user[i].location.state} ${user[i].location.postcode}</p>
        <p class="modal-text">Birthday ${formattedDOB}</p>
    </div>
</div>
<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>


`;

    containerDiv.innerHTML = html;

    body.appendChild( containerDiv);
           for(let j = 0; j < buttonContainer.length; j++ ){
          
                buttonContainer[j].addEventListener('click', e => {
                console.log('clicked');
                if (e.target.id === "modal-next") {
                    console.log('if');
                    generateModal(user, i + 1);
                    closeModal();
                    console.log(i + 1);
                } else if (e.target.id === "modal-prev") {
                    console.log(e.target);
                    generateModal(user, i - 1);
                    closeModal();
                }
                
            })
        }
        
}
    
function eventListener(user) { //function iterates through users cards, when clicked modal function is called and appends modal to body
    //close modal function called to close modal when X button is clicked
    
    
    let cards = document.querySelectorAll('.card');
   console.log(buttonContainer);
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
           
            generateModal(user, i);
           
        //     for(let j = 0; j < buttonContainer.length; j++ ){
          
        //         buttonContainer[j].addEventListener('click', e => {
        //         console.log('clicked');
        //         if (e.target.id === "modal-next") {
        //             console.log('if');
        //             generateModal(user, i + 1);
        //             closeModal();
        //             console.log(i + 1);
        //         } else if (e.target.id === "modal-prev") {
        //             console.log(e.target);
        //             generateModal(user, i - 1);
        //             closeModal();
        //         }
                
        //     })
        // }
            // nextPrevModal(user, i);
            closeModal();


        })

    }

}

function closeModal() { //function when called will close modal when X button is clicked
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener('click', () => {
        containerDiv.remove();

    })
}

// function nextPrevModal(user, i) {
// //     const galleyChild = gallery.children;
// // next.addEventListener("click", () => {
// // modalCounter = (modalCounter += 1) % user.length;
// // console.log(modalCounter);
// // containerDiv = [...user].map((i)=> i)[modalCounter];
// // //galleyChild


// // })











//     const buttonContainer = document.querySelector(".modal-btn-container");
//     buttonContainer.addEventListener('click', e => {

//         if (e.target.id === "modal-next") {
//             console.log('if');
//             generateModal(user, i + 1);

//             console.log(i + 1);
//         } else if (e.target.id === "prev-modal"){
//             console.log(e.target);
//             generateModal(user, i - 1);
//         closeModal();
//     }
//     })

// }