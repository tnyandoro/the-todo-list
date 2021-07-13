// Selectors for
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Events Listeners 

todoButton.addEventListener('click',addTodo);

// Functions 

function addTodo(event) {
  // lets prevent a default
  event.preventDefault();
  // Lets create Todo DIV  wi
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create the List 
  const newTodo = document.createElement('li');
  
}