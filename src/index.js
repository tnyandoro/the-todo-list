// declarations
const form = document.querySelector('#itemForm'); //select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const items = document.querySelectorAll('.item-list');

const addTodo = function(itemName) {
  items.forEach(function(item) {
    
    if(item.querySelector('.item-name').textContent === itemName) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function() {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });
    }
  })
}