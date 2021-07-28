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
    const ID1 = itemRepository.addItem('one');

    // assert
    expect(ID1).toBeTruthy();
    expect(typeof ID1).toBe('string');
    expect(ID1).toBe(ID1.trim());

    const ID2 = itemRepository.addItem('two');

    // assert
    expect(ID2).toBeTruthy();
    expect(typeof ID2).toBe('string');
    expect(ID2).toBe(ID2.trim());

    expect (ID2).not.toBe(ID1);
  });
});