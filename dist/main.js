/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ItemRepository.js":
/*!*******************************!*\
  !*** ./src/ItemRepository.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemRepository)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemRepository = /*#__PURE__*/function () {
  function ItemRepository() {
    _classCallCheck(this, ItemRepository);

    this.todoItems = [];
    this.loadItems();
  }

  _createClass(ItemRepository, [{
    key: "storeItems",
    value: function storeItems() {
      localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
    }
  }, {
    key: "loadItems",
    value: function loadItems() {
      this.todoItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    }
  }, {
    key: "getItem",
    value: function getItem(itemId) {
      var todoItem = this.todoItems.find(function (tdi) {
        return tdi.id === itemId;
      });
      return todoItem;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this.todoItems;
    }
  }, {
    key: "addItem",
    value: function addItem(itemText) {
      var time = new Date().getTime();
      this.todoItems.push({
        id: "".concat(time),
        text: itemText,
        completed: false
      });
      this.storeItems();
    }
  }, {
    key: "completeItem",
    value: function completeItem(itemId) {
      var todoItem = this.getItem(itemId);
      todoItem.completed = !todoItem.completed;
      this.storeItems();
    }
  }, {
    key: "removeItem",
    value: function removeItem(itemId) {
      var todoItem = this.getItem(itemId);
      var removeIndex = this.todoItems.indexOf(todoItem);
      this.todoItems.splice(removeIndex, 1);
      this.storeItems();
    }
  }, {
    key: "removeCompletedItems",
    value: function removeCompletedItems() {
      this.todoItems = this.todoItems.filter(function (tdi) {
        return !tdi.completed;
      });
      this.storeItems();
    }
  }, {
    key: "updateItem",
    value: function updateItem(itemId, itemText) {
      var todoItem = this.getItem(itemId);
      todoItem.text = itemText;
      this.storeItems();
    }
  }, {
    key: "moveItem",
    value: function moveItem(itemId, toIndex) {
      var todoItem = this.getItem(itemId);
      var fromIndex = this.todoItems.indexOf(todoItem); // find current index

      this.todoItems.splice(fromIndex, 1); // remove from current index

      this.todoItems.splice(toIndex, 0, todoItem); // add to new index

      this.storeItems();
    }
  }]);

  return ItemRepository;
}();



/***/ }),

/***/ "./src/ItemSorter.js":
/*!***************************!*\
  !*** ./src/ItemSorter.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemSorter)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemSorter = /*#__PURE__*/function () {
  function ItemSorter(itemList, itemRepository) {
    _classCallCheck(this, ItemSorter);

    this.itemBeingDragged = null;
    this.itemList = itemList;
    this.itemRepository = itemRepository;
  }

  _createClass(ItemSorter, [{
    key: "itemDragStart",
    value: function itemDragStart(e) {
      if (!e.target.classList.contains('item')) {
        return;
      }

      this.itemBeingDragged = e.target;
      this.itemBeingDragged.classList.add('dragging');
    }
  }, {
    key: "itemDragOver",
    value: function itemDragOver(e) {
      e.preventDefault();

      if (!this.itemBeingDragged) {
        return;
      }

      if (!e.target.classList.contains('item')) {
        return;
      }

      var itemBeingDraggedOver = e.target;

      if (this.itemBeingDragged.id === itemBeingDraggedOver.id) {
        return;
      }

      var mouseVerticalPosition = e.clientY;
      var itemBeingDraggedOverRectangle = itemBeingDraggedOver.getBoundingClientRect();
      var itemBeingDraggedOverVerticalCenter = itemBeingDraggedOverRectangle.top + itemBeingDraggedOverRectangle.height / 2;

      if (mouseVerticalPosition <= itemBeingDraggedOverVerticalCenter) {
        this.itemBeingDragged.before(itemBeingDraggedOver);
      } else {
        this.itemBeingDragged.after(itemBeingDraggedOver);
      }
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "itemDragEnd",
    value: function itemDragEnd(e) {
      if (!this.itemBeingDragged) {
        return;
      }

      var newIndex = Array.prototype.indexOf.call(this.itemList.children, this.itemBeingDragged);
      this.itemRepository.moveItem(this.itemBeingDragged.id, newIndex);
      this.itemBeingDragged.classList.remove('dragging');
      this.itemBeingDragged = null;
    }
  }]);

  return ItemSorter;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemRepository_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemRepository.js */ "./src/ItemRepository.js");
/* harmony import */ var _ItemSorter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemSorter.js */ "./src/ItemSorter.js");

 // declarations and

var currentEditItem = null;
var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var submitButton = document.querySelector('#submitButton');
var itemRepository = new _ItemRepository_js__WEBPACK_IMPORTED_MODULE_0__.default();
var itemSorter = new _ItemSorter_js__WEBPACK_IMPORTED_MODULE_1__.default(itemList, itemRepository);

var renderItems = function renderItems() {
  // clear items HTML
  itemList.innerHTML = ''; // generate items HTML

  itemRepository.getItems().forEach(function (todoItem) {
    var completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item\"  id=\"".concat(todoItem.id, "\" draggable=\"true\">\n      <div class=\"item-icons\">\n          <i class=\"far fa-check-square complete-item item-icon\"></i>\n          <i class=\"far fa-edit edit-item item-icon\"></i>\n          <i class=\"far fa-times-circle delete-item item-icon\"></i>\n        </div>\n        <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>        \n      </div>"));
    var element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', function (e) {
      return itemSorter.itemDragStart(e);
    });
    element.addEventListener('dragover', function (e) {
      return itemSorter.itemDragOver(e);
    });
    element.addEventListener('dragend', function (e) {
      return itemSorter.itemDragEnd(e);
    });
  });
}; // event handler to add/edit a list item


form.addEventListener('submit', function (e) {
  e.preventDefault(); // collect input asnd clear textbox

  var itemText = itemInput.value; // validate

  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  } // add/edit


  if (currentEditItem) {
    itemRepository.updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    itemRepository.addItem(itemText);
    renderItems();
  } // clear input text


  itemInput.value = '';
}); // event handler to clear items

clearButton.addEventListener('click', function (e) {
  e.preventDefault();
  itemRepository.removeCompletedItems();
  renderItems();
}); // event handler to complete, edit and delete

itemList.addEventListener('click', function (e) {
  e.preventDefault(); // decide which of our action button were clicked (if any)

  var targetClasses = e.target.classList;

  var getItemId = function getItemId() {
    return e.target.closest('div.item').id;
  }; // complete/edit/delete


  if (targetClasses.contains('complete-item')) {
    itemRepository.completeItem(getItemId());
    renderItems();
  } else if (targetClasses.contains('edit-item')) {
    currentEditItem = itemRepository.getItem(getItemId());
    itemInput.value = currentEditItem.text;
    submitButton.innerText = 'Edit';
    renderItems();
  } else if (targetClasses.contains('delete-item')) {
    itemRepository.removeItem(getItemId());
    renderItems();
  }
});
renderItems();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL0l0ZW1SZXBvc2l0b3J5LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvSXRlbVNvcnRlci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJJdGVtUmVwb3NpdG9yeSIsInRvZG9JdGVtcyIsImxvYWRJdGVtcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJnZXRJdGVtIiwiaXRlbUlkIiwidG9kb0l0ZW0iLCJmaW5kIiwidGRpIiwiaWQiLCJpdGVtVGV4dCIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInB1c2giLCJ0ZXh0IiwiY29tcGxldGVkIiwic3RvcmVJdGVtcyIsInJlbW92ZUluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImZpbHRlciIsInRvSW5kZXgiLCJmcm9tSW5kZXgiLCJJdGVtU29ydGVyIiwiaXRlbUxpc3QiLCJpdGVtUmVwb3NpdG9yeSIsIml0ZW1CZWluZ0RyYWdnZWQiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJwcmV2ZW50RGVmYXVsdCIsIml0ZW1CZWluZ0RyYWdnZWRPdmVyIiwibW91c2VWZXJ0aWNhbFBvc2l0aW9uIiwiY2xpZW50WSIsIml0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbUJlaW5nRHJhZ2dlZE92ZXJWZXJ0aWNhbENlbnRlciIsInRvcCIsImhlaWdodCIsImJlZm9yZSIsImFmdGVyIiwibmV3SW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJjaGlsZHJlbiIsIm1vdmVJdGVtIiwicmVtb3ZlIiwiY3VycmVudEVkaXRJdGVtIiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIml0ZW1JbnB1dCIsImluZm9ybSIsImNsZWFyQnV0dG9uIiwic3VibWl0QnV0dG9uIiwiaXRlbVNvcnRlciIsInJlbmRlckl0ZW1zIiwiaW5uZXJIVE1MIiwiZ2V0SXRlbXMiLCJmb3JFYWNoIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIml0ZW1EcmFnU3RhcnQiLCJpdGVtRHJhZ092ZXIiLCJpdGVtRHJhZ0VuZCIsInZhbHVlIiwidHJpbSIsInNldFRpbWVvdXQiLCJ1cGRhdGVJdGVtIiwiaW5uZXJUZXh0IiwiYWRkSXRlbSIsInJlbW92ZUNvbXBsZXRlZEl0ZW1zIiwidGFyZ2V0Q2xhc3NlcyIsImdldEl0ZW1JZCIsImNsb3Nlc3QiLCJjb21wbGV0ZUl0ZW0iLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkEsYztBQUNuQiw0QkFBYztBQUFBOztBQUNaLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxTQUFMO0FBQ0Q7Ozs7V0FFRCxzQkFBYTtBQUNYQyxrQkFBWSxDQUFDQyxPQUFiLENBQXFCLFdBQXJCLEVBQWtDQyxJQUFJLENBQUNDLFNBQUwsQ0FBZSxLQUFLTCxTQUFwQixDQUFsQztBQUNEOzs7V0FFRCxxQkFBWTtBQUNWLFdBQUtBLFNBQUwsR0FBaUJJLElBQUksQ0FBQ0UsS0FBTCxDQUFXSixZQUFZLENBQUNLLE9BQWIsQ0FBcUIsV0FBckIsS0FBcUMsSUFBaEQsQ0FBakI7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QUYsQ0FBU21ELE9BQVQsQ0FBaUIsVUFBakIsRUFBNkJ2RSxFQUFuQztBQUFBLEdBQWxCLENBTHdDLENBT3hDOzs7QUFDQSxNQUFJcUUsYUFBYSxDQUFDL0MsUUFBZCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzNDTCxrQkFBYyxDQUFDdUQsWUFBZixDQUE0QkYsU0FBUyxFQUFyQztBQUNBbkIsZUFBVztBQUNaLEdBSEQsTUFHTyxJQUFJa0IsYUFBYSxDQUFDL0MsUUFBZCxDQUF1QixXQUF2QixDQUFKLEVBQXlDO0FBQzlDb0IsbUJBQWUsR0FBR3pCLGNBQWMsQ0FBQ3RCLE9BQWYsQ0FBdUIyRSxTQUFTLEVBQWhDLENBQWxCO0FBQ0F4QixhQUFTLENBQUNnQixLQUFWLEdBQWtCcEIsZUFBZSxDQUFDcEMsSUFBbEM7QUFDQTJDLGdCQUFZLENBQUNpQixTQUFiLEdBQXlCLE1BQXpCO0FBQ0FmLGVBQVc7QUFDWixHQUxNLE1BS0EsSUFBSWtCLGFBQWEsQ0FBQy9DLFFBQWQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUNoREwsa0JBQWMsQ0FBQ3dELFVBQWYsQ0FBMEJILFNBQVMsRUFBbkM7QUFDQW5CLGVBQVc7QUFDWjtBQUNGLENBcEJEO0FBc0JBQSxXQUFXLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvSXRlbXMgPSBbXTtcbiAgICB0aGlzLmxvYWRJdGVtcygpO1xuICB9XG5cbiAgc3RvcmVJdGVtcygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvSXRlbXMpKTtcbiAgfVxuXG4gIGxvYWRJdGVtcygpIHtcbiAgICB0aGlzLnRvZG9JdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9JdGVtcycpIHx8ICdbXScpO1xuICB9XG5cbiAgZ2V0SXRlbShpdGVtSWQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMudG9kb0l0ZW1zLmZpbmQoKHRkaSkgPT4gdGRpLmlkID09PSBpdGVtSWQpO1xuICAgIHJldHVybiB0b2RvSXRlbTtcbiAgfVxuXG4gIGdldEl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9JdGVtcztcbiAgfVxuXG4gIGFkZEl0ZW0oaXRlbVRleHQpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy50b2RvSXRlbXMucHVzaCh7XG4gICAgICBpZDogYCR7dGltZX1gLFxuICAgICAgdGV4dDogaXRlbVRleHQsXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMuc3RvcmVJdGVtcygpO1xuICB9XG5cbiAgY29tcGxldGVJdGVtKGl0ZW1JZCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgdG9kb0l0ZW0uY29tcGxldGVkID0gIXRvZG9JdGVtLmNvbXBsZXRlZDtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmdldEl0ZW0oaXRlbUlkKTtcbiAgICBjb25zdCByZW1vdmVJbmRleCA9ICh0aGlzLnRvZG9JdGVtcy5pbmRleE9mKHRvZG9JdGVtKSk7XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKHJlbW92ZUluZGV4LCAxKTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHJlbW92ZUNvbXBsZXRlZEl0ZW1zKCkge1xuICAgIHRoaXMudG9kb0l0ZW1zID0gdGhpcy50b2RvSXRlbXMuZmlsdGVyKCh0ZGkpID0+ICF0ZGkuY29tcGxldGVkKTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtVGV4dCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgdG9kb0l0ZW0udGV4dCA9IGl0ZW1UZXh0O1xuICAgIHRoaXMuc3RvcmVJdGVtcygpO1xuICB9XG5cbiAgbW92ZUl0ZW0oaXRlbUlkLCB0b0luZGV4KSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmdldEl0ZW0oaXRlbUlkKTtcbiAgICBjb25zdCBmcm9tSW5kZXggPSB0aGlzLnRvZG9JdGVtcy5pbmRleE9mKHRvZG9JdGVtKTsgLy8gZmluZCBjdXJyZW50IGluZGV4XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKGZyb21JbmRleCwgMSk7IC8vIHJlbW92ZSBmcm9tIGN1cnJlbnQgaW5kZXhcbiAgICB0aGlzLnRvZG9JdGVtcy5zcGxpY2UodG9JbmRleCwgMCwgdG9kb0l0ZW0pOyAvLyBhZGQgdG8gbmV3IGluZGV4XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtU29ydGVyIHtcbiAgY29uc3RydWN0b3IoaXRlbUxpc3QsIGl0ZW1SZXBvc2l0b3J5KSB7XG4gICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkID0gbnVsbDtcbiAgICB0aGlzLml0ZW1MaXN0ID0gaXRlbUxpc3Q7XG4gICAgdGhpcy5pdGVtUmVwb3NpdG9yeSA9IGl0ZW1SZXBvc2l0b3J5O1xuICB9XG5cbiAgaXRlbURyYWdTdGFydChlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2l0ZW0nKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IGUudGFyZ2V0O1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgaXRlbURyYWdPdmVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMuaXRlbUJlaW5nRHJhZ2dlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpdGVtJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtQmVpbmdEcmFnZ2VkT3ZlciA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5pZCA9PT0gaXRlbUJlaW5nRHJhZ2dlZE92ZXIuaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtb3VzZVZlcnRpY2FsUG9zaXRpb24gPSBlLmNsaWVudFk7XG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXJSZWN0YW5nbGUgPSBpdGVtQmVpbmdEcmFnZ2VkT3Zlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBpdGVtQmVpbmdEcmFnZ2VkT3ZlclZlcnRpY2FsQ2VudGVyID0gaXRlbUJlaW5nRHJhZ2dlZE92ZXJSZWN0YW5nbGUudG9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAoaXRlbUJlaW5nRHJhZ2dlZE92ZXJSZWN0YW5nbGUuaGVpZ2h0IC8gMik7XG5cbiAgICBpZiAobW91c2VWZXJ0aWNhbFBvc2l0aW9uIDw9IGl0ZW1CZWluZ0RyYWdnZWRPdmVyVmVydGljYWxDZW50ZXIpIHtcbiAgICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5iZWZvcmUoaXRlbUJlaW5nRHJhZ2dlZE92ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuYWZ0ZXIoaXRlbUJlaW5nRHJhZ2dlZE92ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBpdGVtRHJhZ0VuZChlKSB7XG4gICAgaWYgKCF0aGlzLml0ZW1CZWluZ0RyYWdnZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5pdGVtTGlzdC5jaGlsZHJlbiwgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkKTtcbiAgICB0aGlzLml0ZW1SZXBvc2l0b3J5Lm1vdmVJdGVtKHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5pZCwgbmV3SW5kZXgpO1xuXG4gICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkID0gbnVsbDtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgSXRlbVJlcG9zaXRvcnkgZnJvbSAnLi9JdGVtUmVwb3NpdG9yeS5qcyc7XG5pbXBvcnQgSXRlbVNvcnRlciBmcm9tICcuL0l0ZW1Tb3J0ZXIuanMnO1xuXG4vLyBkZWNsYXJhdGlvbnMgYW5kXG5sZXQgY3VycmVudEVkaXRJdGVtID0gbnVsbDtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXRlbUZvcm0nKTsgLy8gc2VsZWN0IHRoZSBmb3JtXG5jb25zdCBpdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXRlbUlucHV0Jyk7IC8vIHNlbGVjdCB0aGUgaW5wdXQgYm94IGZyb20gdGhlIGZvcm1cbmNvbnN0IGl0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW0tbGlzdCcpO1xuY29uc3QgaW5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9ybScpO1xuY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xlYXItbGlzdCcpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdEJ1dHRvbicpO1xuXG5jb25zdCBpdGVtUmVwb3NpdG9yeSA9IG5ldyBJdGVtUmVwb3NpdG9yeSgpO1xuY29uc3QgaXRlbVNvcnRlciA9IG5ldyBJdGVtU29ydGVyKGl0ZW1MaXN0LCBpdGVtUmVwb3NpdG9yeSk7XG5cbmNvbnN0IHJlbmRlckl0ZW1zID0gKCkgPT4ge1xuICAvLyBjbGVhciBpdGVtcyBIVE1MXG4gIGl0ZW1MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gIC8vIGdlbmVyYXRlIGl0ZW1zIEhUTUxcbiAgaXRlbVJlcG9zaXRvcnkuZ2V0SXRlbXMoKS5mb3JFYWNoKCh0b2RvSXRlbSkgPT4ge1xuICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRvZG9JdGVtLmNvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJyc7XG4gICAgaXRlbUxpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICBgPGRpdiBjbGFzcz1cIml0ZW1cIiAgaWQ9XCIke3RvZG9JdGVtLmlkfVwiIGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWljb25zXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stc3F1YXJlIGNvbXBsZXRlLWl0ZW0gaXRlbS1pY29uXCI+PC9pPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWVkaXQgZWRpdC1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZGVsZXRlLWl0ZW0gaXRlbS1pY29uXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGg1IGNsYXNzPVwiaXRlbS1uYW1lIHRleHQtY2FwaXRhbGl6ZSAke2NvbXBsZXRlZH1cIj4ke3RvZG9JdGVtLnRleHR9PC9oNT4gICAgICAgIFxuICAgICAgPC9kaXY+YCxcbiAgICApO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2RvSXRlbS5pZCk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gaXRlbVNvcnRlci5pdGVtRHJhZ1N0YXJ0KGUpKTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IGl0ZW1Tb3J0ZXIuaXRlbURyYWdPdmVyKGUpKTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gaXRlbVNvcnRlci5pdGVtRHJhZ0VuZChlKSk7XG4gIH0pO1xufTtcblxuLy8gZXZlbnQgaGFuZGxlciB0byBhZGQvZWRpdCBhIGxpc3QgaXRlbVxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gY29sbGVjdCBpbnB1dCBhc25kIGNsZWFyIHRleHRib3hcbiAgY29uc3QgaXRlbVRleHQgPSBpdGVtSW5wdXQudmFsdWU7XG5cbiAgLy8gdmFsaWRhdGVcbiAgaWYgKCFpdGVtVGV4dCB8fCAhaXRlbVRleHQudHJpbSgpKSB7XG4gICAgaW5mb3JtLmlubmVySFRNTCA9ICdFbnRlciBhIHZhbGlkIHRvIGRvJztcbiAgICBpbmZvcm0uY2xhc3NMaXN0LmFkZCgnc2hvd0l0ZW0nLCAnYWxlcnQtZGFuZ2VyJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvd0l0ZW0nKTtcbiAgICB9LCAzMDAwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBhZGQvZWRpdFxuICBpZiAoY3VycmVudEVkaXRJdGVtKSB7XG4gICAgaXRlbVJlcG9zaXRvcnkudXBkYXRlSXRlbShjdXJyZW50RWRpdEl0ZW0uaWQsIGl0ZW1UZXh0KTtcbiAgICBjdXJyZW50RWRpdEl0ZW0gPSBudWxsO1xuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkJztcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2Uge1xuICAgIGl0ZW1SZXBvc2l0b3J5LmFkZEl0ZW0oaXRlbVRleHQpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH1cblxuICAvLyBjbGVhciBpbnB1dCB0ZXh0XG4gIGl0ZW1JbnB1dC52YWx1ZSA9ICcnO1xufSk7XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gY2xlYXIgaXRlbXNcbmNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpdGVtUmVwb3NpdG9yeS5yZW1vdmVDb21wbGV0ZWRJdGVtcygpO1xuICByZW5kZXJJdGVtcygpO1xufSk7XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gY29tcGxldGUsIGVkaXQgYW5kIGRlbGV0ZVxuaXRlbUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gZGVjaWRlIHdoaWNoIG9mIG91ciBhY3Rpb24gYnV0dG9uIHdlcmUgY2xpY2tlZCAoaWYgYW55KVxuICBjb25zdCB0YXJnZXRDbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICBjb25zdCBnZXRJdGVtSWQgPSAoKSA9PiBlLnRhcmdldC5jbG9zZXN0KCdkaXYuaXRlbScpLmlkO1xuXG4gIC8vIGNvbXBsZXRlL2VkaXQvZGVsZXRlXG4gIGlmICh0YXJnZXRDbGFzc2VzLmNvbnRhaW5zKCdjb21wbGV0ZS1pdGVtJykpIHtcbiAgICBpdGVtUmVwb3NpdG9yeS5jb21wbGV0ZUl0ZW0oZ2V0SXRlbUlkKCkpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnZWRpdC1pdGVtJykpIHtcbiAgICBjdXJyZW50RWRpdEl0ZW0gPSBpdGVtUmVwb3NpdG9yeS5nZXRJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICBpdGVtSW5wdXQudmFsdWUgPSBjdXJyZW50RWRpdEl0ZW0udGV4dDtcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0VkaXQnO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnZGVsZXRlLWl0ZW0nKSkge1xuICAgIGl0ZW1SZXBvc2l0b3J5LnJlbW92ZUl0ZW0oZ2V0SXRlbUlkKCkpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH1cbn0pO1xuXG5yZW5kZXJJdGVtcygpOyJdLCJzb3VyY2VSb290IjoiIn0=