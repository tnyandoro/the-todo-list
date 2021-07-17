class ItemSorter {
  constructor() {
    this.itemBeingDragged = null;
    this.draggingPointer = null;
  }

  itemDragStart() {
    console.log('itemDragStart');

    if (!e.target.classList.contains('item')) {
      return;
    }

    this.itemBeingDragged = e.target;
    this.itemBeingDragged.classList.add('dragging');

    this.draggingPointer = document.createElement('hr');
    this.draggingPointer.classList.add('dragging-pointer');

    itemList.appendChild(this.draggingPointer);
    this.draggingPointer.before(this.itemBeingDragged);
  }
}

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
