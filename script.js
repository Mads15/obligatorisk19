document.addEventListener('DOMContentLoaded', function () {
  const tasksList = document.getElementById('tasks-list');
  const newTaskInput = document.getElementById('new-task');

  // Last inn gjøremål fra localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Funksjon for å oppdatere visningen
  function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.textContent = task.description;
      if (task.completed) {
        taskElement.classList.add('completed');
      }
      taskElement.addEventListener('click', () => toggleCompleted(index));
      tasksList.appendChild(taskElement);
    });
  }

  // Funksjon for å legge til nytt gjøremål
  function addTask() {
    if (newTaskInput.value.trim() !== '') {
      tasks.push({ description: newTaskInput.value.trim(), completed: false });
      newTaskInput.value = '';
      saveTasks();
      renderTasks();
    }
  }

  // Funksjon for å markere gjøremål som ferdig
  function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  // Funksjon for å lagre gjøremål til localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  renderTasks();
  window.addTask = addTask; // Gjør funksjonen tilgjengelig globalt for onclick
});
