

const div = document.createElement('div');
const formDiv = document.getElementsByClassName('search-container');
const gallery = document.getElementById('gallery');
function fetchData(URL){
    return fetch(URL)
    
.then(response => response.json());

}
fetchData("https://randomuser.me/api/?nat=US&results=12")
.then(data => {
generateGallery(data);

});
function generateForm(){

const form = ` <form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
formDiv.innerHTML += form;


}

function generateGallery(data){
     let users = data.results;
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