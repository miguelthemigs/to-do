const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function createDeleteButton(parentElement) {
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  parentElement.appendChild(span);
  span.addEventListener("click", function () {
    const taskText = parentElement.textContent.trim(); // Get the text content of the task
    parentElement.remove();
    deleteTaskFromServer(taskText); // Call the function to delete the task from the server
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
  const inputBox = document.getElementById('input-box');
  const taskText = inputBox.value.trim();

  if (taskText === '') {
    alert('You must write a task');
  } else {
    let li = document.createElement('li');
    li.textContent = taskText; // Set the text content of the <li> element
    listContainer.appendChild(li);
    createDeleteButton(li);
    createEditButton(li);
    inputBox.value = '';
    addTaskToServer(taskText); // Send task text to the server (POST)
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

// retrieves data from the database (GET)
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

async function addTaskToServer(taskText) {
  try {
    const taskData = { text: taskText }; // Create JSON object with 'text' key
    const response = await fetch('http://localhost:3300/notes', {
      method: 'POST',
      headers: { // it informs the server that the payload is in JSON format.
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData) // Send task data in JSON format with 'text' key
    });

    if (response.ok) {
      console.log('Task added successfully');
      await showTasksFromServer(); // Refresh the task list after adding a new task
    } else {
      console.error('Failed to add task:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
}

// Function to delete a task from the server
async function deleteTaskFromServer(taskText) {
  try {
    // Remove the last two characters to extract the text
    const textToUse = taskText.slice(0, -2); // to remove the icons

    if (!textToUse) {
      console.error('Failed to extract text from:', taskText);
      return;
    }

    const taskData = { text: textToUse }; // Create a JSON object with the extracted text

    const response = await fetch('http://localhost:3300/notes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData) // Send task text in JSON format for deletion
    });

    if (response.ok) {
      console.log('Task deletion was successful');
      await showTasksFromServer(); // Refresh the task list after deletion
    } else {
      console.error('Failed to delete task:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
}



