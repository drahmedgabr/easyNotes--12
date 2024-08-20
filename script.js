const textArea = document.getElementById("newNote");
const notesDiv = document.getElementById("notes");
const zeroNotes = document.getElementById("zeroNotes");
const loginInput = document.getElementById("loginInput");
const signupInput = document.getElementById("signupInput");
const buttonsDiv = document.getElementById("buttonsDiv");
const loginDiv = document.getElementById("loginDiv");
const emailLoginInput = document.getElementById("emailLoginInput");
const passwordLoginInput = document.getElementById("passwordLoginInput");
const emailSignupInput = document.getElementById("emailSignupInput");
const passwordSignupInput = document.getElementById("passwordSignupInput");
const nameInput = document.getElementById("nameInput");
const accountDiv = document.getElementById("accountDiv");
const accountName = document.getElementById("accountName");


var notesArray = [];
var userId = "";




function addNote() {
    const newNote = textArea.value;
    if(newNote == "") {
        alert("Please enter valid note");
    } else {
        textArea.value = "";
        notesArray.push(newNote);
        saveNotes();
    }
}

function saveNotes() {
    const notes = JSON.stringify(notesArray);
    localStorage.setItem("notes", notes);
    getNotesFromStorage();
}

function getNotesFromStorage() {
    const notes = localStorage.getItem("notes");

    if (notes == null) {
        console.log("no notes");
        
    } else {
        notesArray = JSON.parse(notes);

        if (notesArray.length > 0) {

            notesDiv.innerHTML = "";

            for (let index = 0; index < notesArray.length; index++) {
                const element = notesArray[index];
                showNote(element, index);           
            }

            notesDiv.style.display = "block";
            zeroNotes.style.display = "none";

        } else {
            notesDiv.style.display = "none";
            zeroNotes.style.display = "flex";
        }
    }
}

function showNote(noteText, noteIndex) {
    const newDiv = document.createElement("div");
    notesDiv.appendChild(newDiv);

    const noteParagraph = document.createElement("p");
    noteParagraph.innerText = noteText;
    newDiv.appendChild(noteParagraph);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash3";

    deleteIcon.onclick = function(){
        if(confirm("Are you sure to delete note?") == true){
            deleteNote(noteIndex);
        }
    };

    newDiv.appendChild(deleteIcon);
}


function deleteNote(index) {
    notesArray.splice(index, 1);
    saveNotes();
}

function showLoginInput() {
    loginInput.style.display = "block";
    buttonsDiv.style.display = "none";
}

function showSignupInput() {
    signupInput.style.display = "block";
    buttonsDiv.style.display = "none";
}

function showLogin() {

    const userName = localStorage.getItem("userName");
    userId = localStorage.getItem("userId");

    if(userId == null) {
        loginDiv.style.display = "flex";
        zeroNotes.style.display = "none";
        notesDiv.style.display = "none";
    } else {
        accountDiv.style.display = "flex";
        zeroNotes.style.display = "none";
        notesDiv.style.display = "none";
        accountName.innerText = userName;
    }
}


async function login() {
    const apiUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/login?email=${emailLoginInput.value}&password=${passwordLoginInput.value}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    console.log(data);
    

    const status = data.status;

    if(status == true){
        const userName = data.name;
        const userId = data.id;

        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);

        location.reload();

    } else {
        alert("login failed");
    }
    
}

async function uploadNotes() {

    if (notesArray.length == 0) {
        alert("You have no notes to upload");
    } else {
        const apiUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/addnote?id=${userId}&notes=${JSON.stringify(notesArray)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const status = data.status;
        if(status == true){
            alert("Notes uploaded successfully");
        } else {
            alert("Notes upload failed");
        }
    }
}

async function downloadNotes() {
    const apiUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/getnotes?id=${userId}`;

    
    const response = await fetch(apiUrl);
    const data = await response.json();
    const status = data.status;
    if(status == true){
        const notes = data.notes;
        const downloadedNotes = JSON.parse(notes);
        if(downloadedNotes.length > 0){
            notesArray = downloadedNotes;
            saveNotes();
            alert("Notes downloaded successfully");
        } else {
            alert("No notes found online");
        }
    } else {
        alert("Notes download failed");
    }
}


getNotesFromStorage();
