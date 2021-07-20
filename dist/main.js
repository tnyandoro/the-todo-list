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



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _ItemRepository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItemRepository.js */ "./src/ItemRepository.js");
/* harmony import */ var _ItemSorter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ItemSorter.js */ "./src/ItemSorter.js");
/* eslint-disable no-unused-vars */



 // declarations and

var currentEditItem = null;
var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var submitButton = document.querySelector('#submitButton');
var itemRepository = new _ItemRepository_js__WEBPACK_IMPORTED_MODULE_2__.default();
var itemSorter = new _ItemSorter_js__WEBPACK_IMPORTED_MODULE_3__.default(itemList, itemRepository);

var renderItems = function renderItems() {
  // clear items HTML
  itemList.innerHTML = ''; // generate items HTML

  itemRepository.getItems().forEach(function (todoItem) {
    var completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item\"  id=\"".concat(todoItem.id, "\" draggable=\"true\">\n      <div class=\"item-icons\">\n          <i class=\"far fa-check-square complete-item item-icon\"></i>\n          <i class=\"far fa-edit edit-item item-icon\"></i>\n          <i class=\"far fa-times-circle delete-item item-icon\"></i>\n        </div>\n        <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>   \n        <i class=\"fas fa-ellipsis-v\"></i>     \n      </div>"));
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

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./style.css */ "./src/style.css"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./index.js */ "./src/index.js"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>The Todo List</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Lato&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"\n    integrity=\"sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==\"\n    crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC\" crossorigin=\"anonymous\">\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\n</head>\n<header>\n  <h3 class=\"title\">The todo List</h3>\n</header>\n<div class=\"container hold\">\n  <h3 class=\"text-center heading\">Today Todo List</h3>\n  <div class=\"row\">\n    <div class=\"col mx-auto col-md-8 mt-3 text-center\">\n      <div class=\"alert text-capitalize heading feedback\">\n        Todays Todo List\n      </div>\n      <!-- form -->\n      <form id=\"itemForm\" class=\"my-3\">\n        <div class=\"input-group\">\n          <input type=\"text\" class=\"form-control text-capitalize\" id=\"itemInput\" placeholder=\"Add to your list...\">\n          <div class=\"input-group-append\">\n            <button id=\"submitButton\" class=\"btn btn-grey text-capitalize\" type=\"submit\">add</button>\n          </div>\n        </div>\n      </form>\n      <!-- end of form  -->\n      <div class=\"item-list my-5\">\n      </div>\n      <button type=\"button\" class=\"btn btn-grey my-3 text-capitalize\" id=\"clear-list\">clear all\n        completed</button>\n    </div>\n  </div>\n</div>\n<script src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"></script>\n</body>\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "57011448dc08b9372b5e.css";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL0l0ZW1SZXBvc2l0b3J5LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvSXRlbVNvcnRlci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJJdGVtUmVwb3NpdG9yeSIsInRvZG9JdGVtcyIsImxvYWRJdGVtcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJnZXRJdGVtIiwiaXRlbUlkIiwidG9kb0l0ZW0iLCJmaW5kIiwidGRpIiwiaWQiLCJpdGVtVGV4dCIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInB1c2giLCJ0ZXh0IiwiY29tcGxldGVkIiwic3RvcmVJdGVtcyIsInJlbW92ZUluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImZpbHRlciIsInRvSW5kZXgiLCJmcm9tSW5kZXgiLCJJdGVtU29ydGVyIiwiaXRlbUxpc3QiLCJpdGVtUmVwb3NpdG9yeSIsIml0ZW1CZWluZ0RyYWdnZWQiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJwcmV2ZW50RGVmYXVsdCIsIml0ZW1CZWluZ0RyYWdnZWRPdmVyIiwibW91c2VWZXJ0aWNhbFBvc2l0aW9uIiwiY2xpZW50WSIsIml0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbUJlaW5nRHJhZ2dlZE92ZXJWZXJ0aWNhbENlbnRlciIsInRvcCIsImhlaWdodCIsImJlZm9yZSIsImFmdGVyIiwibmV3SW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJjaGlsZHJlbiIsIm1vdmVJdGVtIiwicmVtb3ZlIiwiY3VycmVudEVkaXRJdGVtIiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIml0ZW1JbnB1dCIsImluZm9ybSIsImNsZWFyQnV0dG9uIiwic3VibWl0QnV0dG9uIiwiaXRlbVNvcnRlciIsInJlbmRlckl0ZW1zIiwiaW5uZXJIVE1MIiwiZ2V0SXRlbXMiLCJmb3JFYWNoIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIml0ZW1EcmFnU3RhcnQiLCJpdGVtRHJhZ092ZXIiLCJpdGVtRHJhZ0VuZCIsInZhbHVlIiwidHJpbSIsInNldFRpbWVvdXQiLCJ1cGRhdGVJdGVtIiwiaW5uZXJUZXh0IiwiYWRkSXRlbSIsInJlbW92ZUNvbXBsZXRlZEl0ZW1zIiwidGFyZ2V0Q2xhc3NlcyIsImdldEl0ZW1JZCIsImNsb3Nlc3QiLCJjb21wbGV0ZUl0ZW0iLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkEsYztBQUNuQiw0QkFBYztBQUFBOztBQUNaLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxTQUFMO0FBQ0Q7Ozs7V0FFRCxzQkFBYTtBQUNYQyxrQkFBWSxDQUFDQyxPQUFiLENBQXFCLFdBQXJCLEVBQWtDQyxJQUFJLENBQUNDLFNBQUwsQ0FBZSxLQUFLTCxTQUFwQixDQUFsQztBQUNEOzs7V0FFRCxxQkFBWTtBQUNWLFdBQUtBLFNBQUwsR0FBaUJJLElBQUksQ0FBQ0UsS0FBTCxDQUFXSixZQUFZLENBQUNLLE9BQWIsQ0FBcUIsV0FBckIsS0FBcUMsSUFBaEQsQ0FBakI7QUFDRDs7O1dBRUQsaUJBQVFDLE1BQVIsRUFBZ0I7QUFDZCxVQUFNQyxRQUFRLEdBQUcsS0FBS1QsU0FBTCxDQUFlVSxJQUFmLENBQW9CLFVBQUNDLEdBQUQ7QUFBQSxlQUFTQSxHQUFHLENBQUNDLEVBQUosS0FBV0osTUFBcEI7QUFBQSxPQUFwQixDQUFqQjtBQUNBLGFBQU9DLFFBQVA7QUFDRDs7O1dBRUQsb0JBQVc7QUFDVCxhQUFPLEtBQUtULFNBQVo7QUFDRDs7O1dBRUQsaUJBQVFhLFFBQVIsRUFBa0I7QUFDaEIsVUFBTUMsSUFBSSxHQUFHLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUFiO0FBQ0EsV0FBS2hCLFNBQUwsQ0FBZWlCLElBQWYsQ0FBb0I7QUFDbEJMLFVBQUUsWUFBS0UsSUFBTCxDQURnQjtBQUVsQkksWUFBSSxFQUFFTCxRQUZZO0FBR2xCTSxpQkFBUyxFQUFFO0FBSE8sT0FBcEI7QUFLQSxXQUFLQyxVQUFMO0FBQ0Q7OztXQUVELHNCQUFhWixNQUFiLEVBQXFCO0FBQ25CLFVBQU1DLFFBQVEsR0FBRyxLQUFLRixPQUFMLENBQWFDLE1BQWIsQ0FBakI7QUFDQUMsY0FBUSxDQUFD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QUFHOzs7QUFHSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQzs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUEsb0I7Ozs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudG9kb0l0ZW1zID0gW107XG4gICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgfVxuXG4gIHN0b3JlSXRlbXMoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb0l0ZW1zKSk7XG4gIH1cblxuICBsb2FkSXRlbXMoKSB7XG4gICAgdGhpcy50b2RvSXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvSXRlbXMnKSB8fCAnW10nKTtcbiAgfVxuXG4gIGdldEl0ZW0oaXRlbUlkKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLnRvZG9JdGVtcy5maW5kKCh0ZGkpID0+IHRkaS5pZCA9PT0gaXRlbUlkKTtcbiAgICByZXR1cm4gdG9kb0l0ZW07XG4gIH1cblxuICBnZXRJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvSXRlbXM7XG4gIH1cblxuICBhZGRJdGVtKGl0ZW1UZXh0KSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMudG9kb0l0ZW1zLnB1c2goe1xuICAgICAgaWQ6IGAke3RpbWV9YCxcbiAgICAgIHRleHQ6IGl0ZW1UZXh0LFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIGNvbXBsZXRlSXRlbShpdGVtSWQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZ2V0SXRlbShpdGVtSWQpO1xuICAgIHRvZG9JdGVtLmNvbXBsZXRlZCA9ICF0b2RvSXRlbS5jb21wbGV0ZWQ7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgY29uc3QgcmVtb3ZlSW5kZXggPSAodGhpcy50b2RvSXRlbXMuaW5kZXhPZih0b2RvSXRlbSkpO1xuICAgIHRoaXMudG9kb0l0ZW1zLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICByZW1vdmVDb21wbGV0ZWRJdGVtcygpIHtcbiAgICB0aGlzLnRvZG9JdGVtcyA9IHRoaXMudG9kb0l0ZW1zLmZpbHRlcigodGRpKSA9PiAhdGRpLmNvbXBsZXRlZCk7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICB1cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbVRleHQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZ2V0SXRlbShpdGVtSWQpO1xuICAgIHRvZG9JdGVtLnRleHQgPSBpdGVtVGV4dDtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIG1vdmVJdGVtKGl0ZW1JZCwgdG9JbmRleCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy50b2RvSXRlbXMuaW5kZXhPZih0b2RvSXRlbSk7IC8vIGZpbmQgY3VycmVudCBpbmRleFxuICAgIHRoaXMudG9kb0l0ZW1zLnNwbGljZShmcm9tSW5kZXgsIDEpOyAvLyByZW1vdmUgZnJvbSBjdXJyZW50IGluZGV4XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKHRvSW5kZXgsIDAsIHRvZG9JdGVtKTsgLy8gYWRkIHRvIG5ldyBpbmRleFxuICAgIHRoaXMuc3RvcmVJdGVtcygpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNvcnRlciB7XG4gIGNvbnN0cnVjdG9yKGl0ZW1MaXN0LCBpdGVtUmVwb3NpdG9yeSkge1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gICAgdGhpcy5pdGVtTGlzdCA9IGl0ZW1MaXN0O1xuICAgIHRoaXMuaXRlbVJlcG9zaXRvcnkgPSBpdGVtUmVwb3NpdG9yeTtcbiAgfVxuXG4gIGl0ZW1EcmFnU3RhcnQoZSkge1xuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpdGVtJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQgPSBlLnRhcmdldDtcbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGl0ZW1EcmFnT3ZlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCF0aGlzLml0ZW1CZWluZ0RyYWdnZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaXRlbScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXIgPSBlLnRhcmdldDtcblxuICAgIGlmICh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQgPT09IGl0ZW1CZWluZ0RyYWdnZWRPdmVyLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW91c2VWZXJ0aWNhbFBvc2l0aW9uID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlID0gaXRlbUJlaW5nRHJhZ2dlZE92ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXJWZXJ0aWNhbENlbnRlciA9IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLnRvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLmhlaWdodCAvIDIpO1xuXG4gICAgaWYgKG1vdXNlVmVydGljYWxQb3NpdGlvbiA8PSBpdGVtQmVpbmdEcmFnZ2VkT3ZlclZlcnRpY2FsQ2VudGVyKSB7XG4gICAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuYmVmb3JlKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkLmFmdGVyKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgaXRlbURyYWdFbmQoZSkge1xuICAgIGlmICghdGhpcy5pdGVtQmVpbmdEcmFnZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3SW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuaXRlbUxpc3QuY2hpbGRyZW4sIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCk7XG4gICAgdGhpcy5pdGVtUmVwb3NpdG9yeS5tb3ZlSXRlbSh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQsIG5ld0luZGV4KTtcblxuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IGNzcyBmcm9tICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaHRtbCBmcm9tICcuL2luZGV4Lmh0bWwnO1xuaW1wb3J0IEl0ZW1SZXBvc2l0b3J5IGZyb20gJy4vSXRlbVJlcG9zaXRvcnkuanMnO1xuaW1wb3J0IEl0ZW1Tb3J0ZXIgZnJvbSAnLi9JdGVtU29ydGVyLmpzJztcblxuLy8gZGVjbGFyYXRpb25zIGFuZFxubGV0IGN1cnJlbnRFZGl0SXRlbSA9IG51bGw7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1Gb3JtJyk7IC8vIHNlbGVjdCB0aGUgZm9ybVxuY29uc3QgaXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1JbnB1dCcpOyAvLyBzZWxlY3QgdGhlIGlucHV0IGJveCBmcm9tIHRoZSBmb3JtXG5jb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWxpc3QnKTtcbmNvbnN0IGluZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvcm0nKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLWxpc3QnKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXRCdXR0b24nKTtcblxuY29uc3QgaXRlbVJlcG9zaXRvcnkgPSBuZXcgSXRlbVJlcG9zaXRvcnkoKTtcbmNvbnN0IGl0ZW1Tb3J0ZXIgPSBuZXcgSXRlbVNvcnRlcihpdGVtTGlzdCwgaXRlbVJlcG9zaXRvcnkpO1xuXG5jb25zdCByZW5kZXJJdGVtcyA9ICgpID0+IHtcbiAgLy8gY2xlYXIgaXRlbXMgSFRNTFxuICBpdGVtTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAvLyBnZW5lcmF0ZSBpdGVtcyBIVE1MXG4gIGl0ZW1SZXBvc2l0b3J5LmdldEl0ZW1zKCkuZm9yRWFjaCgodG9kb0l0ZW0pID0+IHtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSB0b2RvSXRlbS5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnO1xuICAgIGl0ZW1MaXN0Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtXCIgIGlkPVwiJHt0b2RvSXRlbS5pZH1cIiBkcmFnZ2FibGU9XCJ0cnVlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pY29uc1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLXNxdWFyZSBjb21wbGV0ZS1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1lZGl0IGVkaXQtaXRlbSBpdGVtLWljb25cIj48L2k+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoNSBjbGFzcz1cIml0ZW0tbmFtZSB0ZXh0LWNhcGl0YWxpemUgJHtjb21wbGV0ZWR9XCI+JHt0b2RvSXRlbS50ZXh0fTwvaDU+ICAgXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWVsbGlwc2lzLXZcIj48L2k+ICAgICBcbiAgICAgIDwvZGl2PmAsXG4gICAgKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9kb0l0ZW0uaWQpO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IGl0ZW1Tb3J0ZXIuaXRlbURyYWdTdGFydChlKSk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiBpdGVtU29ydGVyLml0ZW1EcmFnT3ZlcihlKSk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IGl0ZW1Tb3J0ZXIuaXRlbURyYWdFbmQoZSkpO1xuICB9KTtcbn07XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gYWRkL2VkaXQgYSBsaXN0IGl0ZW1cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIGNvbGxlY3QgaW5wdXQgYXNuZCBjbGVhciB0ZXh0Ym94XG4gIGNvbnN0IGl0ZW1UZXh0ID0gaXRlbUlucHV0LnZhbHVlO1xuXG4gIC8vIHZhbGlkYXRlXG4gIGlmICghaXRlbVRleHQgfHwgIWl0ZW1UZXh0LnRyaW0oKSkge1xuICAgIGluZm9ybS5pbm5lckhUTUwgPSAnRW50ZXIgYSB2YWxpZCB0byBkbyc7XG4gICAgaW5mb3JtLmNsYXNzTGlzdC5hZGQoJ3Nob3dJdGVtJywgJ2FsZXJ0LWRhbmdlcicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5mb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dJdGVtJyk7XG4gICAgfSwgMzAwMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gYWRkL2VkaXRcbiAgaWYgKGN1cnJlbnRFZGl0SXRlbSkge1xuICAgIGl0ZW1SZXBvc2l0b3J5LnVwZGF0ZUl0ZW0oY3VycmVudEVkaXRJdGVtLmlkLCBpdGVtVGV4dCk7XG4gICAgY3VycmVudEVkaXRJdGVtID0gbnVsbDtcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0FkZCc7XG4gICAgcmVuZGVySXRlbXMoKTtcbiAgfSBlbHNlIHtcbiAgICBpdGVtUmVwb3NpdG9yeS5hZGRJdGVtKGl0ZW1UZXh0KTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9XG5cbiAgLy8gY2xlYXIgaW5wdXQgdGV4dFxuICBpdGVtSW5wdXQudmFsdWUgPSAnJztcbn0pO1xuXG4vLyBldmVudCBoYW5kbGVyIHRvIGNsZWFyIGl0ZW1zXG5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgaXRlbVJlcG9zaXRvcnkucmVtb3ZlQ29tcGxldGVkSXRlbXMoKTtcbiAgcmVuZGVySXRlbXMoKTtcbn0pO1xuXG4vLyBldmVudCBoYW5kbGVyIHRvIGNvbXBsZXRlLCBlZGl0IGFuZCBkZWxldGVcbml0ZW1MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIGRlY2lkZSB3aGljaCBvZiBvdXIgYWN0aW9uIGJ1dHRvbiB3ZXJlIGNsaWNrZWQgKGlmIGFueSlcbiAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcbiAgY29uc3QgZ2V0SXRlbUlkID0gKCkgPT4gZS50YXJnZXQuY2xvc2VzdCgnZGl2Lml0ZW0nKS5pZDtcblxuICAvLyBjb21wbGV0ZS9lZGl0L2RlbGV0ZVxuICBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnY29tcGxldGUtaXRlbScpKSB7XG4gICAgaXRlbVJlcG9zaXRvcnkuY29tcGxldGVJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuY29udGFpbnMoJ2VkaXQtaXRlbScpKSB7XG4gICAgY3VycmVudEVkaXRJdGVtID0gaXRlbVJlcG9zaXRvcnkuZ2V0SXRlbShnZXRJdGVtSWQoKSk7XG4gICAgaXRlbUlucHV0LnZhbHVlID0gY3VycmVudEVkaXRJdGVtLnRleHQ7XG4gICAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdFZGl0JztcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuY29udGFpbnMoJ2RlbGV0ZS1pdGVtJykpIHtcbiAgICBpdGVtUmVwb3NpdG9yeS5yZW1vdmVJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9XG59KTtcblxucmVuZGVySXRlbXMoKTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL3N0eWxlLmNzc1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vaW5kZXguanNcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbi8vIE1vZHVsZVxudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyk7XG52YXIgY29kZSA9IFwiPCFET0NUWVBFIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcblxcbjxoZWFkPlxcbiAgPG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiPlxcbiAgPG1ldGEgaHR0cC1lcXVpdj1cXFwiWC1VQS1Db21wYXRpYmxlXFxcIiBjb250ZW50PVxcXCJJRT1lZGdlXFxcIj5cXG4gIDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcIj5cXG4gIDx0aXRsZT5UaGUgVG9kbyBMaXN0PC90aXRsZT5cXG4gIDxsaW5rIHJlbD1cXFwicHJlY29ubmVjdFxcXCIgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVxcXCI+XFxuICA8bGluayByZWw9XFxcInByZWNvbm5lY3RcXFwiIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cXFwiIGNyb3Nzb3JpZ2luPlxcbiAgPGxpbmsgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1MYXRvJmRpc3BsYXk9c3dhcFxcXCIgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIj5cXG4gIDxsaW5rIHJlbD1cXFwic3R5bGVzaGVldFxcXCIgaHJlZj1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzUuMTUuMy9jc3MvYWxsLm1pbi5jc3NcXFwiXFxuICAgIGludGVncml0eT1cXFwic2hhNTEyLWlCQlhtOGZXOTArbnVMY1NLbGJtclBjTGEwT1Q5MnhPMUJJc1oreXdEV1pDdnFzV2djY1YzZ0ZvUkJ2MHorOGRMSmd5QUhJaFIzNVZaYzJvTS9nSTF3PT1cXFwiXFxuICAgIGNyb3Nzb3JpZ2luPVxcXCJhbm9ueW1vdXNcXFwiIHJlZmVycmVycG9saWN5PVxcXCJuby1yZWZlcnJlclxcXCIgLz5cXG4gIDxsaW5rIGhyZWY9XFxcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDUuMC4yL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXFxcIiByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIGludGVncml0eT1cXFwic2hhMzg0LUVWU1RRTjMvYXpwckcxQW5tM1FEZ3BKTEltOU5hbzBZejF6dGNRVHdGc3BkM3lENjVWb2hocHV1Q09tTEFTakNcXFwiIGNyb3Nzb3JpZ2luPVxcXCJhbm9ueW1vdXNcXFwiPlxcbiAgPGxpbmsgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIiBocmVmPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCI+XFxuPC9oZWFkPlxcbjxoZWFkZXI+XFxuICA8aDMgY2xhc3M9XFxcInRpdGxlXFxcIj5UaGUgdG9kbyBMaXN0PC9oMz5cXG48L2hlYWRlcj5cXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXIgaG9sZFxcXCI+XFxuICA8aDMgY2xhc3M9XFxcInRleHQtY2VudGVyIGhlYWRpbmdcXFwiPlRvZGF5IFRvZG8gTGlzdDwvaDM+XFxuICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wgbXgtYXV0byBjb2wtbWQtOCBtdC0zIHRleHQtY2VudGVyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJhbGVydCB0ZXh0LWNhcGl0YWxpemUgaGVhZGluZyBmZWVkYmFja1xcXCI+XFxuICAgICAgICBUb2RheXMgVG9kbyBMaXN0XFxuICAgICAgPC9kaXY+XFxuICAgICAgPCEtLSBmb3JtIC0tPlxcbiAgICAgIDxmb3JtIGlkPVxcXCJpdGVtRm9ybVxcXCIgY2xhc3M9XFxcIm15LTNcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB0ZXh0LWNhcGl0YWxpemVcXFwiIGlkPVxcXCJpdGVtSW5wdXRcXFwiIHBsYWNlaG9sZGVyPVxcXCJBZGQgdG8geW91ciBsaXN0Li4uXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtYXBwZW5kXFxcIj5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXRCdXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWdyZXkgdGV4dC1jYXBpdGFsaXplXFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPmFkZDwvYnV0dG9uPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZm9ybT5cXG4gICAgICA8IS0tIGVuZCBvZiBmb3JtICAtLT5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVtLWxpc3QgbXktNVxcXCI+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWdyZXkgbXktMyB0ZXh0LWNhcGl0YWxpemVcXFwiIGlkPVxcXCJjbGVhci1saXN0XFxcIj5jbGVhciBhbGxcXG4gICAgICAgIGNvbXBsZXRlZDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxzY3JpcHQgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gKyBcIlxcXCI+PC9zY3JpcHQ+XFxuPC9ib2R5PlxcbjwvaHRtbD5cIjtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubWF5YmVOZWVkUXVvdGVzICYmIC9bXFx0XFxuXFxmXFxyIFwiJz08PmBdLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybCwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9