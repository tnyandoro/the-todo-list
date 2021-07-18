/* eslint-disable no-unused-vars */

/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
import css from './style.css';
import html from './index.html'; // declarations

var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var tasks = [];
var items = document.querySelectorAll('.item-list');

var renderTasks = function renderTasks() {
  itemList.innerHTML = '';
  tasks.forEach(function (task) {
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\">\n        <div class=\"item-icons\">\n          <a href=\"#\" class=\"complete-item mx-2 item-icon\">\n            <i class=\"far fa-check-square\"></i>\n          </a>\n        </div>\n        <h5 class=\"item-name text-capitalize\">".concat(task.description, "</h5>       \n      </div>"));
  });
};

var removeItem = function removeItem(item) {
  // console.log(item);
  var removeIndex = tasks.indexOf(item); // console.log(removeIndex);

  tasks.splice(removeIndex, 1);
  renderTasks();
};

var addTodo = function addTodo(itemDescription) {
  items.forEach(function (item) {
    if (item.querySelector('.item-name').textContent === itemDescription) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      }); // event listener for for edit

      item.querySelector('.edit-item').addEventListener('click', function () {
        itemInput.value = itemDescription;
        itemList.removeChild(item);
        tasks = tasks.filter(function (item) {
          return item !== itemDescription;
        });
      }); // event listener for delete

      item.querySelector('.delete-item').addEventListener('click', function () {
        // itemList.removeChild(item);
        var dataItem = tasks.find(function (item) {
          return item === itemDescription;
        });
        removeItem(dataItem);
        renderTasks(); // showinform('item delete', 'success')
      });
    }
  });
}; // get local storage


var getLocalStorage = function getLocalStorage() {
  var storedTasksStr = localStorage.getItem('tasks');

  if (storedTasksStr === 'undefined' || storedTasksStr === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(storedTasksStr);
    renderTasks();
  }
}; // set local storage


var setLocalStorage = function setLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}; // get local storage


getLocalStorage(); // add a list item and to local storage

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var itemDescription = itemInput.value;

  if (itemDescription === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    tasks.push({
      description: itemDescription,
      completed: false,
      index: tasks.length
    });
    setLocalStorage();
    renderTasks(); // add event listeners to icons;
    // addtodo(itemDescription);
  }

  itemInput.value = '';
}); // clear items from the listeners

clearButton.addEventListener('click', function () {
  tasks = [];
  localStorage.clear();
  renderTasks();
});