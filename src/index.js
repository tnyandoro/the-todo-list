// import './style.css';

// The array that holds the listed items
let todoItems = [];

function addTodo(item) {
  const todo = {
    item,
    checked: false,
    id: Date.now(),
  };
todoItems.push(todo);
console.log(todoItems);
}

// lets get the form element
const form = document.querySelector('.todo-form');
// Lets add an event listener to submit the form
form.addEventListener('submit', event => {
  // stop the page from refreshing on submit
  event.preventDefault();
  // pick the form input element
  const input = document.querySelector('.todo-input');

  // Lets get the input values
  const item = input.value.trim();
  if(item !== '') {
    addTodo(item);
    input.value = '';
  }
});