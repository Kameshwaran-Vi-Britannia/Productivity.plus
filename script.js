// 🕒 Clock
function updateClock() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

// 🌙 Theme Toggle
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "🌞";
});

// 💬 Quote
fetch("https://api.quotable.io/random")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quoteText").textContent = `"${data.content}" — ${data.author}`;
  });

// 🌦️ Weather
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  fetch(`https://wttr.in/${city}?format=%C+%t`)
    .then(res => res.text())
    .then(data => document.getElementById("weatherResult").textContent = data)
    .catch(() => document.getElementById("weatherResult").textContent = "Error fetching weather");
});

// ✅ Tasks
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  saved.forEach((t, i) => addTaskToDOM(t, i));
}
function addTaskToDOM(task, i) {
  const li = document.createElement("li");
  li.innerHTML = `${task}<button onclick="removeTask(${i})">✖</button>`;
  taskList.appendChild(li);
}
function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.getElementById("addTask").addEventListener("click", () => {
  const t = taskInput.value.trim();
  if (!t) return;
  const li = document.createElement("li");
  li.innerHTML = `${t}<button>✖</button>`;
  li.querySelector("button").onclick = () => {
    li.remove();
    saveTasks();
  };
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
});
function removeTask(i) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
loadTasks();

// 🗒️ Notes
const noteArea = document.getElementById("noteArea");
const savedNotes = document.getElementById("savedNotes");
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.innerHTML = notes.map(n => `<p>${n}</p>`).join("");
}
document.getElementById("saveNote").addEventListener("click", () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  if (noteArea.value.trim()) {
    notes.push(noteArea.value.trim());
    localStorage.setItem("notes", JSON.stringify(notes));
    noteArea.value = "";
    loadNotes();
  }
});
loadNotes();

// ⏱️ Pomodoro
let timer;
let timeLeft = 25 * 60;
const timerDisplay = document.getElementById("timer");

function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timerDisplay.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
}
document.getElementById("startTimer").addEventListener("click", () => {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Pomodoro complete!");
      timeLeft = 25 * 60;
      updateTimer();
    }
  }, 1000);
});
document.getElementById("resetTimer").addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateTimer();
});
updateTimer();
