const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const clearAll = document.getElementById('clearAll');

// Load todos from localStorage or initialize an empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render the todo list
function renderTodos() {
    list.innerHTML = "";

    // Render in reverse order to show the latest on top
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.draggable = true;
        if (todo.completed) li.classList.add("completed");

        // Todo item structure
        li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span class="text" contenteditable="true">${todo.text}</span>
        <div class="actions">
            <button class="delete"><img src="images/trash-icon.png" alt="Trash Icon"></button>
        </div>
        `;

        const checkbox = li.querySelector("input");
        const text = li.querySelector(".text");
        const delBtn = li.querySelector(".delete");

        // Event listeners
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        // Edit text functionality
        text.addEventListener("blur", () => {
            const newText = text.textContent.trim();
            if (newText) {
                todo.text = newText;
                saveTodos();
            } else {
                text.textContent = todo.text; // Revine la textul anterior dacă este gol
            }
        });

        // Delete todo functionality
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        // Drag and Drop functionality
        li.addEventListener("dragstart", () => {
            li.classList.add("dragging");
            li.dataset.index = index;
        });

        // Remove dragging class on drag end
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
        });

        // Insert at the top the new element
        list.insertBefore(li, list.firstChild);
    });
}

// Drag and Drop event listeners for the list
list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = [...list.children].find(
        el => e.clientY < el.offsetTop + el.offsetHeight / 2
    );

    if (afterElement == null) {
        list.appendChild(dragging);
    } else {
        list.insertBefore(dragging, afterElement);
    }
});

// Update todos array on drop
list.addEventListener("drop", () => {
    const newTodos = [];
    [...list.children].forEach(li => {
        const text = li.querySelector(".text").textContent;
        const completed = li.classList.contains("completed");
        newTodos.push({ text, completed });
    });
    todos = newTodos;
    saveTodos();
});

// Add new todo
addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) 
        return;

    todos.push({ text: value, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
});

// Clear all todos
clearAll.addEventListener("click", () => {
    todos = [];
    saveTodos();
    renderTodos();
});


// Initial render
renderTodos();