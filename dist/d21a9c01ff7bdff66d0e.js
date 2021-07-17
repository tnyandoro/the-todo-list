/* eslint-disable no-unused-vars */

/* eslint-disable func-names */
import { css } from './style.css';
import { html } from './index.html'; // declarations and

var currentEditItem = null;
var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var submitButton = document.querySelector('#submitButton'); //-----------------------------------------------------------------------------------

var todoItems = [];

var storeItems = function storeItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

var loadItems = function loadItems() {
  todoItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
};

var getItem = function getItem(itemId) {
  var todoItem = todoItems.find(function (tdi) {
    return tdi.id === itemId;
  });
  return todoItem;
};

var addItem = function addItem(itemText) {
  var time = new Date().getTime();
  todoItems.push({
    id: "".concat(time),
    text: itemText,
    completed: false
  });
  storeItems();
};

var completeItem = function completeItem(itemId) {
  var todoItem = getItem(itemId);
  todoItem.completed = !todoItem.completed;
  storeItems();
};

var removeItem = function removeItem(itemId) {
  var todoItem = getItem(itemId);
  var removeIndex = todoItems.indexOf(todoItem);
  todoItems.splice(removeIndex, 1);
  storeItems();
};

var removeCompletedItems = function removeCompletedItems() {
  todoItems = todoItems.filter(function (tdi) {
    return !tdi.completed;
  });
  storeItems();
};

var updateItem = function updateItem(itemId, itemText) {
  var todoItem = getItem(itemId);
  todoItem.text = itemText;
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  storeItems();
};

loadItems(); //-----------------------------------------------------------------------------------

var itemDragStart = function itemDragStart(e) {
  e.preventDefault();
  console.log('itemDragStart');
};

var itemDragOver = function itemDragOver(e) {
  e.preventDefault();
  console.log('itemDragOver');
};

var itemDragEnd = function itemDragEnd(e) {
  e.preventDefault();
  console.log('itemDragEnd');
};

var renderItems = function renderItems() {
  // clear items HTML
  itemList.innerHTML = ''; // generate items HTML

  todoItems.forEach(function (todoItem) {
    var completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\"  id=\"".concat(todoItem.id, "\" draggable=\"true\">\n        <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>\n        <div class=\"item-icons\">\n          <i class=\"far fa-check-circle complete-item item-icon\"></i>\n          <i class=\"far fa-edit edit-item item-icon\"></i>\n          <i class=\"far fa-times-circle delete-item item-icon\"></i>\n        </div>\n      </div>"));
    var element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', itemDragStart);
    element.addEventListener('dragover', itemDragOver);
    element.addEventListener('dragend', itemDragEnd);
    console.log(element);
  });
}; // event handler to add/edit a list item


form.addEventListener('submit', function (e) {
  e.preventDefault(); // collect input asnd clear textbox

  var itemText = itemInput.value; // validate

  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  } // add/edit


  if (currentEditItem) {
    updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    addItem(itemText);
    renderItems();
  } // clear input text


  itemInput.value = '';
}); // event handler to clear items

clearButton.addEventListener('click', function (e) {
  e.preventDefault();
  removeCompletedItems();
  renderItems();
}); // event handler to complete, edit and delete

itemList.addEventListener('click', function (e) {
  e.preventDefault(); // decide which of our action button were clicked (if any)

  var targetClasses = e.target.classList;

  var getItemId = function getItemId() {
    return e.target.closest('div.item').id;
  }; // complete/edit/delete


  if (targetClasses.contains('complete-item')) {
    completeItem(getItemId());
    renderItems();
  } else if (targetClasses.contains('edit-item')) {
    currentEditItem = getItem(getItemId());
    itemInput.value = currentEditItem.text;
    submitButton.innerText = 'Edit';
    renderItems();
  } else if (targetClasses.contains('delete-item')) {
    removeItem(getItemId());
    renderItems();
  }
});
renderItems();