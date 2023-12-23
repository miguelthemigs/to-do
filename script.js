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

// retrieves data from the database
async function showTasksFromServer() {
  try {
    const response = await fetch('http://localhost:3300/notes');
    if (response.ok) {
      const tasks = await response.json();
      console.log('Tasks retrieved:', tasks);

      const taskList = document.getElementById('list-container'); // Get the task list container element
      taskList.innerHTML = ''; // Clear the list before adding new tasks

      tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        createDeleteButton(listItem); // Create delete button for each task
        createEditButton(listItem); // Create edit button for each task
        taskList.appendChild(listItem); // Append the task to the task list
      });
    } else {
      console.error('Failed to retrieve tasks:', response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error.message);
  }
}


// Example usage of showTasksFromServer function
async function performTaskRetrieval() {
  await showTasksFromServer(); // Call the showTasksFromServer function from api.js
  console.log('Tasks retrieved!');
}

performTaskRetrieval();
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