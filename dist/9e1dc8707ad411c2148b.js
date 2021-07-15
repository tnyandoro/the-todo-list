/* eslint-disable func-names */
import css from "./style.css";
import html from './index.html'; // declarations

var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var todoItems = [];
var items = document.querySelectorAll('.item-list');

var getList = function getList(todoItems) {
  itemList.innerHTML = '';
  todoItems.forEach(function (item) {
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\">\n  <h5 class=\"item-name text-capitalize\">".concat(item, "</h5>\n  <div class=\"item-icons\"><a href=\"#\" class=\"complete-item mx-2 item-icon\">\n  <i class=\"far fa-check-circle\"></i></a><a href=\"#\" class=\"edit-item mx-2 item-icon\">\n  <i class=\"far fa-edit\"></i></a><a href=\"#\" class=\"delete-item item-icon\">\n  <i class=\"far fa-times-circle\"></i></a></div></div>")); // eslint-disable-next-line no-use-before-define

    addTodo(item);
  });
};

var removeItem = function removeItem(item) {
  // console.log(item);
  var removeIndex = todoItems.indexOf(item); // console.log(removeIndex);

  todoItems.splice(removeIndex, 1);
  getList(todoItems);
};

var addTodo = function addTodo(itemName) {
  todoItems.push({
    text: itemName,
    checked: false,
    id: Date.now()
  });
  items.forEach(function (item) {
    if (item.querySelector('.item-name').textContent === itemName) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      }); // event listener for for edit

      item.querySelector('.edit-item').addEventListener('click', function () {
        itemInput.value = itemName;
        itemList.removeChild(item);
        todoItems = todoItems.filter(function (item) {
          return item !== itemName;
        });
      }); // event listener for delete

      item.querySelector('.delete-item').addEventListener('click', function () {
        // itemList.removeChild(item);
        var dataItem = todoItems.find(function (item) {
          return item === itemName;
        });
        removeItem(dataItem);
        getList(todoItems); // showinform('item delete', 'success')
      });
    }
  });
}; // get local storage


var getLocalStorage = function getLocalStorage() {
  var todoStorage = localStorage.getItem('todoItems');

  if (todoStorage === 'undefined' || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  }
}; // set local storage


var setLocalStorage = function setLocalStorage(todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}; // get local storage


getLocalStorage(); // add a list item and to local storage

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var itemName = itemInput.value;

  if (itemName === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems); // add event listeners to icons;
    // addtodo(itemName);
  }

  itemInput.value = '';
}); // clear items from the listeners

clearButton.addEventListener('click', function () {
  todoItems = [];
  localStorage.clear();
  getList(todoItems);
});