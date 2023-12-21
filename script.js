const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function createDeleteButton(parentElement) {
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  parentElement.appendChild(span);
  span.addEventListener("click", function () {
    parentElement.remove();
    saveData();
  });
}

function createEditButton(parentElement) {
  let edit = document.createElement("edit");
  edit.innerHTML = "\u270e";
  parentElement.appendChild(edit);
  edit.addEventListener("click", function () {
    const newText = prompt("Edit your task", parentElement.firstChild.textContent);
    if (newText !== null && newText !== '') {
      parentElement.firstChild.textContent = newText;
      saveData();
    }
  });
}

function addTask() { // is used in the HTML
  if (inputBox.value === '') {
    alert("You must write a task");
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    createDeleteButton(li);
    createEditButton(li);
    inputBox.value = '';
    saveData();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle("checked");
    console.log("foi");
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() { // it gets all tasks from localstorage
  listContainer.innerHTML = localStorage.getItem("data");
  const tasks = listContainer.querySelectorAll('li');
  tasks.forEach(task => {
    createDeleteButton(task);
    createEditButton(task);
  });
}

showTask();
/*
let notes = [];

handleDatabase(notes);
// Function to create LI elements from notes and add them to the list
function addNotesToUI(notes) {
  const listContainer = document.getElementById('list-container');

  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    listContainer.appendChild(li);
  });
}

// Handle the database to retrieve notes and render them to the UI
async function retrieveAndDisplayNotes() {
  try {
    let notes = [];
    await handleDatabase(notes); // Retrieve notes from the database
    console.log('Retrieved notes:', notes);
    await addNotesToUI(notes); // Add notes to the UI
  } catch (error) {
    console.error('Error:', error.message);
  }
}

retrieveAndDisplayNotes(); // Call the function to retrieve and display notes

*/