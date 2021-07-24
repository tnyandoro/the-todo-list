/* eslint-disable no-unused-vars */
import css from './style.css';
import html from './index.html';
import ItemRepository from './ItemRepository.js';
import ItemSorter from './ItemSorter.js'; // declarations and

var currentEditItem = null;
var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var submitButton = document.querySelector('#submitButton');
var itemRepository = new ItemRepository();
var itemSorter = new ItemSorter(itemList, itemRepository);

var renderItems = function renderItems() {
  // clear items HTML
  itemList.innerHTML = ''; // generate items HTML

  itemRepository.getItems().forEach(function (todoItem) {
    var completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item\"  id=\"".concat(todoItem.id, "\" draggable=\"true\">\n      <div class=\"item-icons\">\n          <i class=\"far fa-check-square complete-item item-icon\"></i>\n          <i class=\"far fa-edit edit-item item-icon\"></i>\n          <i class=\"far fa-times-circle delete-item item-icon\"></i>\n        </div>\n        <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>   \n        <i class=\"fas fa-ellipsis-v\"></i>     \n      </div>"));
    var element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', function (e) {
      return itemSorter.itemDragStart(e);
    });
    element.addEventListener('dragover', function (e) {
      return itemSorter.itemDragOver(e);
    });
    element.addEventListener('dragend', function (e) {
      return itemSorter.itemDragEnd(e);
    });
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
    itemRepository.updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    itemRepository.addItem(itemText);
    renderItems();
  } // clear input text


  itemInput.value = '';
}); // event handler to clear items

clearButton.addEventListener('click', function (e) {
  e.preventDefault();
  itemRepository.removeCompletedItems();
  renderItems();
}); // event handler to complete, edit and delete

itemList.addEventListener('click', function (e) {
  e.preventDefault(); // decide which of our action button were clicked (if any)

  var targetClasses = e.target.classList;

  var getItemId = function getItemId() {
    return e.target.closest('div.item').id;
  }; // complete/edit/delete


  if (targetClasses.contains('complete-item')) {
    itemRepository.completeItem(getItemId());
    renderItems();
  } else if (targetClasses.contains('edit-item')) {
    currentEditItem = itemRepository.getItem(getItemId());
    itemInput.value = currentEditItem.text;
    submitButton.innerText = 'Edit';
    renderItems();
  } else if (targetClasses.contains('delete-item')) {
    itemRepository.removeItem(getItemId());
    renderItems();
  }
});
renderItems();