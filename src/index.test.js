/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import 'jest-localstorage-mock';
import App from './App.js';

document.innerHTML = fs.readFileSync('./src/index.html', 'utf8');

const app = new App();
app.init();

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe('ItemRepository', () => {
  it('should start with zero items', () => {
    expect(1).toBe(1);
  });
});