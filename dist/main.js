/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* eslint-disable no-unused-vars */

/* eslint-disable func-names */

 // declarations and

var currentEditItem = null;
var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var submitButton = document.querySelector('#submitButton'); //-----------------------------------------------------------------------------------

var todoItems = [];

var storeItems = function storeItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

var loadItems = function loadItems() {
  todoItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
};

var getItem = function getItem(itemId) {
  var todoItem = todoItems.find(function (tdi) {
    return tdi.id === itemId;
  });
  return todoItem;
};

var addItem = function addItem(itemText) {
  var time = new Date().getTime();
  todoItems.push({
    id: "".concat(time),
    text: itemText,
    completed: false
  });
  storeItems();
};

var completeItem = function completeItem(itemId) {
  var todoItem = getItem(itemId);
  todoItem.completed = !todoItem.completed;
  storeItems();
};

var removeItem = function removeItem(itemId) {
  var todoItem = getItem(itemId);
  var removeIndex = todoItems.indexOf(todoItem);
  todoItems.splice(removeIndex, 1);
  storeItems();
};

var removeCompletedItems = function removeCompletedItems() {
  todoItems = todoItems.filter(function (tdi) {
    return !tdi.completed;
  });
  storeItems();
};

var updateItem = function updateItem(itemId, itemText) {
  var todoItem = getItem(itemId);
  todoItem.text = itemText;
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  storeItems();
};

loadItems(); //-----------------------------------------------------------------------------------

var itemDragStart = function itemDragStart(e) {
  e.preventDefault();
  console.log('itemDragStart');
};

var itemDragOver = function itemDragOver(e) {
  e.preventDefault();
  console.log('itemDragOver');
};

var itemDragEnd = function itemDragEnd(e) {
  e.preventDefault();
  console.log('itemDragEnd');
};

var renderItems = function renderItems() {
  // clear items HTML
  itemList.innerHTML = ''; // generate items HTML

  todoItems.forEach(function (todoItem) {
    var completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\"  id=\"".concat(todoItem.id, "\" draggable=\"true\">\n        <h5 class=\"item-name text-capitalize ").concat(completed, "\">").concat(todoItem.text, "</h5>\n        <div class=\"item-icons\">\n          <i class=\"far fa-check-circle complete-item item-icon\"></i>\n          <i class=\"far fa-edit edit-item item-icon\"></i>\n          <i class=\"far fa-times-circle delete-item item-icon\"></i>\n        </div>\n      </div>"));
    var element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', itemDragStart);
    element.addEventListener('dragover', itemDragOver);
    element.addEventListener('dragend', itemDragEnd);
    console.log(element);
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
    updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    addItem(itemText);
    renderItems();
  } // clear input text


  itemInput.value = '';
}); // event handler to clear items

clearButton.addEventListener('click', function (e) {
  e.preventDefault();
  removeCompletedItems();
  renderItems();
}); // event handler to complete, edit and delete

itemList.addEventListener('click', function (e) {
  e.preventDefault(); // decide which of our action button were clicked (if any)

  var targetClasses = e.target.classList;

  var getItemId = function getItemId() {
    return e.target.closest('div.item').id;
  }; // complete/edit/delete


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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --mainWhite: #f5f5f5;\r\n  --mainGreen: #000;\r\n  --mainBlack: #333;\r\n  --mainRed: #d62828;\r\n  --mainBlue: #11b5e4;\r\n}\r\n\r\nbody {\r\n  background: var(--mainWhite);\r\n  color: #333;\r\n}\r\n\r\n.hold {\r\n  border: 1px solid;\r\n  margin: 0 auto;\r\n  width: 60%;\r\n  align-items: center;\r\n  border-radius: 3px;\r\n  box-shadow: 5px 10px #333;\r\n}\r\n\r\n.btn-green {\r\n  border-color: var(--mainGreen);\r\n  background: transparent;\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.btn-green:hover {\r\n  background: var(--mainGreen);\r\n  color: var(--mainBlack);\r\n}\r\n\r\n.form-control {\r\n  border-color: var(--mainGreen) !important;\r\n}\r\n\r\n.feedback {\r\n  display: none;\r\n  color: #000;\r\n}\r\n\r\n.item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.item-icon {\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.complete-item {\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.complete-item:hover {\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.edit-item {\r\n  color: var(--mainBlue);\r\n}\r\n\r\n.edit-item:hover {\r\n  color: var(--mainBlue);\r\n}\r\n\r\n.delete-item {\r\n  color: var(--mainRed);\r\n}\r\n\r\n.delete-item:hover {\r\n  color: var(--mainRed);\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  opacity: 0.5;\r\n}\r\n\r\n.visibility {\r\n  opacity: 0.5;\r\n}\r\n\r\n.showItem {\r\n  display: block;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,8BAA8B;EAC9B,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA;EACE,4BAA4B;EAC5B,uBAAuB;AACzB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;AAChB","sourcesContent":[":root {\r\n  --mainWhite: #f5f5f5;\r\n  --mainGreen: #000;\r\n  --mainBlack: #333;\r\n  --mainRed: #d62828;\r\n  --mainBlue: #11b5e4;\r\n}\r\n\r\nbody {\r\n  background: var(--mainWhite);\r\n  color: #333;\r\n}\r\n\r\n.hold {\r\n  border: 1px solid;\r\n  margin: 0 auto;\r\n  width: 60%;\r\n  align-items: center;\r\n  border-radius: 3px;\r\n  box-shadow: 5px 10px #333;\r\n}\r\n\r\n.btn-green {\r\n  border-color: var(--mainGreen);\r\n  background: transparent;\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.btn-green:hover {\r\n  background: var(--mainGreen);\r\n  color: var(--mainBlack);\r\n}\r\n\r\n.form-control {\r\n  border-color: var(--mainGreen) !important;\r\n}\r\n\r\n.feedback {\r\n  display: none;\r\n  color: #000;\r\n}\r\n\r\n.item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.item-icon {\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.complete-item {\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.complete-item:hover {\r\n  color: var(--mainGreen);\r\n}\r\n\r\n.edit-item {\r\n  color: var(--mainBlue);\r\n}\r\n\r\n.edit-item:hover {\r\n  color: var(--mainBlue);\r\n}\r\n\r\n.delete-item {\r\n  color: var(--mainRed);\r\n}\r\n\r\n.delete-item:hover {\r\n  color: var(--mainRed);\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  opacity: 0.5;\r\n}\r\n\r\n.visibility {\r\n  opacity: 0.5;\r\n}\r\n\r\n.showItem {\r\n  display: block;\r\n}\r\n"],"sourceRoot":""}]);
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
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>The Todo List</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Lato&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"\n    integrity=\"sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==\"\n    crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC\" crossorigin=\"anonymous\">\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\n</head>\n\n<header>\n  <h3>The todo List</h3>\n</header>\n<main>\n  <div class=\"container hold\">\n    <h3 class=\"text-center\">Today todo List</h3>\n    <div class=\"row\">\n      <div class=\"col mx-auto col-md-8 mt-3 text-center\">\n        <div class=\"alert text-capitalize feedback\">\n          Todays Todo List\n        </div>\n        <!-- form -->\n        <form id=\"itemForm\" class=\"my-3\">\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control text-capitalize\" id=\"itemInput\" placeholder=\"Add to your list...\">\n            <div class=\"input-group-append\">\n              <button id=\"submitButton\" class=\"btn btn-green text-capitalize\" type=\"submit\">add</button>\n            </div>\n          </div>\n        </form>\n        <div class=\"item-container\">\n          <!-- end of form  -->\n          <div class=\"item-list my-5\">\n\n          </div>\n          <button type=\"button\" class=\"btn btn-green my-3 text-capitalize\" id=\"clear-list\">clear all\n            completed</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n<script src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"></script>\n</body>\n</html>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImN1cnJlbnRFZGl0SXRlbSIsImZvcm0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpdGVtSW5wdXQiLCJpdGVtTGlzdCIsImluZm9ybSIsImNsZWFyQnV0dG9uIiwic3VibWl0QnV0dG9uIiwidG9kb0l0ZW1zIiwic3RvcmVJdGVtcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZEl0ZW1zIiwicGFyc2UiLCJnZXRJdGVtIiwiaXRlbUlkIiwidG9kb0l0ZW0iLCJmaW5kIiwidGRpIiwiaWQiLCJhZGRJdGVtIiwiaXRlbVRleHQiLCJ0aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJwdXNoIiwidGV4dCIsImNvbXBsZXRlZCIsImNvbXBsZXRlSXRlbSIsInJlbW92ZUl0ZW0iLCJyZW1vdmVJbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJyZW1vdmVDb21wbGV0ZWRJdGVtcyIsImZpbHRlciIsInVwZGF0ZUl0ZW0iLCJpdGVtRHJhZ1N0YXJ0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsIml0ZW1EcmFnT3ZlciIsIml0ZW1EcmFnRW5kIiwicmVuZGVySXRlbXMiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwidHJpbSIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJpbm5lclRleHQiLCJ0YXJnZXRDbGFzc2VzIiwidGFyZ2V0IiwiZ2V0SXRlbUlkIiwiY2xvc2VzdCIsImNvbnRhaW5zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQUlBLGVBQWUsR0FBRyxJQUF0QjtBQUNBLElBQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQWIsQyxDQUFrRDs7QUFDbEQsSUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbEIsQyxDQUF3RDs7QUFDeEQsSUFBTUUsUUFBUSxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBakI7QUFDQSxJQUFNRyxNQUFNLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixDQUFmO0FBQ0EsSUFBTUksV0FBVyxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBcEI7QUFDQSxJQUFNSyxZQUFZLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixDQUFyQixDLENBRUE7O0FBRUEsSUFBSU0sU0FBUyxHQUFHLEVBQWhCOztBQUVBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQVk7QUFDN0JDLGNBQVksQ0FBQ0MsT0FBYixDQUFxQixXQUFyQixFQUFrQ0MsSUFBSSxDQUFDQyxTQUFMLENB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eEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSxvQjs7Ozs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLW5hbWVzICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi9pbmRleC5odG1sJztcblxuLy8gZGVjbGFyYXRpb25zIGFuZFxubGV0IGN1cnJlbnRFZGl0SXRlbSA9IG51bGw7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1Gb3JtJyk7IC8vIHNlbGVjdCB0aGUgZm9ybVxuY29uc3QgaXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1JbnB1dCcpOyAvLyBzZWxlY3QgdGhlIGlucHV0IGJveCBmcm9tIHRoZSBmb3JtXG5jb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWxpc3QnKTtcbmNvbnN0IGluZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvcm0nKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLWxpc3QnKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXRCdXR0b24nKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5sZXQgdG9kb0l0ZW1zID0gW107XG5cbmNvbnN0IHN0b3JlSXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5cbmNvbnN0IGxvYWRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgdG9kb0l0ZW1zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb0l0ZW1zJykgfHwgJ1tdJyk7XG59O1xuXG5jb25zdCBnZXRJdGVtID0gZnVuY3Rpb24gKGl0ZW1JZCkge1xuICBjb25zdCB0b2RvSXRlbSA9IHRvZG9JdGVtcy5maW5kKCh0ZGkpID0+IHRkaS5pZCA9PT0gaXRlbUlkKTtcbiAgcmV0dXJuIHRvZG9JdGVtO1xufTtcblxuY29uc3QgYWRkSXRlbSA9IGZ1bmN0aW9uIChpdGVtVGV4dCkge1xuICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHRvZG9JdGVtcy5wdXNoKHtcbiAgICBpZDogYCR7dGltZX1gLFxuICAgIHRleHQ6IGl0ZW1UZXh0LFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gIH0pO1xuICBzdG9yZUl0ZW1zKCk7XG59O1xuXG5jb25zdCBjb21wbGV0ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbUlkKSB7XG4gIGNvbnN0IHRvZG9JdGVtID0gZ2V0SXRlbShpdGVtSWQpO1xuICB0b2RvSXRlbS5jb21wbGV0ZWQgPSAhdG9kb0l0ZW0uY29tcGxldGVkO1xuICBzdG9yZUl0ZW1zKCk7XG59O1xuXG5jb25zdCByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGl0ZW1JZCkge1xuICBjb25zdCB0b2RvSXRlbSA9IGdldEl0ZW0oaXRlbUlkKTtcbiAgY29uc3QgcmVtb3ZlSW5kZXggPSAodG9kb0l0ZW1zLmluZGV4T2YodG9kb0l0ZW0pKTtcbiAgdG9kb0l0ZW1zLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gIHN0b3JlSXRlbXMoKTtcbn07XG5cbmNvbnN0IHJlbW92ZUNvbXBsZXRlZEl0ZW1zID0gZnVuY3Rpb24gKCkge1xuICB0b2RvSXRlbXMgPSB0b2RvSXRlbXMuZmlsdGVyKCh0ZGkpID0+ICF0ZGkuY29tcGxldGVkKTtcbiAgc3RvcmVJdGVtcygpO1xufTtcblxuY29uc3QgdXBkYXRlSXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQsIGl0ZW1UZXh0KSB7XG4gIGNvbnN0IHRvZG9JdGVtID0gZ2V0SXRlbShpdGVtSWQpO1xuICB0b2RvSXRlbS50ZXh0ID0gaXRlbVRleHQ7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbiAgc3RvcmVJdGVtcygpO1xufTtcblxubG9hZEl0ZW1zKCk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgaXRlbURyYWdTdGFydCA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coJ2l0ZW1EcmFnU3RhcnQnKTtcbn07XG5cbmNvbnN0IGl0ZW1EcmFnT3ZlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coJ2l0ZW1EcmFnT3ZlcicpO1xufTtcblxuY29uc3QgaXRlbURyYWdFbmQgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnNvbGUubG9nKCdpdGVtRHJhZ0VuZCcpO1xufTtcblxuY29uc3QgcmVuZGVySXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNsZWFyIGl0ZW1zIEhUTUxcbiAgaXRlbUxpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgLy8gZ2VuZXJhdGUgaXRlbXMgSFRNTFxuICB0b2RvSXRlbXMuZm9yRWFjaCgodG9kb0l0ZW0pID0+IHtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSB0b2RvSXRlbS5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnO1xuICAgIGl0ZW1MaXN0Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtIG15LTNcIiAgaWQ9XCIke3RvZG9JdGVtLmlkfVwiIGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwiaXRlbS1uYW1lIHRleHQtY2FwaXRhbGl6ZSAke2NvbXBsZXRlZH1cIj4ke3RvZG9JdGVtLnRleHR9PC9oNT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0taWNvbnNcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgY29tcGxldGUtaXRlbSBpdGVtLWljb25cIj48L2k+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZWRpdCBlZGl0LWl0ZW0gaXRlbS1pY29uXCI+PC9pPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBkZWxldGUtaXRlbSBpdGVtLWljb25cIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YCxcbiAgICApO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2RvSXRlbS5pZCk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBpdGVtRHJhZ1N0YXJ0KTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaXRlbURyYWdPdmVyKTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBpdGVtRHJhZ0VuZCk7XG4gICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gIH0pO1xufTtcblxuLy8gZXZlbnQgaGFuZGxlciB0byBhZGQvZWRpdCBhIGxpc3QgaXRlbVxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gY29sbGVjdCBpbnB1dCBhc25kIGNsZWFyIHRleHRib3hcbiAgY29uc3QgaXRlbVRleHQgPSBpdGVtSW5wdXQudmFsdWU7XG5cbiAgLy8gdmFsaWRhdGVcbiAgaWYgKCFpdGVtVGV4dCB8fCAhaXRlbVRleHQudHJpbSgpKSB7XG4gICAgaW5mb3JtLmlubmVySFRNTCA9ICdFbnRlciBhIHZhbGlkIHRvIGRvJztcbiAgICBpbmZvcm0uY2xhc3NMaXN0LmFkZCgnc2hvd0l0ZW0nLCAnYWxlcnQtZGFuZ2VyJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvd0l0ZW0nKTtcbiAgICB9LCAzMDAwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBhZGQvZWRpdFxuICBpZiAoY3VycmVudEVkaXRJdGVtKSB7XG4gICAgdXBkYXRlSXRlbShjdXJyZW50RWRpdEl0ZW0uaWQsIGl0ZW1UZXh0KTtcbiAgICBjdXJyZW50RWRpdEl0ZW0gPSBudWxsO1xuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkJztcbiAgICByZW5kZXJJdGVtcygpO1xuICB9IGVsc2Uge1xuICAgIGFkZEl0ZW0oaXRlbVRleHQpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH1cblxuICAvLyBjbGVhciBpbnB1dCB0ZXh0XG4gIGl0ZW1JbnB1dC52YWx1ZSA9ICcnO1xufSk7XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gY2xlYXIgaXRlbXNcbmNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZW1vdmVDb21wbGV0ZWRJdGVtcygpO1xuICByZW5kZXJJdGVtcygpO1xufSk7XG5cbi8vIGV2ZW50IGhhbmRsZXIgdG8gY29tcGxldGUsIGVkaXQgYW5kIGRlbGV0ZVxuaXRlbUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gZGVjaWRlIHdoaWNoIG9mIG91ciBhY3Rpb24gYnV0dG9uIHdlcmUgY2xpY2tlZCAoaWYgYW55KVxuICBjb25zdCB0YXJnZXRDbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICBjb25zdCBnZXRJdGVtSWQgPSAoKSA9PiBlLnRhcmdldC5jbG9zZXN0KCdkaXYuaXRlbScpLmlkO1xuXG4gIC8vIGNvbXBsZXRlL2VkaXQvZGVsZXRlXG4gIGlmICh0YXJnZXRDbGFzc2VzLmNvbnRhaW5zKCdjb21wbGV0ZS1pdGVtJykpIHtcbiAgICBjb21wbGV0ZUl0ZW0oZ2V0SXRlbUlkKCkpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnZWRpdC1pdGVtJykpIHtcbiAgICBjdXJyZW50RWRpdEl0ZW0gPSBnZXRJdGVtKGdldEl0ZW1JZCgpKTtcbiAgICBpdGVtSW5wdXQudmFsdWUgPSBjdXJyZW50RWRpdEl0ZW0udGV4dDtcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0VkaXQnO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0Q2xhc3Nlcy5jb250YWlucygnZGVsZXRlLWl0ZW0nKSkge1xuICAgIHJlbW92ZUl0ZW0oZ2V0SXRlbUlkKCkpO1xuICAgIHJlbmRlckl0ZW1zKCk7XG4gIH1cbn0pO1xuXG5yZW5kZXJJdGVtcygpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgLS1tYWluV2hpdGU6ICNmNWY1ZjU7XFxyXFxuICAtLW1haW5HcmVlbjogIzAwMDtcXHJcXG4gIC0tbWFpbkJsYWNrOiAjMzMzO1xcclxcbiAgLS1tYWluUmVkOiAjZDYyODI4O1xcclxcbiAgLS1tYWluQmx1ZTogIzExYjVlNDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1tYWluV2hpdGUpO1xcclxcbiAgY29sb3I6ICMzMzM7XFxyXFxufVxcclxcblxcclxcbi5ob2xkIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICB3aWR0aDogNjAlO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gIGJveC1zaGFkb3c6IDVweCAxMHB4ICMzMzM7XFxyXFxufVxcclxcblxcclxcbi5idG4tZ3JlZW4ge1xcclxcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tYWluR3JlZW4pO1xcclxcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpbkdyZWVuKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1ncmVlbjpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1tYWluR3JlZW4pO1xcclxcbiAgY29sb3I6IHZhcigtLW1haW5CbGFjayk7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLWNvbnRyb2wge1xcclxcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tYWluR3JlZW4pICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5mZWVkYmFjayB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5pdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi5pdGVtLWljb24ge1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZS1pdGVtIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluR3JlZW4pO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tcGxldGUtaXRlbTpob3ZlciB7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpbkdyZWVuKTtcXHJcXG59XFxyXFxuXFxyXFxuLmVkaXQtaXRlbSB7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpbkJsdWUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZWRpdC1pdGVtOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluQmx1ZSk7XFxyXFxufVxcclxcblxcclxcbi5kZWxldGUtaXRlbSB7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxyXFxufVxcclxcblxcclxcbi5kZWxldGUtaXRlbTpob3ZlciB7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpblJlZCk7XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBvcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi52aXNpYmlsaXR5IHtcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3dJdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5Qix1QkFBdUI7RUFDdkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsNEJBQTRCO0VBQzVCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxyXFxuICAtLW1haW5XaGl0ZTogI2Y1ZjVmNTtcXHJcXG4gIC0tbWFpbkdyZWVuOiAjMDAwO1xcclxcbiAgLS1tYWluQmxhY2s6ICMzMzM7XFxyXFxuICAtLW1haW5SZWQ6ICNkNjI4Mjg7XFxyXFxuICAtLW1haW5CbHVlOiAjMTFiNWU0O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQ6IHZhcigtLW1haW5XaGl0ZSk7XFxyXFxuICBjb2xvcjogIzMzMztcXHJcXG59XFxyXFxuXFxyXFxuLmhvbGQge1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIHdpZHRoOiA2MCU7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggIzMzMztcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1ncmVlbiB7XFxyXFxuICBib3JkZXItY29sb3I6IHZhcigtLW1haW5HcmVlbik7XFxyXFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluR3JlZW4pO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWdyZWVuOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQ6IHZhcigtLW1haW5HcmVlbik7XFxyXFxuICBjb2xvcjogdmFyKC0tbWFpbkJsYWNrKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcm0tY29udHJvbCB7XFxyXFxuICBib3JkZXItY29sb3I6IHZhcigtLW1haW5HcmVlbikgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmZlZWRiYWNrIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0taWNvbiB7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlLWl0ZW0ge1xcclxcbiAgY29sb3I6IHZhcigtLW1haW5HcmVlbik7XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZS1pdGVtOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluR3JlZW4pO1xcclxcbn1cXHJcXG5cXHJcXG4uZWRpdC1pdGVtIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluQmx1ZSk7XFxyXFxufVxcclxcblxcclxcbi5lZGl0LWl0ZW06aG92ZXIge1xcclxcbiAgY29sb3I6IHZhcigtLW1haW5CbHVlKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZS1pdGVtIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluUmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZS1pdGVtOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1tYWluUmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLnZpc2liaWxpdHkge1xcclxcbiAgb3BhY2l0eTogMC41O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd0l0ZW0ge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9zdHlsZS5jc3NcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2luZGV4LmpzXCIsIGltcG9ydC5tZXRhLnVybCk7XG4vLyBNb2R1bGVcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18pO1xudmFyIGNvZGUgPSBcIjwhRE9DVFlQRSBodG1sPlxcbjxodG1sIGxhbmc9XFxcImVuXFxcIj5cXG48aGVhZD5cXG4gIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIj5cXG4gIDxtZXRhIGh0dHAtZXF1aXY9XFxcIlgtVUEtQ29tcGF0aWJsZVxcXCIgY29udGVudD1cXFwiSUU9ZWRnZVxcXCI+XFxuICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCI+XFxuICA8dGl0bGU+VGhlIFRvZG8gTGlzdDwvdGl0bGU+XFxuICA8bGluayByZWw9XFxcInByZWNvbm5lY3RcXFwiIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cXFwiPlxcbiAgPGxpbmsgcmVsPVxcXCJwcmVjb25uZWN0XFxcIiBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXFxcIiBjcm9zc29yaWdpbj5cXG4gIDxsaW5rIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGF0byZkaXNwbGF5PXN3YXBcXFwiIHJlbD1cXFwic3R5bGVzaGVldFxcXCI+XFxuICA8bGluayByZWw9XFxcInN0eWxlc2hlZXRcXFwiIGhyZWY9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS81LjE1LjMvY3NzL2FsbC5taW4uY3NzXFxcIlxcbiAgICBpbnRlZ3JpdHk9XFxcInNoYTUxMi1pQkJYbThmVzkwK251TGNTS2xibXJQY0xhME9UOTJ4TzFCSXNaK3l3RFdaQ3Zxc1dnY2NWM2dGb1JCdjB6KzhkTEpneUFISWhSMzVWWmMyb00vZ0kxdz09XFxcIlxcbiAgICBjcm9zc29yaWdpbj1cXFwiYW5vbnltb3VzXFxcIiByZWZlcnJlcnBvbGljeT1cXFwibm8tcmVmZXJyZXJcXFwiIC8+XFxuICA8bGluayBocmVmPVxcXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcEA1LjAuMi9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1xcXCIgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICBpbnRlZ3JpdHk9XFxcInNoYTM4NC1FVlNUUU4zL2F6cHJHMUFubTNRRGdwSkxJbTlOYW8wWXoxenRjUVR3RnNwZDN5RDY1Vm9oaHB1dUNPbUxBU2pDXFxcIiBjcm9zc29yaWdpbj1cXFwiYW5vbnltb3VzXFxcIj5cXG4gIDxsaW5rIHJlbD1cXFwic3R5bGVzaGVldFxcXCIgaHJlZj1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiPlxcbjwvaGVhZD5cXG5cXG48aGVhZGVyPlxcbiAgPGgzPlRoZSB0b2RvIExpc3Q8L2gzPlxcbjwvaGVhZGVyPlxcbjxtYWluPlxcbiAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyIGhvbGRcXFwiPlxcbiAgICA8aDMgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5Ub2RheSB0b2RvIExpc3Q8L2gzPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbCBteC1hdXRvIGNvbC1tZC04IG10LTMgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgdGV4dC1jYXBpdGFsaXplIGZlZWRiYWNrXFxcIj5cXG4gICAgICAgICAgVG9kYXlzIFRvZG8gTGlzdFxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8IS0tIGZvcm0gLS0+XFxuICAgICAgICA8Zm9ybSBpZD1cXFwiaXRlbUZvcm1cXFwiIGNsYXNzPVxcXCJteS0zXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcIml0ZW1JbnB1dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkFkZCB0byB5b3VyIGxpc3QuLi5cXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwLWFwcGVuZFxcXCI+XFxuICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXRCdXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWdyZWVuIHRleHQtY2FwaXRhbGl6ZVxcXCIgdHlwZT1cXFwic3VibWl0XFxcIj5hZGQ8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Zvcm0+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVtLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICAgIDwhLS0gZW5kIG9mIGZvcm0gIC0tPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVtLWxpc3QgbXktNVxcXCI+XFxuXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JlZW4gbXktMyB0ZXh0LWNhcGl0YWxpemVcXFwiIGlkPVxcXCJjbGVhci1saXN0XFxcIj5jbGVhciBhbGxcXG4gICAgICAgICAgICBjb21wbGV0ZWQ8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvbWFpbj5cXG48c2NyaXB0IHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fICsgXCJcXFwiPjwvc2NyaXB0PlxcbjwvYm9keT5cXG48L2h0bWw+XCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoc3R5bGUsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGUpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoXCJtZWRpYVwiKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGUpIHtcbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=