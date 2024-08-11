const textArea = document.getElementById("newNote");
const notesDiv = document.getElementById("notes");
const zeroNotes = document.getElementById("zeroNotes");


var notesArray = [];

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

getNotesFromStorage();
