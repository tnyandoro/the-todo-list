const itemList = document.querySelector('.item-list');

const renderItems = function () {
  // clear items HTML
  itemList.innerHTML = '';

  // generate items HTML
  todoItems.forEach((todoItem) => {
    const completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML(
      'beforeend',
      `<div class="item my-3"  id="${todoItem.id}" draggable="true">
        <h5 class="item-name text-capitalize ${completed}">${todoItem.text}</h5>
        <div class="item-icons">
          <i class="far fa-check-circle complete-item item-icon"></i>
          <i class="far fa-edit edit-item item-icon"></i>
          <i class="far fa-times-circle delete-item item-icon"></i>
        </div>
      </div>`,
    );
    const element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', itemDragStart);
    element.addEventListener('dragover', itemDragOver);
    element.addEventListener('dragend', itemDragEnd);
  });
};

// event handler to add/edit a list item
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // collect input asnd clear textbox
  const itemText = itemInput.value;

  // validate
  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  }

  // add/edit
  if (currentEditItem) {
    updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    addItem(itemText);
    renderItems();
  }

  // clear input text
  itemInput.value = '';
});

// event handler to clear items
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  removeCompletedItems();
  renderItems();
});

// event handler to complete, edit and delete
itemList.addEventListener('click', (e) => {
  e.preventDefault();

  // decide which of our action button were clicked (if any)
  const targetClasses = e.target.classList;
  const getItemId = () => e.target.closest('div.item').id;

  // complete/edit/delete
  if (targetClasses.contains('complete-item')) {
    completeItem(getItemId());
    renderItems();
  } else if (targetClasses.contains('edit-item')) {
    currentEditItem = getItem(getItemId());
    itemInput.value = currentEditItem.text;
    submitButton.innerText = 'Edit';
    renderItems();
  } else if (targetClasses.contains('delete-item')) {
    removeItem(getItemId());
    renderItems();
  }
});

// itemList.addEventListener('dragover', (e) => e.preventDefault());

export default renderItems();