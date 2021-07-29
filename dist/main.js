/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _ItemSorter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemSorter.js */ "./src/ItemSorter.js");
/* harmony import */ var _ItemRepository_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemRepository.js */ "./src/ItemRepository.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-unused-vars */



var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.currentEditItem = null;
    this.form = document.querySelector('#itemForm'); // select the form

    this.itemInput = document.querySelector('#itemInput'); // select the input box from the form

    this.itemList = document.querySelector('.item-list');
    this.inform = document.querySelector('.inform');
    this.clearButton = document.querySelector('#clear-list');
    this.submitButton = document.querySelector('#submitButton');
    this.itemRepository = new _ItemRepository_js__WEBPACK_IMPORTED_MODULE_1__.default();
    this.itemSorter = new _ItemSorter_js__WEBPACK_IMPORTED_MODULE_0__.default(this.itemList, this.itemRepository);
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var _this = this;

      // event handler to add/edit a list item
      this.form.addEventListener('submit', function (e) {
        e.preventDefault(); // collect input asnd clear textbox

        var itemText = _this.itemInput.value; // validate

        if (!itemText || !itemText.trim()) {
          _this.inform.innerHTML = 'Enter a valid to do';

          _this.inform.classList.add('showItem', 'alert-danger');

          setTimeout(function () {
            _this.inform.classList.remove('showItem');
          }, 3000);
          return;
        } // add/edit


        if (_this.currentEditItem) {
          _this.itemRepository.updateItem(_this.currentEditItem.id, itemText);

          _this.currentEditItem = null;
          _this.submitButton.innerText = 'Add';

          _this.renderItems();
        } else {
          _this.itemRepository.addItem(itemText);

          _this.renderItems();
        } // clear input text


        _this.itemInput.value = '';
      }); // event handler to clear items

      this.clearButton.addEventListener('click', function (e) {
        e.preventDefault();

        _this.itemRepository.removeCompletedItems();

        _this.renderItems();
      }); // event handler to complete, edit and delete

      this.itemList.addEventListener('click', function (e) {
        e.preventDefault(); // decide which of our action button were clicked (if any)

        var targetClasses = e.target.classList;

        var getItemId = function getItemId() {
          return e.target.closest('div.item').id;
        }; // complete/edit/delete


        if (targetClasses.contains('complete-item')) {
          _this.itemRepository.completeItem(getItemId());

          _this.renderItems();
        } else if (targetClasses.contains('edit-item')) {
          _this.currentEditItem = _this.itemRepository.getItem(getItemId());
          _this.itemInput.value = _this.currentEditItem.text;
          _this.submitButton.innerText = 'Edit';

          _this.renderItems();
        } else if (targetClasses.contains('delete-item')) {
          _this.itemRepository.removeItem(getItemId());

          _this.renderItems();
        }
      });
      this.renderItems();
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      // clear items HTML
      this.itemList.innerHTML = ''; // generate items HTML

      this.itemRepository.getItems().forEach(function (todoItem) {
        var completed = todoItem.completed ? 'completed' : '';

        _this2.itemList.insertAdjacentHTML('beforeend', "<div class=\"item\" id=\"".concat(todoItem.id, "\" draggable=\"true\">\n          <div class=\"item-icons\">\n            <i class=\"far fa-check-square complete-item item-icon\"></i>\n            <i class=\"far fa-edit edit-item item-icon\"></i>\n            <i class=\"far fa-times-circle delete-item item-icon\"></i>\n          </div>\n          <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>\n          <i class=\"fas fa-ellipsis-v\"></i>\n        </div>"));

        var element = document.getElementById(todoItem.id);
        element.addEventListener('dragstart', function (e) {
          return _this2.itemSorter.itemDragStart(e);
        });
        element.addEventListener('dragover', function (e) {
          return _this2.itemSorter.itemDragOver(e);
        });
        element.addEventListener('dragend', function (e) {
          return _this2.itemSorter.itemDragEnd(e);
        });
      });
    }
  }]);

  return App;
}();



/***/ }),

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
      var itemId = time.toString();
      this.todoItems.push({
        id: itemId,
        text: itemText,
        completed: false
      });
      this.storeItems();
      return itemId;
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
    key: "removeAllItems",
    value: function removeAllItems() {
      this.todoItems = [];
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.title {\n  color: #e6efef;\n}\n\n.heading {\n  color: #000;\n  font-size: 18px;\n  padding-top: 30px;\n  font-style: italic;\n}\n\n.hold {\n  border: 1px solid;\n  margin: 0 auto;\n  width: 60%;\n  align-items: center;\n  border-radius: 3px;\n  box-shadow: 5px 10px #333;\n}\n\n.btn-grey {\n  border-color: #000;\n  background: transparent;\n  color: #000;\n}\n\n.btn-grey:hover {\n  background: #000;\n  color: #333;\n}\n\n.form-control {\n  border-color: #000 !important;\n}\n\n.feedback {\n  display: none;\n  color: #000;\n}\n\n.item-name {\n  margin-left: 0;\n  align-content: flex-start;\n}\n\n.item {\n  display: flex;\n  justify-content: space-between;\n  cursor: grab;\n  margin: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.item h5 {\n  margin: 0;\n  width: 70%;\n  text-align: left;\n  text-decoration: none;\n}\n\n.item.dragging {\n  opacity: 0.5;\n  background-color: yellowgreen;\n}\n\n.item.dragover {\n  background-color: #11b5e4;\n}\n\n.dragging-pointer {\n  height: 1px;\n  border: 1px dashed gray;\n}\n\n.item-icon {\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n\n.complete-item {\n  color: #000;\n}\n\n.complete-item:hover {\n  color: #000;\n}\n\n.edit-item {\n  color: #11b5e4;\n}\n\n.edit-item:hover {\n  color: #11b5e4;\n}\n\n.delete-item {\n  color: #d62828;\n}\n\n.delete-item:hover {\n  color: #d62828;\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n\n.visibility {\n  opacity: 0.5;\n}\n\n.showItem {\n  display: block;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,SAAS;EACT,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;AAChB","sourcesContent":["body {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.title {\n  color: #e6efef;\n}\n\n.heading {\n  color: #000;\n  font-size: 18px;\n  padding-top: 30px;\n  font-style: italic;\n}\n\n.hold {\n  border: 1px solid;\n  margin: 0 auto;\n  width: 60%;\n  align-items: center;\n  border-radius: 3px;\n  box-shadow: 5px 10px #333;\n}\n\n.btn-grey {\n  border-color: #000;\n  background: transparent;\n  color: #000;\n}\n\n.btn-grey:hover {\n  background: #000;\n  color: #333;\n}\n\n.form-control {\n  border-color: #000 !important;\n}\n\n.feedback {\n  display: none;\n  color: #000;\n}\n\n.item-name {\n  margin-left: 0;\n  align-content: flex-start;\n}\n\n.item {\n  display: flex;\n  justify-content: space-between;\n  cursor: grab;\n  margin: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.item h5 {\n  margin: 0;\n  width: 70%;\n  text-align: left;\n  text-decoration: none;\n}\n\n.item.dragging {\n  opacity: 0.5;\n  background-color: yellowgreen;\n}\n\n.item.dragover {\n  background-color: #11b5e4;\n}\n\n.dragging-pointer {\n  height: 1px;\n  border: 1px dashed gray;\n}\n\n.item-icon {\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n\n.complete-item {\n  color: #000;\n}\n\n.complete-item:hover {\n  color: #000;\n}\n\n.edit-item {\n  color: #11b5e4;\n}\n\n.edit-item:hover {\n  color: #11b5e4;\n}\n\n.delete-item {\n  color: #d62828;\n}\n\n.delete-item:hover {\n  color: #d62828;\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n\n.visibility {\n  opacity: 0.5;\n}\n\n.showItem {\n  display: block;\n}\n"],"sourceRoot":""}]);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.js */ "./src/App.js");


var app = new _App_js__WEBPACK_IMPORTED_MODULE_1__.default();
app.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUEsSUFBTWlCLEdBQUcsR0FBRyxJQUFJdkYsNENBQUosRUFBWjtBQUNBdUYsR0FBRyxDQUFDQyxJQUFKLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL0l0ZW1SZXBvc2l0b3J5LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvSXRlbVNvcnRlci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCBJdGVtU29ydGVyIGZyb20gJy4vSXRlbVNvcnRlci5qcyc7XG5pbXBvcnQgSXRlbVJlcG9zaXRvcnkgZnJvbSAnLi9JdGVtUmVwb3NpdG9yeS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudEVkaXRJdGVtID0gbnVsbDtcblxuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpdGVtRm9ybScpOyAvLyBzZWxlY3QgdGhlIGZvcm1cbiAgICB0aGlzLml0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpdGVtSW5wdXQnKTsgLy8gc2VsZWN0IHRoZSBpbnB1dCBib3ggZnJvbSB0aGUgZm9ybVxuICAgIHRoaXMuaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXRlbS1saXN0Jyk7XG4gICAgdGhpcy5pbmZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb3JtJyk7XG4gICAgdGhpcy5jbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGVhci1saXN0Jyk7XG4gICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0QnV0dG9uJyk7XG5cbiAgICB0aGlzLml0ZW1SZXBvc2l0b3J5ID0gbmV3IEl0ZW1SZXBvc2l0b3J5KCk7XG4gICAgdGhpcy5pdGVtU29ydGVyID0gbmV3IEl0ZW1Tb3J0ZXIodGhpcy5pdGVtTGlzdCwgdGhpcy5pdGVtUmVwb3NpdG9yeSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIGV2ZW50IGhhbmRsZXIgdG8gYWRkL2VkaXQgYSBsaXN0IGl0ZW1cbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gY29sbGVjdCBpbnB1dCBhc25kIGNsZWFyIHRleHRib3hcbiAgICAgIGNvbnN0IGl0ZW1UZXh0ID0gdGhpcy5pdGVtSW5wdXQudmFsdWU7XG5cbiAgICAgIC8vIHZhbGlkYXRlXG4gICAgICBpZiAoIWl0ZW1UZXh0IHx8ICFpdGVtVGV4dC50cmltKCkpIHtcbiAgICAgICAgdGhpcy5pbmZvcm0uaW5uZXJIVE1MID0gJ0VudGVyIGEgdmFsaWQgdG8gZG8nO1xuICAgICAgICB0aGlzLmluZm9ybS5jbGFzc0xpc3QuYWRkKCdzaG93SXRlbScsICdhbGVydC1kYW5nZXInKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvd0l0ZW0nKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkL2VkaXRcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRFZGl0SXRlbSkge1xuICAgICAgICB0aGlzLml0ZW1SZXBvc2l0b3J5LnVwZGF0ZUl0ZW0odGhpcy5jdXJyZW50RWRpdEl0ZW0uaWQsIGl0ZW1UZXh0KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RWRpdEl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkJztcbiAgICAgICAgdGhpcy5yZW5kZXJJdGVtcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVtUmVwb3NpdG9yeS5hZGRJdGVtKGl0ZW1UZXh0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJJdGVtcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciBpbnB1dCB0ZXh0XG4gICAgICB0aGlzLml0ZW1JbnB1dC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnQgaGFuZGxlciB0byBjbGVhciBpdGVtc1xuICAgIHRoaXMuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5pdGVtUmVwb3NpdG9yeS5yZW1vdmVDb21wbGV0ZWRJdGVtcygpO1xuICAgICAgdGhpcy5yZW5kZXJJdGVtcygpO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnQgaGFuZGxlciB0byBjb21wbGV0ZSwgZWRpdCBhbmQgZGVsZXRlXG4gICAgdGhpcy5pdGVtTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIGRlY2lkZSB3aGljaCBvZiBvdXIgYWN0aW9uIGJ1dHRvbiB3ZXJlIGNsaWNrZWQgKGlmIGFueSlcbiAgICAgIGNvbnN0IHRhcmdldENsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBnZXRJdGVtSWQgPSAoKSA9PiBlLnRhcmdldC5jbG9zZXN0KCdkaXYuaXRlbScpLmlkO1xuXG4gICAgICAvLyBjb21wbGV0ZS9lZGl0L2RlbGV0ZVxuICAgICAgaWYgKHRhcmdldENsYXNzZXMuY29udGFpbnMoJ2NvbXBsZXRlLWl0ZW0nKSkge1xuICAgICAgICB0aGlzLml0ZW1SZXBvc2l0b3J5LmNvbXBsZXRlSXRlbShnZXRJdGVtSWQoKSk7XG4gICAgICAgIHRoaXMucmVuZGVySXRlbXMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnZWRpdC1pdGVtJykpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RWRpdEl0ZW0gPSB0aGlzLml0ZW1SZXBvc2l0b3J5LmdldEl0ZW0oZ2V0SXRlbUlkKCkpO1xuICAgICAgICB0aGlzLml0ZW1JbnB1dC52YWx1ZSA9IHRoaXMuY3VycmVudEVkaXRJdGVtLnRleHQ7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdFZGl0JztcbiAgICAgICAgdGhpcy5yZW5kZXJJdGVtcygpO1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXRDbGFzc2VzLmNvbnRhaW5zKCdkZWxldGUtaXRlbScpKSB7XG4gICAgICAgIHRoaXMuaXRlbVJlcG9zaXRvcnkucmVtb3ZlSXRlbShnZXRJdGVtSWQoKSk7XG4gICAgICAgIHRoaXMucmVuZGVySXRlbXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVySXRlbXMoKTtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIC8vIGNsZWFyIGl0ZW1zIEhUTUxcbiAgICB0aGlzLml0ZW1MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgLy8gZ2VuZXJhdGUgaXRlbXMgSFRNTFxuICAgIHRoaXMuaXRlbVJlcG9zaXRvcnkuZ2V0SXRlbXMoKS5mb3JFYWNoKCh0b2RvSXRlbSkgPT4ge1xuICAgICAgY29uc3QgY29tcGxldGVkID0gdG9kb0l0ZW0uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJztcbiAgICAgIHRoaXMuaXRlbUxpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtXCIgaWQ9XCIke3RvZG9JdGVtLmlkfVwiIGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pY29uc1wiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stc3F1YXJlIGNvbXBsZXRlLWl0ZW0gaXRlbS1pY29uXCI+PC9pPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZWRpdCBlZGl0LWl0ZW0gaXRlbS1pY29uXCI+PC9pPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1pdGVtIGl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDUgY2xhc3M9XCJpdGVtLW5hbWUgdGV4dC1jYXBpdGFsaXplICR7Y29tcGxldGVkfVwiPiR7dG9kb0l0ZW0udGV4dH08L2g1PlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWVsbGlwc2lzLXZcIj48L2k+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgICApO1xuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvZG9JdGVtLmlkKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHRoaXMuaXRlbVNvcnRlci5pdGVtRHJhZ1N0YXJ0KGUpKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4gdGhpcy5pdGVtU29ydGVyLml0ZW1EcmFnT3ZlcihlKSk7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gdGhpcy5pdGVtU29ydGVyLml0ZW1EcmFnRW5kKGUpKTtcbiAgICB9KTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvSXRlbXMgPSBbXTtcbiAgICB0aGlzLmxvYWRJdGVtcygpO1xuICB9XG5cbiAgc3RvcmVJdGVtcygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvSXRlbXMpKTtcbiAgfVxuXG4gIGxvYWRJdGVtcygpIHtcbiAgICB0aGlzLnRvZG9JdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9JdGVtcycpIHx8ICdbXScpO1xuICB9XG5cbiAgZ2V0SXRlbShpdGVtSWQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMudG9kb0l0ZW1zLmZpbmQoKHRkaSkgPT4gdGRpLmlkID09PSBpdGVtSWQpO1xuICAgIHJldHVybiB0b2RvSXRlbTtcbiAgfVxuXG4gIGdldEl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9JdGVtcztcbiAgfVxuXG4gIGFkZEl0ZW0oaXRlbVRleHQpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgaXRlbUlkID0gdGltZS50b1N0cmluZygpO1xuICAgIHRoaXMudG9kb0l0ZW1zLnB1c2goe1xuICAgICAgaWQ6IGl0ZW1JZCxcbiAgICAgIHRleHQ6IGl0ZW1UZXh0LFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgICByZXR1cm4gaXRlbUlkO1xuICB9XG5cbiAgY29tcGxldGVJdGVtKGl0ZW1JZCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgdG9kb0l0ZW0uY29tcGxldGVkID0gIXRvZG9JdGVtLmNvbXBsZXRlZDtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmdldEl0ZW0oaXRlbUlkKTtcbiAgICBjb25zdCByZW1vdmVJbmRleCA9ICh0aGlzLnRvZG9JdGVtcy5pbmRleE9mKHRvZG9JdGVtKSk7XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKHJlbW92ZUluZGV4LCAxKTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHJlbW92ZUNvbXBsZXRlZEl0ZW1zKCkge1xuICAgIHRoaXMudG9kb0l0ZW1zID0gdGhpcy50b2RvSXRlbXMuZmlsdGVyKCh0ZGkpID0+ICF0ZGkuY29tcGxldGVkKTtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIHJlbW92ZUFsbEl0ZW1zKCkge1xuICAgIHRoaXMudG9kb0l0ZW1zID0gW107XG4gICAgdGhpcy5zdG9yZUl0ZW1zKCk7XG4gIH1cblxuICB1cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbVRleHQpIHtcbiAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZ2V0SXRlbShpdGVtSWQpO1xuICAgIHRvZG9JdGVtLnRleHQgPSBpdGVtVGV4dDtcbiAgICB0aGlzLnN0b3JlSXRlbXMoKTtcbiAgfVxuXG4gIG1vdmVJdGVtKGl0ZW1JZCwgdG9JbmRleCkge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1JZCk7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy50b2RvSXRlbXMuaW5kZXhPZih0b2RvSXRlbSk7IC8vIGZpbmQgY3VycmVudCBpbmRleFxuICAgIHRoaXMudG9kb0l0ZW1zLnNwbGljZShmcm9tSW5kZXgsIDEpOyAvLyByZW1vdmUgZnJvbSBjdXJyZW50IGluZGV4XG4gICAgdGhpcy50b2RvSXRlbXMuc3BsaWNlKHRvSW5kZXgsIDAsIHRvZG9JdGVtKTsgLy8gYWRkIHRvIG5ldyBpbmRleFxuICAgIHRoaXMuc3RvcmVJdGVtcygpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNvcnRlciB7XG4gIGNvbnN0cnVjdG9yKGl0ZW1MaXN0LCBpdGVtUmVwb3NpdG9yeSkge1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gICAgdGhpcy5pdGVtTGlzdCA9IGl0ZW1MaXN0O1xuICAgIHRoaXMuaXRlbVJlcG9zaXRvcnkgPSBpdGVtUmVwb3NpdG9yeTtcbiAgfVxuXG4gIGl0ZW1EcmFnU3RhcnQoZSkge1xuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpdGVtJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQgPSBlLnRhcmdldDtcbiAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGl0ZW1EcmFnT3ZlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCF0aGlzLml0ZW1CZWluZ0RyYWdnZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaXRlbScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXIgPSBlLnRhcmdldDtcblxuICAgIGlmICh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQgPT09IGl0ZW1CZWluZ0RyYWdnZWRPdmVyLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW91c2VWZXJ0aWNhbFBvc2l0aW9uID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlID0gaXRlbUJlaW5nRHJhZ2dlZE92ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaXRlbUJlaW5nRHJhZ2dlZE92ZXJWZXJ0aWNhbENlbnRlciA9IGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLnRvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKGl0ZW1CZWluZ0RyYWdnZWRPdmVyUmVjdGFuZ2xlLmhlaWdodCAvIDIpO1xuXG4gICAgaWYgKG1vdXNlVmVydGljYWxQb3NpdGlvbiA8PSBpdGVtQmVpbmdEcmFnZ2VkT3ZlclZlcnRpY2FsQ2VudGVyKSB7XG4gICAgICB0aGlzLml0ZW1CZWluZ0RyYWdnZWQuYmVmb3JlKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtQmVpbmdEcmFnZ2VkLmFmdGVyKGl0ZW1CZWluZ0RyYWdnZWRPdmVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgaXRlbURyYWdFbmQoZSkge1xuICAgIGlmICghdGhpcy5pdGVtQmVpbmdEcmFnZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3SW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuaXRlbUxpc3QuY2hpbGRyZW4sIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCk7XG4gICAgdGhpcy5pdGVtUmVwb3NpdG9yeS5tb3ZlSXRlbSh0aGlzLml0ZW1CZWluZ0RyYWdnZWQuaWQsIG5ld0luZGV4KTtcblxuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICAgIHRoaXMuaXRlbUJlaW5nRHJhZ2dlZCA9IG51bGw7XG4gIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgY29sb3I6ICNlNmVmZWY7XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIGNvbG9yOiAjMDAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgcGFkZGluZy10b3A6IDMwcHg7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi5ob2xkIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogNjAlO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGJveC1zaGFkb3c6IDVweCAxMHB4ICMzMzM7XFxufVxcblxcbi5idG4tZ3JleSB7XFxuICBib3JkZXItY29sb3I6ICMwMDA7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uYnRuLWdyZXk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzAwMDtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4uZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1jb2xvcjogIzAwMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZmVlZGJhY2sge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uaXRlbS1uYW1lIHtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLml0ZW0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4uaXRlbSBoNSB7XFxuICBtYXJnaW46IDA7XFxuICB3aWR0aDogNzAlO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuLml0ZW0uZHJhZ2dpbmcge1xcbiAgb3BhY2l0eTogMC41O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93Z3JlZW47XFxufVxcblxcbi5pdGVtLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMWI1ZTQ7XFxufVxcblxcbi5kcmFnZ2luZy1wb2ludGVyIHtcXG4gIGhlaWdodDogMXB4O1xcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGdyYXk7XFxufVxcblxcbi5pdGVtLWljb24ge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb21wbGV0ZS1pdGVtIHtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uY29tcGxldGUtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLmVkaXQtaXRlbSB7XFxuICBjb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmVkaXQtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmRlbGV0ZS1pdGVtIHtcXG4gIGNvbG9yOiAjZDYyODI4O1xcbn1cXG5cXG4uZGVsZXRlLWl0ZW06aG92ZXIge1xcbiAgY29sb3I6ICNkNjI4Mjg7XFxufVxcblxcbi5jb21wbGV0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi52aXNpYmlsaXR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLnNob3dJdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osU0FBUztFQUNULGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgY29sb3I6ICNlNmVmZWY7XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIGNvbG9yOiAjMDAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgcGFkZGluZy10b3A6IDMwcHg7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi5ob2xkIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogNjAlO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGJveC1zaGFkb3c6IDVweCAxMHB4ICMzMzM7XFxufVxcblxcbi5idG4tZ3JleSB7XFxuICBib3JkZXItY29sb3I6ICMwMDA7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uYnRuLWdyZXk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzAwMDtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4uZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1jb2xvcjogIzAwMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZmVlZGJhY2sge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uaXRlbS1uYW1lIHtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLml0ZW0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4uaXRlbSBoNSB7XFxuICBtYXJnaW46IDA7XFxuICB3aWR0aDogNzAlO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuLml0ZW0uZHJhZ2dpbmcge1xcbiAgb3BhY2l0eTogMC41O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93Z3JlZW47XFxufVxcblxcbi5pdGVtLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMWI1ZTQ7XFxufVxcblxcbi5kcmFnZ2luZy1wb2ludGVyIHtcXG4gIGhlaWdodDogMXB4O1xcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGdyYXk7XFxufVxcblxcbi5pdGVtLWljb24ge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb21wbGV0ZS1pdGVtIHtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uY29tcGxldGUtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLmVkaXQtaXRlbSB7XFxuICBjb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmVkaXQtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogIzExYjVlNDtcXG59XFxuXFxuLmRlbGV0ZS1pdGVtIHtcXG4gIGNvbG9yOiAjZDYyODI4O1xcbn1cXG5cXG4uZGVsZXRlLWl0ZW06aG92ZXIge1xcbiAgY29sb3I6ICNkNjI4Mjg7XFxufVxcblxcbi5jb21wbGV0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi52aXNpYmlsaXR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLnNob3dJdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyICYmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl0pOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoc3R5bGUsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGUpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoXCJtZWRpYVwiKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGUpIHtcbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qcyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5pbml0KCk7Il0sIm5hbWVzIjpbIkl0ZW1Tb3J0ZXIiLCJJdGVtUmVwb3NpdG9yeSIsIkFwcCIsImN1cnJlbnRFZGl0SXRlbSIsImZvcm0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpdGVtSW5wdXQiLCJpdGVtTGlzdCIsImluZm9ybSIsImNsZWFyQnV0dG9uIiwic3VibWl0QnV0dG9uIiwiaXRlbVJlcG9zaXRvcnkiLCJpdGVtU29ydGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIml0ZW1UZXh0IiwidmFsdWUiLCJ0cmltIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInVwZGF0ZUl0ZW0iLCJpZCIsImlubmVyVGV4dCIsInJlbmRlckl0ZW1zIiwiYWRkSXRlbSIsInJlbW92ZUNvbXBsZXRlZEl0ZW1zIiwidGFyZ2V0Q2xhc3NlcyIsInRhcmdldCIsImdldEl0ZW1JZCIsImNsb3Nlc3QiLCJjb250YWlucyIsImNvbXBsZXRlSXRlbSIsImdldEl0ZW0iLCJ0ZXh0IiwicmVtb3ZlSXRlbSIsImdldEl0ZW1zIiwiZm9yRWFjaCIsInRvZG9JdGVtIiwiY29tcGxldGVkIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiaXRlbURyYWdTdGFydCIsIml0ZW1EcmFnT3ZlciIsIml0ZW1EcmFnRW5kIiwidG9kb0l0ZW1zIiwibG9hZEl0ZW1zIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsIml0ZW1JZCIsImZpbmQiLCJ0ZGkiLCJ0aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJ0b1N0cmluZyIsInB1c2giLCJzdG9yZUl0ZW1zIiwicmVtb3ZlSW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZmlsdGVyIiwidG9JbmRleCIsImZyb21JbmRleCIsIml0ZW1CZWluZ0RyYWdnZWQiLCJpdGVtQmVpbmdEcmFnZ2VkT3ZlciIsIm1vdXNlVmVydGljYWxQb3NpdGlvbiIsImNsaWVudFkiLCJpdGVtQmVpbmdEcmFnZ2VkT3ZlclJlY3RhbmdsZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1CZWluZ0RyYWdnZWRPdmVyVmVydGljYWxDZW50ZXIiLCJ0b3AiLCJoZWlnaHQiLCJiZWZvcmUiLCJhZnRlciIsIm5ld0luZGV4IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiY2hpbGRyZW4iLCJtb3ZlSXRlbSIsImFwcCIsImluaXQiXSwic291cmNlUm9vdCI6IiJ9