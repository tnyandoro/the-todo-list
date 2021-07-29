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