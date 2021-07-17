const todoItems = [];

class Itemrepository {
  constructor() {
    this.todoItems = [];
  }

  storeItems() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  loadItems() {
    this.todoItems = JSON.parse(localStorage.getItem('this.todoItems') || '[]');
  }

  getItem(itemId) {
    todoItem = this.todoItems.find((tdi) => tdi.id === itemId);
    return todoItem;
  }

  addItem(itemText) {
    const time = new Date().getTime();
    this.todoItems.push({
      id: `${time}`,
      text: itemText,
      completed: false,
    });
    storeItems();
  }

  completeItem(itemId) {
    const todoItem = getItem(itemId);
    todoItem.completed = !todoItem.completed;
    storeItems();
  }

  removeItem(itemId) {
    const todoItem = getItem(itemId);
    const removeIndex = (this.todoItems.indexOf(todoItem));
    this.todoItems.splice(removeIndex, 1);
    storeItems();
  }

  removeCompletedItems() {
    this.todoItems = this.todoItems.filter((tdi) => !tdi.completed);
    storeItems();
  }
}

const updateItem = function (itemId, itemText) {
  const todoItem = getItem(itemId);
  todoItem.text = itemText;
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  storeItems();
};

loadItems();
