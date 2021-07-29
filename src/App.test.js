/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import 'jest-localstorage-mock';
import App from './App.js';

document.documentElement.innerHTML = fs.readFileSync('./src/index.html', 'utf8');

const app = new App();
app.init();

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
  app.itemRepository.removeAllItems();
});

describe('ItemRepository.addItem', () => {
  it('should add a todo item', () => {
    // arrange
    app.itemRepository.todoItems = [];
    app.renderItems();

    // act
    app.itemRepository.addItem('hello');
    app.renderItems();

    // assert
    const items1 = document.querySelectorAll('.item');
    expect(items1.length).toBe(1);

    // act (again)
    app.itemRepository.addItem('you');
    app.renderItems();

    // assert (again)
    const items2 = document.querySelectorAll('.item');
    expect(items2.length).toBe(2);
  });
});

describe('ItemRepository.removeCompletedItems', () => {
  it('should remove completed items', () => {
    // arrange
    app.itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: true },
      { id: 'i3', completed: true },
      { id: 'i4', completed: false },
    ];
    app.renderItems();

    // act
    app.itemRepository.removeCompletedItems();
    app.renderItems();

    // assert
    const items = document.querySelectorAll('.item');
    expect(items.length).toBe(1);
  });
});

describe('ItemRepository.removeItem', () => {
  it('should remove an item', () => {
    // arrange
    app.itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: true },
      { id: 'i3', completed: false },
      { id: 'i4', completed: false },
    ];
    app.renderItems();

    // act
    app.itemRepository.removeItem('i1');
    app.renderItems();

    // assert
    const items1 = document.querySelectorAll('.item');
    expect(items1.length).toBe(3);

    // act (again)
    app.itemRepository.removeItem('i4');
    app.renderItems();

    // assert (again)
    const items2 = document.querySelectorAll('.item');
    expect(items2.length).toBe(2);
  });
});

describe('ItemRepository.updateItem', () => {
  it('should edit and update an item description', () => {
    // arrange
    app.itemRepository.todoItems = [
      { id: 'i1', text: 'Description1', completed: false },
    ];
    app.renderItems();

    // act
    app.itemRepository.updateItem('i1', 'DescriptionX');
    app.renderItems();

    // assert
    const items = document.querySelectorAll('.item');
    expect(items[0].querySelector('h5').textContent).toBe('DescriptionX');
  });
});

describe('ItemRepository.completeItem', () => {
  it('should return an updated complete status', () => {
    // arrange
    app.itemRepository.todoItems = [
      { id: 'i1', completed: false },
    ];
    app.renderItems();

    // act
    app.itemRepository.completeItem('i1', true);
    app.renderItems();

    // assert
    const items = document.querySelectorAll('.item');
    expect(items[0].querySelector('h5').classList.contains('completed')).toBe(true);
  });
});

describe('ItemRepository.moveItem', () => {
  it('should move an item', () => {
    // arrange

    app.itemRepository.todoItems = [
      { id: 'i1', text: 'Description1', completed: true },
      { id: 'i2', text: 'Description2', completed: true },
      { id: 'i3', text: 'Description3', completed: false },
      { id: 'i4', text: 'Description4', completed: false },
    ];
    app.renderItems();

    // act
    app.itemRepository.moveItem('i3', 0);
    app.renderItems();

    // assert
    const items = document.querySelectorAll('.item');
    expect(items[0].querySelector('h5').textContent).toBe('Description3');
  });
});