const taskName = document.getElementById('task');                // input field for task name
const taskList = document.getElementById('tasks-list');          // ul element for tasks
const addTaskBTN = document.getElementById('add-task');          // add task button
const clearTaskBTN = document.getElementById('clear-tasks');     // clear all tasks from UI and local storage button     
const loadTaskBTN = document.getElementById('load-tasks');       // load all tasks from local storage button


// add task to UI
function addElement(task) {
     return `
     <li>
          <div class="task">
               <p>${task}</p>
               <div class="buttons">
                    <button class="complete btn">✔️</button>
                    <button class="edit btn">✏️</button>
                    <button class="delete btn">❌</button>
               </div>
          </div>
     </li>`;
}

// add task to UI and local storage on click of add task button
function addTask(e) {
     e.preventDefault();
     const task = taskName.value;
     if (task === '') {
          alert('Please enter a task');
          return;
     }
     let addLi = addElement(task);
     taskList.innerHTML += addLi;
     taskName.value = '';
     storeTaskInLocalStorage(task);
}

// Event Listener for delete button
taskList.addEventListener('click', (e) => {
     if (e.target.classList.contains('delete')) {
          const deleteTask = e.target.parentElement.parentElement.parentElement;
          deleteTask.remove();
          const taskValue = deleteTask.querySelector('p').textContent;
          removeTaskFromLocalStorage(taskValue);
     }
});

// Event Listener for complete button
taskList.addEventListener('click', (e) => {
     if (e.target.classList.contains('complete')) {
          const completeTask = e.target.parentElement.parentElement.parentElement;
          completeTask.classList.toggle('completed');
     }
});

// Event Listener for edit button
taskList.addEventListener('click', (e) => {
     if (e.target.classList.contains('edit')) {
          const editTask = e.target.parentElement.parentElement.parentElement;
          const editTaskName = editTask.querySelector('p');
          const editTaskInput = document.createElement('input');
          editTaskInput.type = 'text';
          editTaskInput.value = editTaskName.textContent;
          editTaskInput.classList.add('edit-task');
          editTaskName.replaceWith(editTaskInput);
          editTaskInput.focus();
          editTaskInput.addEventListener('blur', () => {
               const newTaskName = editTaskInput.value;
               const newTask = document.createElement('p');
               newTask.textContent = newTaskName;
               editTaskInput.replaceWith(newTask);
               updateTaskFromLocalStorage(editTaskName.textContent, newTaskName);
          });
     }
});

// store data in local storage
function storeTaskInLocalStorage(task) {
     let tasks;
     if (localStorage.getItem('tasks') === null) {
          tasks = [];
     } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get data from local storage
function getTasks() {
     taskList.innerHTML = '';
     let tasks;
     if (localStorage.getItem('tasks') === null) {
          tasks = [];
     } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach((task) => {
          let addLi = addElement(task);
          taskList.innerHTML += addLi;
     });
}

function removeTaskFromLocalStorage(taskValue) {
     if (localStorage.getItem('tasks') !== null) {
          let tasks = JSON.parse(localStorage.getItem('tasks'));
          tasks.forEach((task, index) => {
               if (taskValue === task) {
                    tasks.splice(index, 1);
               }
          });
          localStorage.setItem('tasks', JSON.stringify(tasks));
     }
}

// update one task from local storage
function updateTaskFromLocalStorage(oldTask, newTask) {
     let tasks = JSON.parse(localStorage.getItem('tasks'));
     // update old task with new task in local storage
     tasks.forEach((task, index) => {
          if (oldTask === task) {
               tasks[index] = newTask;
               localStorage.setItem('tasks', JSON.stringify(tasks));
          }
     });
}


// clear all tasks from local storage
function clearTasksFromLocalStorageAndUI() {
     localStorage.clear();
     taskList.innerHTML = '';
}


addTaskBTN.addEventListener('click', addTask);
loadTaskBTN.addEventListener('click', getTasks);
clearTaskBTN.addEventListener('click', clearTasksFromLocalStorageAndUI);

