/* eslint-disable no-unused-vars */
import css from './style.css';
import html from './index.html';
import ItemRepository from './ItemRepository.js';
import ItemSorter from './ItemSorter.js';

// declarations and
let currentEditItem = null;
const form = document.querySelector('#itemForm'); // select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const inform = document.querySelector('.inform');
const clearButton = document.querySelector('#clear-list');
const submitButton = document.querySelector('#submitButton');

const itemRepository = new ItemRepository();
const itemSorter = new ItemSorter(itemList, itemRepository);

const renderItems = () => {
  // clear items HTML
  itemList.innerHTML = '';

  // generate items HTML
  itemRepository.getItems().forEach((todoItem) => {
    const completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML(
      'beforeend',
      `<div class="item"  id="${todoItem.id}" draggable="true">
      <div class="item-icons">
          <i class="far fa-check-square complete-item item-icon"></i>
          <i class="far fa-edit edit-item item-icon"></i>
          <i class="far fa-times-circle delete-item item-icon"></i>
        </div>
        <h5 class="item-name text-capitalize ${completed}">${todoItem.text}</h5>   
        <i class="fas fa-ellipsis-v"></i>     
      </div>`,
    );
    const element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', (e) => itemSorter.itemDragStart(e));
    element.addEventListener('dragover', (e) => itemSorter.itemDragOver(e));
    element.addEventListener('dragend', (e) => itemSorter.itemDragEnd(e));
  });
};

// event handler to add/edit a list item
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // collect input asnd clear textbox
  const itemText = itemInput.value;

  // validate
  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  }

  // add/edit
  if (currentEditItem) {
    itemRepository.updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    itemRepository.addItem(itemText);
    renderItems();
  }

  // clear input text
  itemInput.value = '';
});

// event handler to clear items
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  itemRepository.removeCompletedItems();
  renderItems();
});

// event handler to complete, edit and delete
itemList.addEventListener('click', (e) => {
  e.preventDefault();

  // decide which of our action button were clicked (if any)
  const targetClasses = e.target.classList;
  const getItemId = () => e.target.closest('div.item').id;

  // complete/edit/delete
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