// Selectors for
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Events Listeners 

todoButton.addEventListener('click', addTodo);

// Functions 

function addTodo(event) {
  // lets prevent a default
  event.preventDefault();
  // Lets create Todo DIV 
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");

  // create the List 
  const newTodo = document.createElement('li');
  newTodo.innerText = 'hey';
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // check box or button

  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //check delete button or button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('complete-btn');
  todoDiv.appendChild(trashButton);

  // Append to list
  todoList.appendChild(todoDiv);
}