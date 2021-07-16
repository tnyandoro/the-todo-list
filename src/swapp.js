let dragged;

/* events fired on the draggable target */
document.addEventListener('drag', (event) => {

}, false);

document.addEventListener('dragstart', (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = 0.5;
}, false);

document.addEventListener('dragend', (event) => {
  // reset the transparency
  event.target.style.opacity = '';
}, false);

/* events fired on the drop targets */
document.addEventListener('dragover', (event) => {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener('dragenter', (event) => {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className === 'item-list') {
    event.target.style.background = 'purple';
  }
}, false);

document.addEventListener('dragleave', (event) => {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className === 'item-list') {
    event.target.style.background = '';
  }
}, false);

document.addEventListener('drop', (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className === 'item-list') {
    event.target.style.background = '';
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
}, false);