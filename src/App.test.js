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

    // act
    app.itemRepository.removeItem('i4');
    app.renderItems();

    // assert
    const items2 = document.querySelectorAll('.item');
    expect(items2.length).toBe(2);
  });
});

describe('ItemRepository.removeItem', () => {
  it('should remove an item', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: true },
      { id: 'i3', completed: false },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.removeItem('i1');

    // assert
    expect(itemRepository.todoItems.length).toBe(3);
    expect(itemRepository.todoItems[0].id).toBe('i2');
    expect(itemRepository.todoItems[1].id).toBe('i3');
    expect(itemRepository.todoItems[2].id).toBe('i4');
  });
});

describe('ItemRepository.updateItem', () => {
  it('should edit and update an item description', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', text: 'Description1', completed: true },
      { id: 'i2', text: 'Description2', completed: true },
      { id: 'i3', text: 'Description3', completed: false },
      { id: 'i4', text: 'Description4', completed: false },
    ];

    // act
    itemRepository.updateItem('i3', 'DescriptionX');

    // assert
    expect(itemRepository.todoItems[2].text).toBe('DescriptionX');
  });
});

describe('ItemRepository.completeItem', () => {
  it('should return an updated complete status', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: false },
      { id: 'i2', completed: false },
      { id: 'i3', completed: false },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.completeItem('i3');

    // assert
    expect(itemRepository.todoItems[2].completed).toBe(true);
  });
});

describe('ItemRepository.moveItem', () => {
  it('should move an item', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: false },
      { id: 'i2', completed: false },
      { id: 'i3', completed: false },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.moveItem('i3', 0);

    // assert
    expect(itemRepository.todoItems[0].id).toBe('i3');
  });
});