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

function addTask() {
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

const { connectToDB } = require('./dbFunctions'); // Import the function

// Usage of the 'connectToDB' function in another file
async function retrieveNotesFromOtherFile() {
  try {
    const notes = await connectToDB(); // Get 'text' values using 'async/await'
    console.log('Notes retrieved in another file:', notes);
    // Further logic with 'notes'
  } catch (error) {
    console.error(error.message);
  }
}

retrieveNotesFromOtherFile(); // Call the function from another file
