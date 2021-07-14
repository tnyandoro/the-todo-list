/* eslint-disable func-names */
// import css from "./style.css";
// declarations
const form = document.querySelector('#itemForm'); // select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const inform = document.querySelector('.inform');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const items = document.querySelectorAll('.item-list');

const getList = function (todoItems) {
  itemList.innerHTML = '';

  todoItems.forEach((item) => {
    itemList.insertAdjacentHTML('beforeend',
      `<div class="item my-3">
  <h5 class="item-name text-capitalize">${item}</h5>
  <div class="item-icons"><a href="#" class="complete-item mx-2 item-icon">
  <i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon">
  <i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon">
  <i class="far fa-times-circle"></i></a></div></div>`);

    // eslint-disable-next-line no-use-before-define
    addTodo(item);
  });
};

const removeItem = function (item) {
  // console.log(item);
  const removeIndex = (todoItems.indexOf(item));
  // console.log(removeIndex);
  todoItems.splice(removeIndex, 1);
  getList(todoItems);
};

const addTodo = function (itemName) {
  items.forEach((item) => {
    if (item.querySelector('.item-name').textContent === itemName) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });
      // event listener for for edit
      item.querySelector('.edit-item').addEventListener('click', () => {
        itemInput.value = itemName;
        itemList.removeChild(item);

        todoItems = todoItems.filter((item) => item !== itemName);
      });
      // event listener for delete
      item.querySelector('.delete-item').addEventListener('click', () => {
        // itemList.removeChild(item);

        const dataItem = todoItems.find((item) => item === itemName);
        removeItem(dataItem);
        getList(todoItems);
        // showinform('item delete', 'success')
      });
    }
  });
};

// get local storage
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem('todoItems');
  if (todoStorage === 'undefined' || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  }
};

// set local storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

// get local storage
getLocalStorage();

// add a list item and to local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
    // add event listeners to icons;
    // addtodo(itemName);
  }

  itemInput.value = '';
});

// clear items from the listeners

clearButton.addEventListener('click', () => {
  todoItems = [];
  localStorage.clear();
  getList(todoItems);
});