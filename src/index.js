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
  renderTodo(todo);
}

function toggleDone(key) {
  // lets find Index is an array method that will return the position of an array item in the array
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Lets locate the todo item in the todoitems array and set its checked property to the opposite of
  // meaning true will bcome false and rVksvsnNCdJ
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);

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
  if (item !== '') {
    addTodo(item);
    input.value = '';
  }
});

function renderTodo(todo) {
  // Lets get 1st element with a class of lodo
  const list = document.querySelector('.todo-list')

  // Using the ternary operator to if 'todo.checked' is
  // then assign done else empty
  const isChecked = todo.checked ? 'done' : '';
  // Create an `li` element and assign it to `node`
  const node = document.createElement("li");
  // Set the class attribute
  node.setAttribute('class', `todo-item ${isChecked}`);
  // Set the data-key attribute to the id of the todo
  node.setAttribute('data-key', todo.id);
  // Set the contents of the `li` element created above
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox" form-check-input/>
    <label for="${todo.id}" class="tick form-check-labe"></label>
    <span>${todo.text}</span>
    <button class="button ">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  // Lets Append the element to the Dom of the last child to the element by the list variable 
  list.append(node);
}
const list = document.querySelector('.todo-list');
// Adding a click event listener to the list and its children will
list.addEventListener('click', event => {
  if (event.target.classList.contains('tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
})