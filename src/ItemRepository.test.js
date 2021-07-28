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
    const id1 = itemRepository.addItem('one');

    // assert
    expect(id1).toBeTruthy();
    expect(typeof id1).toBe('string');
    expect(id1).toBe(id1.trim());

    const id2 = itemRepository.addItem('two');

    // assert
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

    // acta again adding another objects
    itemRepository.addItem('two');

    // assert
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
    itemRepository.todoItems = [ {id: 'i1', completed: true}, { id: 'i2', completed: true },
, { id: 'i3', completed: false },
, { id: 'i4', completed: false },
]

itemRepository.removeCompletedItems();

    // assert
    expect(itemRepository.todoItems.length).toBe(2);
    expect(itemRepository.todoItems[0].id).toBe('i3');
    expect(itemRepository.todoItems[1].id).toBe('i4');

  });
});

