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

function renderTodo(todo) {
  // Lets get 1st element with a class of lodo
  const list = document.querySelector('.todos-list')

  // Using the ternary operator to if 'todo.checked' is
  // then assign done else empty
const isChecked = todo.checked ? 'done': '';
// Lets create an 'li' element and assigned it to the'node' 
const node = document.createElement('li')
// setting the class attribute to 'todo
node.setAttribute('class', `todo-item ${isChecked}`);
// Lets set the data-key attribute to the id of the todo 
node.setAttribute('data-key', todo.id);
// Set the contents of the `li` element we have created above
node.innerHTML = `
<input id="${todo.id}" type="checkbox"/>
<label for="${todo.id}" class="tick do-tick"></label>
<span>${todo.item}</span>
<button class="delete-todo btn-danger">
<svg><use href="#delete-icon"></use></svg>
</button>`;
// Lets Append the element to the Dom of the last child to the element by the list variable 
list.append(node);
}