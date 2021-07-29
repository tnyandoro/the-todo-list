/* eslint-disable no-unused-vars */
import './style.css';
import ItemSorter from './ItemSorter.js';
import ItemRepository from './ItemRepository.js';

export default class App {
  constructor() {
    this.currentEditItem = null;

    this.form = document.querySelector('#itemForm'); // select the form
    this.itemInput = document.querySelector('#itemInput'); // select the input box from the form
    this.itemList = document.querySelector('.item-list');
    this.inform = document.querySelector('.inform');
    this.clearButton = document.querySelector('#clear-list');
    this.submitButton = document.querySelector('#submitButton');

    this.itemRepository = new ItemRepository();
    this.itemSorter = new ItemSorter(this.itemList, this.itemRepository);
  }

  init() {
    // event handler to add/edit a list item
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      // collect input asnd clear textbox
      const itemText = this.itemInput.value;

      // validate
      if (!itemText || !itemText.trim()) {
        this.inform.innerHTML = 'Enter a valid to do';
        this.inform.classList.add('showItem', 'alert-danger');
        setTimeout(() => {
          this.inform.classList.remove('showItem');
        }, 3000);
        return;
      }

      // add/edit
      if (this.currentEditItem) {
        this.itemRepository.updateItem(this.currentEditItem.id, itemText);
        this.currentEditItem = null;
        this.submitButton.innerText = 'Add';
        this.renderItems();
      } else {
        this.itemRepository.addItem(itemText);
        this.renderItems();
      }

      // clear input text
      this.itemInput.value = '';
    });

    // event handler to clear items
    this.clearButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.itemRepository.removeCompletedItems();
      this.renderItems();
    });

    // event handler to complete, edit and delete
    this.itemList.addEventListener('click', (e) => {
      e.preventDefault();

      // decide which of our action button were clicked (if any)
      const targetClasses = e.target.classList;
      const getItemId = () => e.target.closest('div.item').id;

      // complete/edit/delete
      if (targetClasses.contains('complete-item')) {
        this.itemRepository.completeItem(getItemId());
        this.renderItems();
      } else if (targetClasses.contains('edit-item')) {
        this.currentEditItem = this.itemRepository.getItem(getItemId());
        this.itemInput.value = this.currentEditItem.text;
        this.submitButton.innerText = 'Edit';
        this.renderItems();
      } else if (targetClasses.contains('delete-item')) {
        this.itemRepository.removeItem(getItemId());
        this.renderItems();
      }
    });

    this.renderItems();
  }

  renderItems() {
    // clear items HTML
    this.itemList.innerHTML = '';

    // generate items HTML
    this.itemRepository.getItems().forEach((todoItem) => {
      const completed = todoItem.completed ? 'completed' : '';
      this.itemList.insertAdjacentHTML(
        'beforeend',
        `<div class="item" id="${todoItem.id}" draggable="true">
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
      element.addEventListener('dragstart', (e) => this.itemSorter.itemDragStart(e));
      element.addEventListener('dragover', (e) => this.itemSorter.itemDragOver(e));
      element.addEventListener('dragend', (e) => this.itemSorter.itemDragEnd(e));
    });
  }
}