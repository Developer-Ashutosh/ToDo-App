// Selecting DOM elements
const heroImg = document.querySelector(".heroImg img");
const todoBox = document.querySelector("#todoBox");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector(".list");
const taskLeft = document.querySelector("#taskLeft span");
const viewTask = document.querySelectorAll(".viewTask span");
const clearBtn = document.querySelector("#clearCompleted");

// Function to create a new to-do
const createTodo = () => {
    if (todoBox.value.trim() !== "") {
        // Creating a new task HTML
        let newTodo = `
            <div class="task">
                <div class="checkBox">
                    <img src="./images/icon-check.svg" alt="Check Img">
                </div>
                <p>${todoBox.value}</p>
                <img src="./images/icon-cross.svg" alt="Cross Btn" class="crossBtn">
             </div>`;
        // Adding the new task to the task list
        taskList.innerHTML += newTodo;
        todoBox.value = ""; // Clearing the input box
        toggleCompleted();
        removeTask();
        pendingTasks();
        filterTasks();
        removeCompletedTasks();
    }
};

// Function to toggle completed status
const toggleCompleted = () => {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        task.addEventListener("click", () => {
            task.classList.toggle("completed"); // Toggle completed class
            pendingTasks();
            filterTasks();
        });
    });
};

// Function to remove a task
const removeTask = () => {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        task.querySelector(".crossBtn").addEventListener("click", () => {
            task.remove(); // Remove the task
            pendingTasks();
            filterTasks();
        });
    });
};

// Function to count and display pending tasks
const pendingTasks = () => {
    const tasks = document.querySelectorAll(".task");
    let pending = 0;
    tasks.forEach(task => {
        if (!task.classList.contains("completed")) {
            pending++;
        }
    });
    taskLeft.innerText = pending; // Display pending task count
};

// Function to handle task viewing
const viewingTask = () => {
    viewTask.forEach(task => {
        task.addEventListener("click", () => {
            viewTask.forEach(task => {
                task.classList.remove("viewing");
            });
            task.classList.add("viewing"); // Highlight the selected view option
        });
    });
};

// Function to sort todos/tasks by all/active/complete
const filterTasks = () => {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        document.querySelector("#all").addEventListener("click", () => {
            task.style.display = "flex"; // Show all tasks
        });
        document.querySelector("#active").addEventListener("click", () => {
            task.style.display = task.classList.contains("completed") ? "none" : "flex"; // Show active tasks

        });
        document.querySelector("#completed").addEventListener("click", () => {
            task.style.display = task.classList.contains("completed") ? "flex" : "none"; // Show completed tasks
        });
    });
};

// Function to remove completed tasks
const removeCompletedTasks = () => {
    const tasks = document.querySelectorAll(".task");
    clearBtn.addEventListener("click", () => {
        tasks.forEach(task => {
            if (task.classList.contains("completed")) {
                task.remove(); // Remove completed tasks
                filterTasks();
            }
        });
    });
};

// Initial setup

// Event listener for the "Add" button
addBtn.addEventListener("click", () => { createTodo() });
// Event listener for the Enter key
document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        createTodo();
    };
});
viewingTask();