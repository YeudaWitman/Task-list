var dateInput = document.getElementById("dateInput");
var dateInputDiv = document.getElementById("dateInputDiv"); //use for warning
var nameInput = document.getElementById("nameInput");
var detailsInput = document.getElementById("textAreaForm");
var saveButton = document.getElementById("saveTaskButton");
var warningDate = document.getElementById("warningDate")
var dateformat = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
var notesArea = document.getElementById("notesArea");
var uniqueID = 0;

//events:
saveButton.addEventListener("click", newNote);
window.onload = getFromStorage();
//empty variable to be array after loading from storage
var notesArray;

//function constructor
function Note(date, name, details, uniqueID) {
    this.date = date;
    this.name = name;
    this.details = details;
    this.uniqueID = uniqueID;
}

//create new object
function newNote(e) {
    e.preventDefault();
    var n = new Note(dateInput.value, nameInput.value, detailsInput.value, uniqueID++);
    if (validations(n)) {
        addNoteToView(n);
        resetForm();
        addToArray(n);
        putInStorage();
    }
}

//form validation--DONE
function validations(Note) {
    if (dateformat.test(Note.date)) {
        dateInputDiv.className = 'form-group';
        saveButton.className = 'btn btn-primary'
        warningDate.style.visibility = 'hidden';
        return true
    } else if (Note.date == "") {
        dateInputDiv.className = 'form-group has-error';
        saveButton.className = 'btn btn-danger'
        warningDate.style.visibility = 'visible';
        return false
    } else {
        dateInputDiv.className = 'form-group has-error';
        saveButton.className = 'btn btn-danger';
        warningDate.style.visibility = 'visible';
        return false
    }
}
//reset form values
function resetForm() {
    dateInput.value = "";
    nameInput.value = "";
    detailsInput.value = "";
}

function addNoteToView(Note) {

    //create elements
    var noteDiv = document.createElement('div');
    const taskNameLabel = document.createElement('div');
    const buttonsDiv = document.createElement('div');
    //const editBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');
    const textAreaTask = document.createElement('div'); //task detail
    const taskDateLabel = document.createElement('span'); //taskDateLabel

    //appending
    noteDiv.appendChild(buttonsDiv);
    //buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);
    noteDiv.appendChild(taskNameLabel);
    noteDiv.appendChild(textAreaTask);
    noteDiv.appendChild(taskDateLabel);
    notesArea.appendChild(noteDiv);

    //add class names
    noteDiv.className += "note col-xs-6";
    buttonsDiv.className += "buttonsContainer";
    //editBtn.className += "glyphicon glyphicon-edit";
    deleteBtn.className += "glyphicon glyphicon-remove-sign";
    taskNameLabel.className += "taskNameLabel";
    textAreaTask.className += "textAreaTask";
    taskDateLabel.className += "taskDateLabel";
    //option: enter new note to beginning of list:
    //notesArea.insertBefore(noteDiv, notesArea.childNodes[0]);

    //add attributes
    setTimeout(fadeInFX, 1, noteDiv) //delay fadein after the adding note
    //Passing parm is not supported in IE9 and earlier!
    deleteBtn.setAttribute("title", "Delete Task")
    noteDiv.setAttribute("id", Note.uniqueID)
    //add values
    taskNameLabel.innerHTML = Note.name;
    textAreaTask.innerHTML = Note.details;
    taskDateLabel.innerHTML = Note.date;

    //remove button event
    deleteBtn.addEventListener("click", removeNote);
}

function fadeInFX(noteDiv) {
    noteDiv.style.opacity = "1";
}

//remove note
function removeNote(e) {
    const targetItem = e.target.parentElement.parentElement;
    loopId(targetItem.id) //
    targetItem.style.opacity = "0";
    targetItem.className = "note col-xs-6";
    setTimeout(removeFunc, 500, targetItem) //delay removing after the fadeout
    putInStorage()
}

function removeFunc(targetItem) {
    targetItem.parentNode.removeChild(targetItem);
}
//find uniqueID in the note array and splice
function loopId(targetItemId) {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].uniqueID == targetItemId) {
            notesArray.splice(i, 1)
            break;
        }
    }
}

//problem here!!!! n is undefined -solved-
function addToArray(n) {
    if (!notesArray) {
        notesArray = [];
    }
    notesArray.push(n);
}

// add to local storage
function putInStorage() {
    localStorage.setItem("notes", JSON.stringify(notesArray))
    localStorage.setItem("ids", JSON.stringify(uniqueID))
}
// get from local storage
function getFromStorage() {
    //check if localstorage empty
    if (localStorage.getItem("notes") === null) {
        return false;
    }
    var notesStorage = JSON.parse(localStorage.getItem("notes"));
    var IDs = JSON.parse(localStorage.getItem("ids"));
    uniqueID = IDs;
    notesArray = notesStorage;
    viewFromStorage(notesStorage);
}
// add to view from storage
function viewFromStorage(notesStorage) {
    for (let j = 0; j < notesStorage.length; j++) {
        notesStorage[j];
        addNoteToView(notesStorage[j]);
    }
};
