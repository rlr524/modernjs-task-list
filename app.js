// define the ui variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// call load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter task events
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement("li");
    // add a class to the li element
    li.className = "collection-item";
    // create a text node and append it to the li passing in the value from the task input
    li.appendChild(document.createTextNode(task));
    // create a new link element for the delete icon
    const deleteLink = document.createElement("a");
    // add class to the delete icon
    deleteLink.className = "delete-item secondary-content";
    // add icon html and append the link to the li; use custom css to render a pointer on hover
    deleteLink.innerHTML =
      '<i class="material-icons custom_pointer">remove_circle_outline</i>';
    li.appendChild(deleteLink);
    // append the li to the ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("You need to add a task");
  }

  // create li element
  const li = document.createElement("li");
  // add a class to the li element
  li.className = "collection-item";
  // create a text node and append it to the li passing in the value from the task input
  li.appendChild(document.createTextNode(taskInput.value));
  // create a new link element for the delete icon
  const deleteLink = document.createElement("a");
  // add a class to the delete link
  deleteLink.className = "delete-item secondary-content";
  // add icon html and append the link to the li; use custom css to render a pointer on hover
  deleteLink.innerHTML =
    '<i class="material-icons custom_pointer">remove_circle_outline</i>';
  li.appendChild(deleteLink);
  // append the li to the ul
  taskList.appendChild(li);
  // store task in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear the input
  taskInput.value = "";
  // we need to prevent default, which is a reload of the page, because this is the function being called on submit of the add task form
  e.preventDefault();
}

// store in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    const taskArr = Array.from(taskList.children);
    const index = taskArr.indexOf(e.target.parentElement.parentElement);
    if (confirm("Are you sure you wish to delete this task?")) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(index);
    }
  }
}

// remove task from local storage on delete
function removeTaskFromLocalStorage(index) {
  let tasks;
  // we need to reference our getItem as a string because local storage stores everything in strings
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  if (confirm("Are you sure you wish to delete all tasks?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearTasksFromLocalStorage();
}

// clear all from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
