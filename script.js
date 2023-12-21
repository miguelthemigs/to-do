const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask(){
  if(inputBox.value === ''){ // if nothing was written
    alert("You must write a task");
  }
  else{
    let li = document.createElement('li'); // create a HTML element with the tag name li
    li.innerHTML = inputBox.value; // add the text (inner HTML == text), that will be what was written
    listContainer.appendChild(li); // append the li in the list container
   let span = document.createElement("span");
   span.innerHTML = "\u00d7"; // cross icon, the icon for deletion
   li.appendChild(span); // we append span on the task, that is li
  }
  inputBox.value = ''; // clear the content of the inputbox
  saveData();
}

listContainer.addEventListener("click", function(e){ // e is an event object
  if(e.target.tagName === 'LI'){ // if we have clicked on LI (on the task)
    e.target.classList.toggle("checked"); // toggle to the checked class name in CSS
    saveData();
  }
  else if (e.target.tagName === 'SPAN'){ // if we have clicked on a SPAN (the cross to delete)
    e.target.parentElement.remove(); // we remove the parent element, wich is the LI
    saveData();
  }
});

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML); // responsible for storing the content into the browser's localStorage
} // setItem() method allows you to set a key-value pair in the local storage.

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data"); // retrieves the data from the browser
}

showTask();