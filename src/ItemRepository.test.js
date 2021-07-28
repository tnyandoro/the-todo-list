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
    const id1 = itemRepository.addItem('Hello');

    // assert
    expect(id1).toBeTruthy();
    expect(typeof id1).toBe('string');
    expect(id1).toBe(id1.trim());

    // act (again)
    const id2 = itemRepository.addItem('You');

    // assert (again)
    expect(id2).toBeTruthy();
    expect(typeof id2).toBe('string');
    expect(id2).toBe(id2.trim());

    expect(id2).not.toBe(id1); // make sure different ID is generated
  });