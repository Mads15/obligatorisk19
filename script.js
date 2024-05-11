document.addEventListener('DOMContentLoaded', function() {
  const tasksList = document.getElementById('tasks-list');

  const newTaskInput = document.getElementById('new-task');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
      tasksList.innerHTML = '';
      tasks.forEach((task, index) => {
          const taskElement = document.createElement('li');

          const textSpan = document.createElement('span');
          textSpan.textContent = task.description;
          
          const deleteBtn = document.createElement('button');

          deleteBtn.textContent = 'Slett';
          deleteBtn.onclick = function(event) {
              event.stopPropagation();
              deleteTask(index);
          };

          taskElement.appendChild(textSpan);
          taskElement.appendChild(deleteBtn);

          if (task.completed) {
              taskElement.classList.add('completed');
          }

          taskElement.addEventListener('click', () => toggleCompleted(index));
          tasksList.appendChild(taskElement);
      });
  }

  function addTask() {
      if (newTaskInput.value.trim() !== '') {
          tasks.push({ description: newTaskInput.value.trim(), completed: false });
          newTaskInput.value = '';
          saveTasks();
          renderTasks();
      }
  }

  function toggleCompleted(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
  }

  function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
  }

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  renderTasks();
  window.addTask = addTask;
});
