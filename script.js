// Todo application state
let list = [];
let isLoaded = false;

// DOM elements
const inputElement = document.getElementById("ip");
const addBtn = document.getElementById("addBtn");
const taskCount = document.getElementById("taskCount");
const todoListElement = document.getElementById("todoList");

// Load data from localStorage when page loads
function loadFromStorage() {
  const storedList = localStorage.getItem("TODO_LIST");
  if (storedList) {
    list = JSON.parse(storedList);
  }
  isLoaded = true;
  updateDisplay();
}

// Save to localStorage
function saveToStorage() {
  if (isLoaded) {
    localStorage.setItem("TODO_LIST", JSON.stringify(list));
  }
}

// Add item to the list
function addItem(item) {
  if (item.trim() !== "") {
    const newItem = {
      id: Date.now(), // Use timestamp for unique ID
      todo: item.trim(),
      check: false,
    };
    list.push(newItem);
    saveToStorage();
    updateDisplay();
  }
}

// Add item from input field
function addItemFromInput() {
  if (inputElement && inputElement.value.trim() !== "") {
    addItem(inputElement.value);
    inputElement.value = "";
  }
}

// Handle keyboard events
function handleKey(e) {
  if (e.key === "Enter") {
    addItem(e.target.value);
    e.target.value = "";
  }
}

// Delete item by id
function delItem(id) {
  list = list.filter((item) => item.id !== id);
  saveToStorage();
  updateDisplay();
}

// Toggle checkbox status
function toggleCheck(index) {
  list[index].check = !list[index].check;
  saveToStorage();
  updateDisplay();
}

// Update the display
function updateDisplay() {
  // Update task count
  if (list.length > 0) {
    taskCount.textContent =
      list.length + (list.length === 1 ? " task:" : " tasks:");
  } else {
    taskCount.textContent = "No task left!";
  }

  // Clear and rebuild the todo list
  todoListElement.innerHTML = "";

  list.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "todoList";

    li.innerHTML = `
            <input
                class="checkStatus"
                type="checkbox"
                ${item.check ? "checked" : ""}
            />
            <span class="${item.check ? "strike" : ""}">${item.todo}</span>
            <button class="todoDelBtn">Delete</button>
        `;

    // Add event listeners
    const checkbox = li.querySelector(".checkStatus");
    const span = li.querySelector("span");
    const deleteBtn = li.querySelector(".todoDelBtn");

    checkbox.addEventListener("change", () => toggleCheck(index));
    span.addEventListener("click", () => toggleCheck(index));
    deleteBtn.addEventListener("click", () => delItem(item.id));

    todoListElement.appendChild(li);
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", loadFromStorage);
addBtn.addEventListener("click", addItemFromInput);
inputElement.addEventListener("keydown", handleKey);
