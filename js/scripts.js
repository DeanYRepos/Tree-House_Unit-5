

const div = document.createElement('div');
const formDiv = document.getElementsByClassName('search-container');
div.className = 'card';
function fetch(URL){
fetch( "https://randomuser.me/api/?nat=US&results=12")
.then(response => response.json())
.then(data => generateForm(data));
}

function generateForm(data){

const form = ` <form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
formDiv.innerHTML = form;


}
