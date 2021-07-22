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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --mainWhite: #f5f5f5;\n  --mainGrey: #000;\n  --mainBlack: #333;\n  --mainRed: #d62828;\n  --mainBlue: #11b5e4;\n}\n\nbody {\n  background: var(--mainWhite);\n  color: #333;\n}\n\n.title {\n  color: #e6efef;\n}\n\n.heading {\n  color: #000;\n  font-size: 18px;\n  padding-top: 30px;\n  font-style: italic;\n}\n\n.hold {\n  border: 1px solid;\n  margin: 0 auto;\n  width: 60%;\n  align-items: center;\n  border-radius: 3px;\n  box-shadow: 5px 10px #333;\n}\n\n.btn-grey {\n  border-color: var(--mainGrey);\n  background: transparent;\n  color: var(--mainGrey);\n}\n\n.btn-grey:hover {\n  background: var(--mainGrey);\n  color: var(--mainBlack);\n}\n\n.form-control {\n  border-color: var(--mainGrey) !important;\n}\n\n.feedback {\n  display: none;\n  color: #000;\n}\n\n.item-name {\n  margin-left: 0;\n  align-content: flex-start;\n}\n\n.item {\n  display: flex;\n  justify-content: space-between;\n  cursor: grab;\n  margin: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.item h5 {\n  margin: 0;\n}\n\n.item.dragging {\n  opacity: 0.5;\n  background-color: yellowgreen;\n}\n\n.item.dragover {\n  background-color: #11b5e4;\n}\n\n.dragging-pointer {\n  height: 1px;\n  border: 1px dashed gray;\n}\n\n.item-icon {\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n\n.complete-item {\n  color: var(--mainGrey);\n}\n\n.complete-item:hover {\n  color: var(--mainGrey);\n}\n\n.edit-item {\n  color: var(--mainBlue);\n}\n\n.edit-item:hover {\n  color: var(--mainBlue);\n}\n\n.delete-item {\n  color: var(--mainRed);\n}\n\n.delete-item:hover {\n  color: var(--mainRed);\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n\n.visibility {\n  opacity: 0.5;\n}\n\n.showItem {\n  display: block;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,6BAA6B;EAC7B,uBAAuB;EACvB,sBAAsB;AACxB;;AAEA;EACE,2BAA2B;EAC3B,uBAAuB;AACzB;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,SAAS;EACT,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;AAChB","sourcesContent":[":root {\n  --mainWhite: #f5f5f5;\n  --mainGrey: #000;\n  --mainBlack: #333;\n  --mainRed: #d62828;\n  --mainBlue: #11b5e4;\n}\n\nbody {\n  background: var(--mainWhite);\n  color: #333;\n}\n\n.title {\n  color: #e6efef;\n}\n\n.heading {\n  color: #000;\n  font-size: 18px;\n  padding-top: 30px;\n  font-style: italic;\n}\n\n.hold {\n  border: 1px solid;\n  margin: 0 auto;\n  width: 60%;\n  align-items: center;\n  border-radius: 3px;\n  box-shadow: 5px 10px #333;\n}\n\n.btn-grey {\n  border-color: var(--mainGrey);\n  background: transparent;\n  color: var(--mainGrey);\n}\n\n.btn-grey:hover {\n  background: var(--mainGrey);\n  color: var(--mainBlack);\n}\n\n.form-control {\n  border-color: var(--mainGrey) !important;\n}\n\n.feedback {\n  display: none;\n  color: #000;\n}\n\n.item-name {\n  margin-left: 0;\n  align-content: flex-start;\n}\n\n.item {\n  display: flex;\n  justify-content: space-between;\n  cursor: grab;\n  margin: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.item h5 {\n  margin: 0;\n}\n\n.item.dragging {\n  opacity: 0.5;\n  background-color: yellowgreen;\n}\n\n.item.dragover {\n  background-color: #11b5e4;\n}\n\n.dragging-pointer {\n  height: 1px;\n  border: 1px dashed gray;\n}\n\n.item-icon {\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n\n.complete-item {\n  color: var(--mainGrey);\n}\n\n.complete-item:hover {\n  color: var(--mainGrey);\n}\n\n.edit-item {\n  color: var(--mainBlue);\n}\n\n.edit-item:hover {\n  color: var(--mainBlue);\n}\n\n.delete-item {\n  color: var(--mainRed);\n}\n\n.delete-item:hover {\n  color: var(--mainRed);\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n\n.visibility {\n  opacity: 0.5;\n}\n\n.showItem {\n  display: block;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL0l0ZW1SZXBvc2l0b3J5LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvSXRlbVNvcnRlci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIkl0ZW1SZXBvc2l0b3J5IiwidG9kb0l0ZW1zIiwibG9hZEl0ZW1zIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImdldEl0ZW0iLCJpdGVtSWQiLCJ0b2RvSXRlbSIsImZpbmQiLCJ0ZGkiLCJpZCIsIml0ZW1UZXh0IiwidGltZSIsIkRhdGUiLCJnZXRUaW1lIiwicHVzaCIsInRleHQiLCJjb21wbGV0ZWQiLCJzdG9yZUl0ZW1zIiwicmVtb3ZlSW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZmlsdGVyIiwidG9JbmRleCIsImZyb21JbmRleCIsIkl0ZW1Tb3J0ZXIiLCJpdGVtTGlzdCIsIml0ZW1SZXBvc2l0b3J5IiwiaXRlbUJlaW5nRHJhZ2dlZCIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFkZCIsInByZXZlbnREZWZhdWx0IiwiaXRlbUJlaW5nRHJhZ2dlZE92ZXIiLCJtb3VzZVZlcnRpY2FsUG9zaXRpb24iLCJjbGllbnRZIiwiaXRlbUJlaW5nRHJhZ2dlZE92ZXJSZWN0YW5nbGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtQmVpbmdEcmFnZ2VkT3ZlclZlcnRpY2FsQ2VudGVyIiwidG9wIiwiaGVpZ2h0IiwiYmVmb3JlIiwiYWZ0ZXIiLCJuZXdJbmRleCIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsImNoaWxkcmVuIiwibW92ZUl0ZW0iLCJyZW1vdmUiLCJjdXJyZW50RWRpdEl0ZW0iLCJmb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaXRlbUlucHV0IiwiaW5mb3JtIiwiY2xlYXJCdXR0b24iLCJzdWJtaXRCdXR0b24iLCJpdGVtU29ydGVyIiwicmVuZGVySXRlbXMiLCJpbm5lckhUTUwiLCJnZXRJdGVtcyIsImZvckVhY2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJlbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiaXRlbURyYWdTdGFydCIsIml0ZW1EcmFnT3ZlciIsIml0ZW1EcmFnRW5kIiwidmFsdWUiLCJ0cmltIiwic2V0VGltZW91dCIsInVwZGF0ZUl0ZW0iLCJpbm5lclRleHQiLCJhZGRJdGVtIiwicmVtb3ZlQ29tcGxldGVkSXRlbXMiLCJ0YXJnZXRDbGFzc2VzIiwiZ2V0SXRlbUlkIiwiY2xvc2VzdCIsImNvbXBsZXRlSXRlbSIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxjO0FBQ25CLDRCQUFjO0FBQUE7O0FBQ1osU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLFNBQUw7QUFDRDs7OztXQUVELHNCQUFhO0FBQ1hD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LCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudG9kb0l0ZW1zID0gW107XG4gICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgfVxuXG4gIHN0b3JlSXRlbXMoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb0l0ZW1zKSk7XG4gIH1cblxuICBsb2FkSXRlbXMoKSB7XG4gICAgdGhpcy50b2RvSXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvSXRlbXMnKSB8fCAnW10nKTtcbiAgfVxuXG4gIGdldEl0ZW0oaXRlbUlkKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLnRvZG9JdGVtcy5maW5kKCh0ZGkpID0+IHRkaS5pZCA9PT0gaXRlbUlkKTtcbiAgICByZXR1cm4gdG9kb0l0ZW07XG4gIH1cblxuICBnZXRJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvSXRlbXM7XG4gIH1cblxuICBhZGRJdGVtKGl0ZW1UZXh0KSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMudG9kb0l0ZW1zLnB1c2goe1xuICAgICAgaWQ6IGAke3RpbWV9YCxcbiAgICAgIHRleHQ6IGl0ZW1UZXh0LFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIGNvbXBsZXRlSXRlbShpdGVtSWQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZ2V0SXRlbShpdGVtSWQpO1xuICAgIHRvZG9JdGVtLmNvbXBsZXRlZCA9ICF0b2RvSXRlbS5jb21wbGV0ZWQ7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgY29uc3QgcmVtb3ZlSW5kZXggPSAodGhpcy50b2RvSXRlbXMuaW5kZXhPZih0b2RvSXRlbSkpO1xuICAgIHRoaXMudG9kb0l0ZW1zLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICByZW1vdmVDb21wbGV0ZWRJdGVtcygpIHtcbiAgICB0aGlzLnRvZG9JdGVtcyA9IHRoaXMudG9kb0l0ZW1zLmZpbHRlcigodGRpKSA9PiAhdGRpLmNvbXBsZXRlZCk7XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICB1cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbVRleHQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZ2V0SXRlbShpdGVtSWQpO1xuICAgIHRvZG9JdGVtLnRleHQgPSBpdGVtVGV4dDtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIG1vdmVJdGVtKGl0ZW1JZCwgdG9JbmRleCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy50b2RvSXRlbXMuaW5kZXhPZih0b2RvSXRlbSk7IC8vIGZpbmQgY3VycmVudCBpbmRleFxuICAgIHRoaXMudG9kb0l0ZW1zLnNwbGljZShmcm9tSW5kZXgsIDEpOyAvLyByZW1vdmUgZnJvbSBjdXJyZW50IGluZGV4XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKHRvSW5kZXgsIDAsIHRvZG9JdGVtKTsgLy8gYWRkIHRvIG5ldyBpbmRleFxuICAgIHRoaXMuc3RvcmVJdGVtcygpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNvcnRlciB7XG4gIGNvbnN0cnVjdG9yKGl0ZW1MaXN0LCBpdGVtUmVwb3NpdG9yeSkge1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gICAgdGhpcy5pdGVtTGlzdCA9IGl0ZW1MaXN0O1xuICAgIHRoaXMuaXRlbVJlcG9zaXRvcnkgPSBpdGVtUmVwb3NpdG9yeTtcbiAgfVxuXG4gIGl0ZW1EcmFnU3RhcnQoZSkge1xuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpdGVtJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQgPSBlLnRhcmdldDtcbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGl0ZW1EcmFnT3ZlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCF0aGlzLml0ZW1CZWluZ0RyYWdnZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaXRlbScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXIgPSBlLnRhcmdldDtcblxuICAgIGlmICh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQgPT09IGl0ZW1CZWluZ0RyYWdnZWRPdmVyLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW91c2VWZXJ0aWNhbFBvc2l0aW9uID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlID0gaXRlbUJlaW5nRHJhZ2dlZE92ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXJWZXJ0aWNhbENlbnRlciA9IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLnRvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLmhlaWdodCAvIDIpO1xuXG4gICAgaWYgKG1vdXNlVmVydGljYWxQb3NpdGlvbiA8PSBpdGVtQmVpbmdEcmFnZ2VkT3ZlclZlcnRpY2FsQ2VudGVyKSB7XG4gICAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuYmVmb3JlKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkLmFmdGVyKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgaXRlbURyYWdFbmQoZSkge1xuICAgIGlmICghdGhpcy5pdGVtQmVpbmdEcmFnZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3SW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuaXRlbUxpc3QuY2hpbGRyZW4sIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCk7XG4gICAgdGhpcy5pdGVtUmVwb3NpdG9yeS5tb3ZlSXRlbSh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQsIG5ld0luZGV4KTtcblxuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IGNzcyBmcm9tICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaHRtbCBmcm9tICcuL2luZGV4Lmh0bWwnO1xuaW1wb3J0IEl0ZW1SZXBvc2l0b3J5IGZyb20gJy4vSXRlbVJlcG9zaXRvcnkuanMnO1xuaW1wb3J0IEl0ZW1Tb3J0ZXIgZnJvbSAnLi9JdGVtU29ydGVyLmpzJztcblxuLy8gZGVjbGFyYXRpb25zIGFuZFxubGV0IGN1cnJlbnRFZGl0SXRlbSA9IG51bGw7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1Gb3JtJyk7IC8vIHNlbGVjdCB0aGUgZm9ybVxuY29uc3QgaXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1JbnB1dCcpOyAvLyBzZWxlY3QgdGhlIGlucHV0IGJveCBmcm9tIHRoZSBmb3JtXG5jb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWxpc3QnKTtcbmNvbnN0IGluZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvcm0nKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLWxpc3QnKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXRCdXR0b24nKTtcblxuY29uc3QgaXRlbVJlcG9zaXRvcnkgPSBuZXcgSXRlbVJlcG9zaXRvcnkoKTtcbmNvbnN0IGl0ZW1Tb3J0ZXIgPSBuZXcgSXRlbVNvcnRlcihpdGVtTGlzdCwgaXRlbVJlcG9zaXRvcnkpO1xuXG5jb25zdCByZW5kZXJJdGVtcyA9ICgpID0+IHtcbiAgLy8gY2xlYXIgaXRlbXMgSFRNTFxuICBpdGVtTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAvLyBnZW5lcmF0ZSBpdGVtcyBIVE1MXG4gIGl0ZW1SZXBvc2l0b3J5LmdldEl0ZW1zKCkuZm9yRWFjaCgodG9kb0l0ZW0pID0+IHtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSB0b2RvSXRlbS5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnO1xuICAgIGl0ZW1MaXN0Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtXCIgIGlkPVwiJHt0b2RvSXRlbS5pZH1cIiBkcmFnZ2FibGU9XCJ0cnVlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pY29uc1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLXNxdWFyZSBjb21wbGV0ZS1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1lZGl0IGVkaXQtaXRlbSBpdGVtLWljb25cIj48L2k+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoNSBjbGFzcz1cIml0ZW0tbmFtZSB0ZXh0LWNhcGl0YWxpemUgJHtjb21wbGV0ZWR9XCI+JHt0b2RvSXRlbS50ZXh0fTwvaDU+ICAgXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWVsbGlwc2lzLXZcIj48L2k+ICAgICBcbiAgICAgIDwvZGl2PmAsXG4gICAgKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9kb0l0ZW0uaWQpO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IGl0ZW1Tb3J0ZXIuaXRlbURyYWdTdGFydChlKSk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiBpdGVtU29ydGVyLml0ZW1EcmFnT3ZlcihlKSk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IGl0ZW1Tb3J0ZXIuaXRlbURyYWdFbmQoZSkpO1xuICB9KTtcbn07XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gYWRkL2VkaXQgYSBsaXN0IGl0ZW1cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIGNvbGxlY3QgaW5wdXQgYXNuZCBjbGVhciB0ZXh0Ym94XG4gIGNvbnN0IGl0ZW1UZXh0ID0gaXRlbUlucHV0LnZhbHVlO1xuXG4gIC8vIHZhbGlkYXRlXG4gIGlmICghaXRlbVRleHQgfHwgIWl0ZW1UZXh0LnRyaW0oKSkge1xuICAgIGluZm9ybS5pbm5lckhUTUwgPSAnRW50ZXIgYSB2YWxpZCB0byBkbyc7XG4gICAgaW5mb3JtLmNsYXNzTGlzdC5hZGQoJ3Nob3dJdGVtJywgJ2FsZXJ0LWRhbmdlcicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5mb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dJdGVtJyk7XG4gICAgfSwgMzAwMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gYWRkL2VkaXRcbiAgaWYgKGN1cnJlbnRFZGl0SXRlbSkge1xuICAgIGl0ZW1SZXBvc2l0b3J5LnVwZGF0ZUl0ZW0oY3VycmVudEVkaXRJdGVtLmlkLCBpdGVtVGV4dCk7XG4gICAgY3VycmVudEVkaXRJdGVtID0gbnVsbDtcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0FkZCc7XG4gICAgcmVuZGVySXRlbXMoKTtcbiAgfSBlbHNlIHtcbiAgICBpdGVtUmVwb3NpdG9yeS5hZGRJdGVtKGl0ZW1UZXh0KTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9XG5cbiAgLy8gY2xlYXIgaW5wdXQgdGV4dFxuICBpdGVtSW5wdXQudmFsdWUgPSAnJztcbn0pO1xuXG4vLyBldmVudCBoYW5kbGVyIHRvIGNsZWFyIGl0ZW1zXG5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgaXRlbVJlcG9zaXRvcnkucmVtb3ZlQ29tcGxldGVkSXRlbXMoKTtcbiAgcmVuZGVySXRlbXMoKTtcbn0pO1xuXG4vLyBldmVudCBoYW5kbGVyIHRvIGNvbXBsZXRlLCBlZGl0IGFuZCBkZWxldGVcbml0ZW1MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIGRlY2lkZSB3aGljaCBvZiBvdXIgYWN0aW9uIGJ1dHRvbiB3ZXJlIGNsaWNrZWQgKGlmIGFueSlcbiAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcbiAgY29uc3QgZ2V0SXRlbUlkID0gKCkgPT4gZS50YXJnZXQuY2xvc2VzdCgnZGl2Lml0ZW0nKS5pZDtcblxuICAvLyBjb21wbGV0ZS9lZGl0L2RlbGV0ZVxuICBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnY29tcGxldGUtaXRlbScpKSB7XG4gICAgaXRlbVJlcG9zaXRvcnkuY29tcGxldGVJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuY29udGFpbnMoJ2VkaXQtaXRlbScpKSB7XG4gICAgY3VycmVudEVkaXRJdGVtID0gaXRlbVJlcG9zaXRvcnkuZ2V0SXRlbShnZXRJdGVtSWQoKSk7XG4gICAgaXRlbUlucHV0LnZhbHVlID0gY3VycmVudEVkaXRJdGVtLnRleHQ7XG4gICAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdFZGl0JztcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuY29udGFpbnMoJ2RlbGV0ZS1pdGVtJykpIHtcbiAgICBpdGVtUmVwb3NpdG9yeS5yZW1vdmVJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICByZW5kZXJJdGVtcygpO1xuICB9XG59KTtcblxucmVuZGVySXRlbXMoKTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tbWFpbldoaXRlOiAjZjVmNWY1O1xcbiAgLS1tYWluR3JleTogIzAwMDtcXG4gIC0tbWFpbkJsYWNrOiAjMzMzO1xcbiAgLS1tYWluUmVkOiAjZDYyODI4O1xcbiAgLS1tYWluQmx1ZTogIzExYjVlNDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1tYWluV2hpdGUpO1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogI2U2ZWZlZjtcXG59XFxuXFxuLmhlYWRpbmcge1xcbiAgY29sb3I6ICMwMDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBwYWRkaW5nLXRvcDogMzBweDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLmhvbGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHdpZHRoOiA2MCU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggIzMzMztcXG59XFxuXFxuLmJ0bi1ncmV5IHtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tbWFpbkdyZXkpO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogdmFyKC0tbWFpbkdyZXkpO1xcbn1cXG5cXG4uYnRuLWdyZXk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tbWFpbkdyZXkpO1xcbiAgY29sb3I6IHZhcigtLW1haW5CbGFjayk7XFxufVxcblxcbi5mb3JtLWNvbnRyb2wge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tYWluR3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmZlZWRiYWNrIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLml0ZW0tbmFtZSB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjdXJzb3I6IGdyYWI7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nLXRvcDogOHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDhweDtcXG59XFxuXFxuLml0ZW0gaDUge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uaXRlbS5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3dncmVlbjtcXG59XFxuXFxuLml0ZW0uZHJhZ292ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmRyYWdnaW5nLXBvaW50ZXIge1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBib3JkZXI6IDFweCBkYXNoZWQgZ3JheTtcXG59XFxuXFxuLml0ZW0taWNvbiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXBsZXRlLWl0ZW0ge1xcbiAgY29sb3I6IHZhcigtLW1haW5HcmV5KTtcXG59XFxuXFxuLmNvbXBsZXRlLWl0ZW06aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLW1haW5HcmV5KTtcXG59XFxuXFxuLmVkaXQtaXRlbSB7XFxuICBjb2xvcjogdmFyKC0tbWFpbkJsdWUpO1xcbn1cXG5cXG4uZWRpdC1pdGVtOmhvdmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1tYWluQmx1ZSk7XFxufVxcblxcbi5kZWxldGUtaXRlbSB7XFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxufVxcblxcbi5kZWxldGUtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxufVxcblxcbi5jb21wbGV0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi52aXNpYmlsaXR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLnNob3dJdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsdUJBQXVCO0VBQ3ZCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsWUFBWTtFQUNaLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0tbWFpbldoaXRlOiAjZjVmNWY1O1xcbiAgLS1tYWluR3JleTogIzAwMDtcXG4gIC0tbWFpbkJsYWNrOiAjMzMzO1xcbiAgLS1tYWluUmVkOiAjZDYyODI4O1xcbiAgLS1tYWluQmx1ZTogIzExYjVlNDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1tYWluV2hpdGUpO1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogI2U2ZWZlZjtcXG59XFxuXFxuLmhlYWRpbmcge1xcbiAgY29sb3I6ICMwMDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBwYWRkaW5nLXRvcDogMzBweDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLmhvbGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHdpZHRoOiA2MCU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggIzMzMztcXG59XFxuXFxuLmJ0bi1ncmV5IHtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tbWFpbkdyZXkpO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogdmFyKC0tbWFpbkdyZXkpO1xcbn1cXG5cXG4uYnRuLWdyZXk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tbWFpbkdyZXkpO1xcbiAgY29sb3I6IHZhcigtLW1haW5CbGFjayk7XFxufVxcblxcbi5mb3JtLWNvbnRyb2wge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tYWluR3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmZlZWRiYWNrIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLml0ZW0tbmFtZSB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjdXJzb3I6IGdyYWI7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nLXRvcDogOHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDhweDtcXG59XFxuXFxuLml0ZW0gaDUge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uaXRlbS5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3dncmVlbjtcXG59XFxuXFxuLml0ZW0uZHJhZ292ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmRyYWdnaW5nLXBvaW50ZXIge1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBib3JkZXI6IDFweCBkYXNoZWQgZ3JheTtcXG59XFxuXFxuLml0ZW0taWNvbiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXBsZXRlLWl0ZW0ge1xcbiAgY29sb3I6IHZhcigtLW1haW5HcmV5KTtcXG59XFxuXFxuLmNvbXBsZXRlLWl0ZW06aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLW1haW5HcmV5KTtcXG59XFxuXFxuLmVkaXQtaXRlbSB7XFxuICBjb2xvcjogdmFyKC0tbWFpbkJsdWUpO1xcbn1cXG5cXG4uZWRpdC1pdGVtOmhvdmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1tYWluQmx1ZSk7XFxufVxcblxcbi5kZWxldGUtaXRlbSB7XFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxufVxcblxcbi5kZWxldGUtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxufVxcblxcbi5jb21wbGV0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi52aXNpYmlsaXR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLnNob3dJdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyICYmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl0pOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vc3R5bGUuY3NzXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbmRleC5qc1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBjb2RlID0gXCI8IURPQ1RZUEUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuXFxuPGhlYWQ+XFxuICA8bWV0YSBjaGFyc2V0PVxcXCJVVEYtOFxcXCI+XFxuICA8bWV0YSBodHRwLWVxdWl2PVxcXCJYLVVBLUNvbXBhdGlibGVcXFwiIGNvbnRlbnQ9XFxcIklFPWVkZ2VcXFwiPlxcbiAgPG1ldGEgbmFtZT1cXFwidmlld3BvcnRcXFwiIGNvbnRlbnQ9XFxcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcXFwiPlxcbiAgPHRpdGxlPlRoZSBUb2RvIExpc3Q8L3RpdGxlPlxcbiAgPGxpbmsgcmVsPVxcXCJwcmVjb25uZWN0XFxcIiBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXFxcIj5cXG4gIDxsaW5rIHJlbD1cXFwicHJlY29ubmVjdFxcXCIgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVxcXCIgY3Jvc3NvcmlnaW4+XFxuICA8bGluayBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxhdG8mZGlzcGxheT1zd2FwXFxcIiByZWw9XFxcInN0eWxlc2hlZXRcXFwiPlxcbiAgPGxpbmsgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIiBocmVmPVxcXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNS4xNS4zL2Nzcy9hbGwubWluLmNzc1xcXCJcXG4gICAgaW50ZWdyaXR5PVxcXCJzaGE1MTItaUJCWG04Zlc5MCtudUxjU0tsYm1yUGNMYTBPVDkyeE8xQklzWit5d0RXWkN2cXNXZ2NjVjNnRm9SQnYweis4ZExKZ3lBSEloUjM1VlpjMm9NL2dJMXc9PVxcXCJcXG4gICAgY3Jvc3NvcmlnaW49XFxcImFub255bW91c1xcXCIgcmVmZXJyZXJwb2xpY3k9XFxcIm5vLXJlZmVycmVyXFxcIiAvPlxcbiAgPGxpbmsgaHJlZj1cXFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANS4wLjIvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcXFwiIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgaW50ZWdyaXR5PVxcXCJzaGEzODQtRVZTVFFOMy9henByRzFBbm0zUURncEpMSW05TmFvMFl6MXp0Y1FUd0ZzcGQzeUQ2NVZvaGhwdXVDT21MQVNqQ1xcXCIgY3Jvc3NvcmlnaW49XFxcImFub255bW91c1xcXCI+XFxuICA8bGluayByZWw9XFxcInN0eWxlc2hlZXRcXFwiIGhyZWY9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyArIFwiXFxcIj5cXG48L2hlYWQ+XFxuPGhlYWRlcj5cXG4gIDxoMyBjbGFzcz1cXFwidGl0bGVcXFwiPlRoZSB0b2RvIExpc3Q8L2gzPlxcbjwvaGVhZGVyPlxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lciBob2xkXFxcIj5cXG4gIDxoMyBjbGFzcz1cXFwidGV4dC1jZW50ZXIgaGVhZGluZ1xcXCI+VG9kYXkgVG9kbyBMaXN0PC9oMz5cXG4gIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbCBteC1hdXRvIGNvbC1tZC04IG10LTMgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IHRleHQtY2FwaXRhbGl6ZSBoZWFkaW5nIGZlZWRiYWNrXFxcIj5cXG4gICAgICAgIFRvZGF5cyBUb2RvIExpc3RcXG4gICAgICA8L2Rpdj5cXG4gICAgICA8IS0tIGZvcm0gLS0+XFxuICAgICAgPGZvcm0gaWQ9XFxcIml0ZW1Gb3JtXFxcIiBjbGFzcz1cXFwibXktM1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cFxcXCI+XFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcIml0ZW1JbnB1dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkFkZCB0byB5b3VyIGxpc3QuLi5cXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hcHBlbmRcXFwiPlxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdEJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JleSB0ZXh0LWNhcGl0YWxpemVcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+YWRkPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9mb3JtPlxcbiAgICAgIDwhLS0gZW5kIG9mIGZvcm0gIC0tPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0tbGlzdCBteS01XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JleSBteS0zIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcImNsZWFyLWxpc3RcXFwiPmNsZWFyIGFsbFxcbiAgICAgICAgY29tcGxldGVkPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPHNjcmlwdCBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIj48L3NjcmlwdD5cXG48L2JvZHk+XFxuPC9odG1sPlwiO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGUsIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICBpZiAob3B0aW9ucy5tYXliZU5lZWRRdW90ZXMgJiYgL1tcXHRcXG5cXGZcXHIgXCInPTw+YF0vLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKHN0eWxlLCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIHJldHVybiBzdHlsZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlKSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKFwibWVkaWFcIik7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGUsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlKSB7XG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9