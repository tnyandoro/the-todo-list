

let itemBeingDragged = null;
let draggingPointer = null;

const itemDragStart = (e) => {
  console.log('itemDragStart');

  if (!e.target.classList.contains('item')) {
    return;
  }

  itemBeingDragged = e.target;
  itemBeingDragged.classList.add('dragging');

  draggingPointer = document.createElement('hr');
  draggingPointer.classList.add('dragging-pointer');

  itemList.appendChild(draggingPointer);
  draggingPointer.before(itemBeingDragged);
};

const itemDragOver = (e) => {
  e.preventDefault();

  if (!itemBeingDragged) {
    return;
  }

  if (!e.target.classList.contains('item')) {
    return;
  }

  const itemBeingDraggedOver = e.target;
  const mouseVerticalPosition = e.clientY;
  const itemBeingDraggedOverRectangle = itemBeingDraggedOver.getBoundingClientRect();
  const itemBeingDraggedOverVerticalCenter = itemBeingDraggedOverRectangle.top
                                            + (itemBeingDraggedOverRectangle.height / 2);

  if (mouseVerticalPosition <= itemBeingDraggedOverVerticalCenter) {
    draggingPointer.before(itemBeingDraggedOver);
  } else {
    draggingPointer.after(itemBeingDraggedOver);
  }
};

const itemDragEnd = (e) => {
  console.log('itemDragEnd');

  if (!itemBeingDragged) {
    return;
  }

  itemBeingDragged.classList.remove('dragging');
  itemBeingDragged = null;

  draggingPointer.remove();
  draggingPointer = null;
};
