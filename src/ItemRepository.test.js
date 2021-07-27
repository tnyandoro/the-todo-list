import 'jest-localstorage-mock';
import ItemRepository from './ItemRepository.js';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});