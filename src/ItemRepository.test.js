/**
 * @jest-environment jsdom
 */

import 'jest-localstorage-mock';
import ItemRepository from './ItemRepository.js';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe('ItemRepository', () => {
  it('should start with zero items', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // assert
    expect(itemRepository.todoItems.length).toBe(0);
  });
});

describe('ItemRepository.addItem', () => {
  it('should return a string ID', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // act
    const id1 = itemRepository.addItem('one');

    // assert
    expect(id1).toBeTruthy();
    expect(typeof id1).toBe('string');
    expect(id1).toBe(id1.trim());

    // act (again)
    const id2 = itemRepository.addItem('two');

    // assert (again)
    expect(id2).toBeTruthy();
    expect(typeof id2).toBe('string');
    expect(id2).toBe(id2.trim());
    expect(id2).not.toBe(id1);
  });

  it('should add a todo item', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // act
    itemRepository.addItem('one');

    // assert
    expect(itemRepository.todoItems.length).toBe(1);
    expect(typeof itemRepository.todoItems[0]).toBe('object');
    expect(itemRepository.todoItems[0].completed).toBe(false);
    expect(itemRepository.todoItems[0].text).toBe('one');

    // act (again)
    itemRepository.addItem('two');

    // assert (again)
    expect(itemRepository.todoItems.length).toBe(2);
    expect(typeof itemRepository.todoItems[1]).toBe('object');
    expect(itemRepository.todoItems[1].completed).toBe(false);
    expect(itemRepository.todoItems[1].text).toBe('two');
  });
});

describe('ItemRepository.removeCompletedItems', () => {
  it('should remove completed items', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: true },
      { id: 'i3', completed: false },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.removeCompletedItems();

    // assert
    expect(itemRepository.todoItems.length).toBe(2);
    expect(itemRepository.todoItems[0].id).toBe('i3');
    expect(itemRepository.todoItems[1].id).toBe('i4');
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