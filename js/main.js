
var siteNameInput = document.getElementById('SiteName');
var siteUrlInput = document.getElementById('siteUrl');


var BookMarks = [];

if (localStorage.getItem('BookMarks') != null) {

    BookMarks = JSON.parse(localStorage.getItem('BookMarks'));
    displaybook();
}



function AddBookMark() {

    var ValidationTest = validateUrl();
     
    if (ValidationTest == true) {

        if (EditeButton.innerHTML == ` <i class="fa-solid fa-pencil me-3"></i> EDITE `) {

            var Site = {
                siteName: siteNameInput.value,
                siteUrl: siteUrlInput.value,
            }

            BookMarks.splice(indexOfEditeBook, 1, Site)

            localStorage.setItem('BookMarks', JSON.stringify(BookMarks))

            CleerEle()
            displaybook()

            EditeButton.innerHTML = "  Submit "

        }

        else {

            var Site = {
                siteName: siteNameInput.value,
                siteUrl: siteUrlInput.value,
            }

            BookMarks.push(Site)

            localStorage.setItem('BookMarks', JSON.stringify(BookMarks))

            CleerEle()
            displaybook()

        };

    }

    else {
        alert(ValidationTest)
    }

}




function CleerEle() {

    siteNameInput.value = ""
    siteUrlInput.value = ""
}

function displaybook() {

    displayAllBook = "";

    for (var i = 0; i < BookMarks.length; i++) {

        displayAllBook += `<tr>
        
        <td class="py-3"  ><h5> ${i + 1} </h5></td>
        <td webname > <h6> ${BookMarks[i].siteName} </h6></td>
        <td ><button class="btn btn-success" ><a  target="_blank"  class="text-decoration-none text-white " href="${BookMarks[i].siteUrl}"> <i class="fa-solid fa-eye"></i> Visit</a></button></td>
        <td ><button onclick="editeBookMarks(${i})" class="btn btn-warning text-white " > <i class="fa-solid fa-pencil"></i> Edite </button></td>
        <td ><button onclick="deleteBooks(${i})" class="btn btn-danger text-white " > <i class="fa-solid fa-trash"></i> Delete</button></td>

    </tr>`

    }

    document.getElementById("BookMarks").innerHTML = displayAllBook;
}

function deleteBooks(idx) {

    BookMarks.splice(idx, 1);

    localStorage.setItem('BookMarks', JSON.stringify(BookMarks))

    displaybook()

}

var EditeButton = document.getElementById('Edite')
var indexOfEditeBook;

function editeBookMarks(idx) {

    siteNameInput.value = BookMarks[idx].siteName
    siteUrlInput.value = BookMarks[idx].siteUrl

    EditeButton.innerHTML = ` <i class="fa-solid fa-pencil me-3"></i> EDITE `

    indexOfEditeBook = idx

}

function searchForSite(term) {

    var SearchForSite = ""

    for (var i = 0; i < BookMarks.length; i++) {

        if (BookMarks[i].siteName.toLowerCase().includes(term.toLowerCase())) {

            SearchForSite += `<tr>

            <td class="py-3"  ><h5> ${i + 1} </h5></td>
            <td webname > <h6> ${BookMarks[i].siteName} </h6></td>
            <td ><button class="btn btn-success" ><a target="_blank" class="text-decoration-none text-white" href="${BookMarks[i].siteUrl}" > <i class="fa-solid fa-eye"></i> Visit </a></button></td>
            <td ><button onclick="editeBookMarks(${i})" class="btn btn-warning text-white " > <i class="fa-solid fa-pencil"></i> Edite </button></td>
            <td ><button onclick="deleteBooks(${i})" class="btn btn-danger text-white " > <i class="fa-solid fa-trash"></i> Delete</button></td>

         </tr>`

        }
    }
    document.getElementById("BookMarks").innerHTML = SearchForSite;
}


function validateUrl() {

    var nameRegex = /^([a-z]|[0-9]){3,}$/gim;
    var urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/;

    if (nameRegex.test(siteNameInput.value) == false) {
        return " The name must contain at least three characters";
    }
    else if (urlRegex.test(siteUrlInput.value) == false) {
        return " The Url must be in valid Format";

    }

    return true ; 

}




