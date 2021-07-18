/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
// import css from './style.css';
// import html from './index.html';
// declarations
const form = document.querySelector('#itemForm'); // select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const inform = document.querySelector('.inform');
const clearButton = document.querySelector('#clear-list');

let tasks = [];

const items = document.querySelectorAll('.item-list');

const renderTasks = function () {
  itemList.innerHTML = '';

  tasks.forEach((task) => {
    itemList.insertAdjacentHTML(
      'beforeend',
      `<div class="item my-3">
        <div class="item-icons">
          <a href="#" class="complete-item mx-2 item-icon">
            <i class="far fa-check-square"></i>
          </a>
        </div>
        <h5 class="item-name text-capitalize">${task.description}</h5>       
      </div>`,
    );
  });
};

const removeItem = function (item) {
  // console.log(item);
  const removeIndex = (tasks.indexOf(item));
  // console.log(removeIndex);
  tasks.splice(removeIndex, 1);
  renderTasks();
};

const addTodo = function (itemDescription) {
  items.forEach((item) => {
    if (item.querySelector('.item-name').textContent === itemDescription) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });
      // event listener for for edit
      item.querySelector('.edit-item').addEventListener('click', () => {
        itemInput.value = itemDescription;
        itemList.removeChild(item);

        tasks = tasks.filter((item) => item !== itemDescription);
      });
      // event listener for delete
      item.querySelector('.delete-item').addEventListener('click', () => {
        // itemList.removeChild(item);

        const dataItem = tasks.find((item) => item === itemDescription);
        removeItem(dataItem);
        renderTasks();
        // showinform('item delete', 'success')
      });
    }
  });
};

// get local storage
const getLocalStorage = function () {
  const storedTasksStr = localStorage.getItem('tasks');
  if (storedTasksStr === 'undefined' || storedTasksStr === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(storedTasksStr);
    renderTasks();
  }
};

// set local storage
const setLocalStorage = function () {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// get local storage
getLocalStorage();

// add a list item and to local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemDescription = itemInput.value;

  if (itemDescription === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    tasks.push({
      description: itemDescription,
      completed: false,
      index: tasks.length,
    });
    setLocalStorage();
    renderTasks();
    // add event listeners to icons;
    // addtodo(itemDescription);
  }

  itemInput.value = '';
});

// clear items from the listeners

clearButton.addEventListener('click', () => {
  tasks = [];
  localStorage.clear();
  renderTasks();
});