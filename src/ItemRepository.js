export default class ItemRepository {
  constructor() {
    this.todoItems = [];
    this.loadItems();
  }

  storeItems() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  loadItems() {
    this.todoItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
  }

  getItem(itemId) {
    const todoItem = this.todoItems.find((tdi) => tdi.id === itemId);
    return todoItem;
  }

  getItems() {
    return this.todoItems;
  }

  addItem(itemText) {
    const time = new Date().getTime();
    const random = Math.floor((Math.random() * 1000) + 1);
    const itemId = `${time}${random}`;
    this.todoItems.push({
      id: itemId,
      text: itemText,
      completed: false,
    });
    this.storeItems();
    return itemId;
  }

  completeItem(itemId) {
    const todoItem = this.getItem(itemId);
    todoItem.completed = !todoItem.completed;
    this.storeItems();
  }

  removeItem(itemId) {
    const todoItem = this.getItem(itemId);
    const removeIndex = (this.todoItems.indexOf(todoItem));
    this.todoItems.splice(removeIndex, 1);
    this.storeItems();
  }

  removeCompletedItems() {
    this.todoItems = this.todoItems.filter((tdi) => !tdi.completed);
    this.storeItems();
  }

  removeAllItems() {
    this.todoItems = [];
    this.storeItems();
  }

  updateItem(itemId, itemText) {
    const todoItem = this.getItem(itemId);
    todoItem.text = itemText;
    this.storeItems();
  }

  moveItem(itemId, toIndex) {
    const todoItem = this.getItem(itemId);
    const fromIndex = this.todoItems.indexOf(todoItem); // find current index
    this.todoItems.splice(fromIndex, 1); // remove from current index
    this.todoItems.splice(toIndex, 0, todoItem); // add to new index
    this.storeItems();
  }
}