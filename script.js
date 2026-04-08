const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// renderowanie zadań
function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // klik = oznacz jako zrobione
        li.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        // przycisk usuwania
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// dodawanie zadania
function addTask() {
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

// zapis do localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);

// enter też dodaje zadanie
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// start
renderTasks();
