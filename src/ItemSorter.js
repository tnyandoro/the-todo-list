export default class ItemSorter {
  constructor(itemList, itemRepository) {
    this.itemBeingDragged = null;
    this.itemList = itemList;
    this.itemRepository = itemRepository;
  }

  itemDragStart(e) {
    if (!e.target.classList.contains('item')) {
      return;
    }

    this.itemBeingDragged = e.target;
    this.itemBeingDragged.classList.add('dragging');
  }

  itemDragOver(e) {
    e.preventDefault();

    if (!this.itemBeingDragged) {
      return;
    }

    if (!e.target.classList.contains('item')) {
      return;
    }

    const itemBeingDraggedOver = e.target;

    if (this.itemBeingDragged.id === itemBeingDraggedOver.id) {
      return;
    }

    const mouseVerticalPosition = e.clientY;
    const itemBeingDraggedOverRectangle = itemBeingDraggedOver.getBoundingClientRect();
    const itemBeingDraggedOverVerticalCenter = itemBeingDraggedOverRectangle.top
                                              + (itemBeingDraggedOverRectangle.height / 2);

    if (mouseVerticalPosition <= itemBeingDraggedOverVerticalCenter) {
      this.itemBeingDragged.before(itemBeingDraggedOver);
    } else {
      this.itemBeingDragged.after(itemBeingDraggedOver);
    }
  }

  // eslint-disable-next-line no-unused-vars
  itemDragEnd(e) {
    if (!this.itemBeingDragged) {
      return;
    }

    const newIndex = Array.prototype.indexOf.call(this.itemList.children, this.itemBeingDragged);
    this.itemRepository.moveItem(this.itemBeingDragged.id, newIndex);

    this.itemBeingDragged.classList.remove('dragging');
    this.itemBeingDragged = null;
  }
}