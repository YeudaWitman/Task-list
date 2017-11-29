var dateInput = document.getElementById("dateInput");
var dateInputDiv = document.getElementById("dateInputDiv"); //use for warning
var nameInput = document.getElementById("nameInput");
var detailsInput = document.getElementById("textAreaForm");
var saveButton = document.getElementById("saveTaskButton");
var warningDate = document.getElementById("warningDate")
var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
var notesArea = document.getElementById("notesArea");
var uniqueID = 0;

//events:
saveButton.addEventListener("click", newNote);
window.onload = getFromStorage();
//empty variable to be
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
    console.log(n)
    console.log(uniqueID)
    if (validations(n)) {
        addNoteToView(n);
        //resetForm();
        addToArray(n);
        putInStorage();
    }
}

//form validation--DONE
function validations(Note) {
    if (dateformat.test(Note.date)) {
        console.log("INPUT OK");
        dateInputDiv.className = 'form-group';
        saveButton.className = 'btn btn-primary'
        warningDate.style.visibility = 'hidden';
        return true
    } else if (Note.date == "") {
        console.log("Date Empty");
        dateInputDiv.className = 'form-group has-error';
        saveButton.className = 'btn btn-warning'
        warningDate.style.visibility = 'visible';
        return false
    } else {
        console.log("wrong date format");
        dateInputDiv.className = 'form-group has-error';
        saveButton.className = 'btn btn-danger';
        warningDate.style.visibility = 'visible';
        return false
    }
}
//reset form values (use preventDefault) --DONE
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
    //enter new note to beginning:
    //notesArea.insertBefore(noteDiv, notesArea.childNodes[0]);

    //add attributes - 
    deleteBtn.setAttribute("title", "Delete Task")
    noteDiv.setAttribute("id", "uniqueID" + Note.uniqueID)
    //add values
    taskNameLabel.innerHTML = Note.name;
    textAreaTask.innerHTML = Note.details;
    taskDateLabel.innerHTML = Note.date;

    //remove button event
    deleteBtn.addEventListener("click", removeNote);

}


//remove note -- problem!!!!
function removeNote(e) {
    const targetItem = e.target.parentElement.parentElement;
    loopId(targetItem.id) //
    targetItem.style.opacity = "0";
    setTimeout(removeFunc, 1000) //delay removing after the fadeout
    function removeFunc() {
        console.log("NOTE REMOVED")
        targetItem.parentNode.removeChild(targetItem);
    }
    console.log("Fade Out");
    putInStorage()
}
//find uniqueID in the note array and splice
function loopId(targetItemId) {
    console.log("before removing" + notesArray);
    for (var i = 0; i < notesArray.length; i++) {
        if (notesArray[i].uniqueID !== i) {
            notesArray.splice(i, 1)
            console.log("after removing" + notesArray);
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
    console.log("IDs: " + uniqueID);
    viewFromStorage(notesStorage);
}
// print from storage
function viewFromStorage(notesStorage) {
    for (let j = 0; j < notesStorage.length; j++) {
        notesStorage[j];
        addNoteToView(notesStorage[j]);
    }
};
