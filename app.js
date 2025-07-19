const board = document.getElementById("board");
const form = document.getElementById("taskForm");
const desc = document.getElementById("taskDesc");
const date = document.getElementById("taskDate");
const time = document.getElementById("taskTime");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(fromStorage = false) {
  board.innerHTML = "";
  tasks.forEach(({id, description, dueDate, dueTime}) => {
    const note = document.createElement("div");
    note.className = "note";

    const delBtn = document.createElement("i");
    delBtn.className = "delete-btn bi bi-x-lg";
    delBtn.addEventListener("click", () => deleteTask(id));

    const content = document.createElement("div");
    content.className = "note-content";
    content.textContent = description;

    const footer = document.createElement("div");
    footer.className = "note-footer";
    footer.textContent = `${dueDate} ${dueTime}`;

    note.append(delBtn, content, footer);
    board.appendChild(note);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks(true);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const task = {
    id: Date.now(),
    description: desc.value,
    dueDate: date.value,
    dueTime: time.value
  };
  tasks.push(task);
  saveTasks();
  form.reset();
  renderTasks();
});

// לטעינת משימות קיימות
renderTasks(true);
