import css from "./style.css";
// declarations
const form = document.querySelector('#itemForm'); //select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const items = document.querySelectorAll('.item-list');

const addTodo = function (itemName) {

  items.forEach(function (item) {

    if (item.querySelector('.item-name').textContent === itemName) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });
      // event listener for for edit
      item.querySelector('.edit-item').addEventListener('click', function () {
        itemInput.value = itemName;
        itemList.removeChild(item);

        todoItems = todoItems.filter(function (item) {
          return item !== itemName;
        })
      });
      // event listener for delete 
      item.querySelector('.delete-item').addEventListener('click', function(){
                // debugger;
                //itemList.removeChild(item);

        var dataItem = todoItems.find(function (item) {
          return item === itemName;
        })
        removeItem(dataItem);
        showFeedback('item delete', 'success')
      })
    }
  })
}

const removeItem = function (item) {
  // console.log(item);
  const removeIndex = (todoItems.indexOf(item));
  console.log(removeIndex);
  todoItems.splice(removeIndex, 1);
  getList(todoItems);
}

const getList = function (todoItems) {
  itemList.innerHTML = '';

  todoItems.forEach(function (item, index) {
    itemList.insertAdjacentHTML('beforeend',
      `<div class="item my-3">
  <h5 class="item-name text-capitalize">${item}</h5>
  <div class="item-icons"><a href="#" class="complete-item mx-2 item-icon">
  <i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon">
  <i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon">
  <i class="far fa-times-circle"></i></a></div></div>`);

    addTodo(item);
  });
}

//get local storage
const getLocalStorage = function(){

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

// set local storage 
const setLocalStorage = function (todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// get local storage  
getLocalStorage();

// add a list item and to local storage 
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName === 0) {
    feedback.innerHTML = "Enter a Valid to do";
    feedback.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      feedback.classList.remove('showItem');
    }, 3000)
  } else {
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
    //add event listeners to icons;
    //addtodo(itemName);
  }

  itemInput.value = '';
});

//clear items from the listeners

clearButton.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})
