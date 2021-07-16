/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import css from './style.css';
import html from './index.html';
// declarations
const form = document.querySelector('#itemForm'); // select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const inform = document.querySelector('.inform');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const saveAndRender = function () {
  // save to storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  // clear items HTML
  itemList.innerHTML = '';

  // generate items HTML
  todoItems.forEach((todoItem) => {
    const completed = todoItem.checked ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend',
      ` <div class="item my-3" draggable="true" id="${todoItem.id}">
        <h5 class="item-name text-capitalize ${completed}">${todoItem.text}</h5>
        <div class="item-icons">
          <i class="far fa-check-circle complete-item mx-2 item-icon"></i>
          <i class="far fa-times-circle delete-item item-icon"></i>
        </div>
      </div>`);
  });
};

const completeItem = function (itemId) {
  const todoItem = todoItems.find((tdi) => tdi.id === itemId);
  todoItem.checked = !todoItem.checked;
  saveAndRender();
};

const removeItem = function (itemId) {
  const todoItem = todoItems.find((tdi) => tdi.id === itemId);
  const removeIndex = (todoItems.indexOf(todoItem));
  todoItems.splice(removeIndex, 1);
  saveAndRender();
};

// event handler to add a list item
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // collect input asnd clear textbox
  const itemText = itemInput.value;
  itemInput.value = '';

  // validate
  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  }

  // add to item
  todoItems.push({
    text: itemText,
    checked: false,
    id: new Date().getTime(),
  });

  // update UI
  saveAndRender();
});

// event handler to clear items
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  todoItems = [];
  saveAndRender();
});

// event handler to complete, edit and delete
itemList.addEventListener('click', (e) => {
  e.preventDefault();

  // decide which of our action button were clicked (if any)
  const targetClasses = e.target.classList;
  const getItemId = () => Number(e.target.closest('div.item').id);

  if (targetClasses.contains('complete-item')) {
    completeItem(getItemId());
  } else if (targetClasses.contains('delete-item')) {
    removeItem(getItemId());
  }

  // saveAndRender();
});

// retrieve to items from storage
const storedTodoItems = localStorage.getItem('todoItems') || '[]';
todoItems = JSON.parse(storedTodoItems);
saveAndRender();

// draggable
