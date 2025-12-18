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
            <button class="modify"><img src="images/rename-icon.png" alt="Trash Icon"></button>
            <button class="check" style="display: none;"><img src="images/check-icon.png" alt="Check Icon"></button>
            <button class="delete"><img src="images/trash-icon.png" alt="Trash Icon"></button>
        </div>
        `;

        // Select elements
        const checkbox = li.querySelector("input");
        const text = li.querySelector(".text");
        const modifyBtn = li.querySelector(".modify");
        const checkBtn = li.querySelector(".check");
        const delBtn = li.querySelector(".delete");

        // Event listeners
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        // Modify todo functionality
        modifyBtn.addEventListener("click", () => {
            text.focus(); // Set focus on the text span
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(text); // Select all text
            selection.removeAllRanges();
            selection.addRange(range);

            // Show the "check" button
            modifyBtn.style.display = "none";
            delBtn.style.display = "none";
            checkBtn.style.display = "inline-block";
        });

        // Confirm modification functionality
        checkBtn.addEventListener("click", () => {
            const newText = text.textContent.trim();
            if (newText && newText !== todo.text) {
                todo.text = newText;
                saveTodos();
            } else if (!newText) {
                text.textContent = todo.text; // Revert to previous text if empty
            }

            // Hide the "check" button and show "modify" button
            checkBtn.style.display = "none";
            delBtn.style.display = "inline-block";
            modifyBtn.style.display = "inline-block";
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

// Add new todo on Enter key press
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        const value = input.value.trim();
        if(!value)
            return;

        todos.push({ text: value, completed: false });
        input.value = "";
        saveTodos();
        renderTodos();
    }
});

// Clear all todos
clearAll.addEventListener("click", () => {
    todos = [];
    saveTodos();
    renderTodos();
});


// Initial render
renderTodos();