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
/* eslint-disable func-names */

 // declarations

var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var todoItems = [];
var items = document.querySelectorAll('.item-list');

var getList = function getList(todoItems) {
  itemList.innerHTML = '';
  todoItems.forEach(function (item) {
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\">\n  <h5 class=\"item-name text-capitalize\">".concat(item, "</h5>\n  <div class=\"item-icons\"><a href=\"#\" class=\"complete-item mx-2 item-icon\">\n  <i class=\"far fa-check-circle\"></i></a><a href=\"#\" class=\"edit-item mx-2 item-icon\">\n  <i class=\"far fa-edit\"></i></a><a href=\"#\" class=\"delete-item item-icon\">\n  <i class=\"far fa-times-circle\"></i></a></div></div>")); // eslint-disable-next-line no-use-before-define

    addTodo(item);
  });
};

var removeItem = function removeItem(item) {
  // console.log(item);
  var removeIndex = todoItems.indexOf(item); // console.log(removeIndex);

  todoItems.splice(removeIndex, 1);
  getList(todoItems);
};

var addTodo = function addTodo(itemName) {
  items.forEach(function (item) {
    if (item.querySelector('.item-name').textContent === itemName) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      }); // event listener for for edit

      item.querySelector('.edit-item').addEventListener('click', function () {
        itemInput.value = itemName;
        itemList.removeChild(item);
        todoItems = todoItems.filter(function (item) {
          return item !== itemName;
        });
      }); // event listener for delete

      item.querySelector('.delete-item').addEventListener('click', function () {
        // itemList.removeChild(item);
        var dataItem = todoItems.find(function (item) {
          return item === itemName;
        });
        removeItem(dataItem);
        getList(todoItems); // showinform('item delete', 'success')
      });
    }
  });
}; // get local storage


var getLocalStorage = function getLocalStorage() {
  var todoStorage = localStorage.getItem('todoItems');

  if (todoStorage === 'undefined' || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  }
}; // set local storage


var setLocalStorage = function setLocalStorage(todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}; // get local storage


getLocalStorage(); // add a list item and to local storage

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var itemName = itemInput.value;

  if (itemName === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems); // add event listeners to icons;
    // addtodo(itemName);
  }

  itemInput.value = '';
}); // clear items from the listeners

clearButton.addEventListener('click', function () {
  todoItems = [];
  localStorage.clear();
  getList(todoItems);
});

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
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>The Todo List</title>\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Lato&display=swap\" rel=\"stylesheet\">\r\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"\r\n    integrity=\"sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==\"\r\n    crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\r\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\r\n    integrity=\"sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC\" crossorigin=\"anonymous\">\r\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\r\n</head>\r\n\r\n<header>\r\n  <h3>The todo List</h3>\r\n</header>\r\n<main>\r\n  <div class=\"container hold\">\r\n    <h3 class=\"text-center\">Today todo List</h3>\r\n    <div class=\"row\">\r\n      <div class=\"col mx-auto col-md-8 mt-3 text-center\">\r\n        <div class=\"alert text-capitalize feedback\">\r\n          Todays Todo List\r\n        </div>\r\n        <!-- form -->\r\n        <form id=\"itemForm\" class=\"my-3\">\r\n          <div class=\"input-group\">\r\n            <input type=\"text\" class=\"form-control text-capitalize\" id=\"itemInput\" placeholder=\"Add to your list...\">\r\n            <div class=\"input-group-append\">\r\n              <button class=\"btn btn-green text-capitalize\" type=\"submit\">add</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n        <div class=\"item-container\">\r\n          <!-- end of form  -->\r\n          <div class=\"item-list my-5\">\r\n\r\n          </div>\r\n          <button type=\"button\" class=\"btn btn-green my-3 text-capitalize\" id=\"clear-list\">clear all\r\n            completed</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</main>\r\n<script src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"></script>\r\n</body>\r\n</html>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJmb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaXRlbUlucHV0IiwiaXRlbUxpc3QiLCJpbmZvcm0iLCJjbGVhckJ1dHRvbiIsInRvZG9JdGVtcyIsIml0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImdldExpc3QiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwiaXRlbSIsImluc2VydEFkamFjZW50SFRNTCIsImFkZFRvZG8iLCJyZW1vdmVJdGVtIiwicmVtb3ZlSW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaXRlbU5hbWUiLCJ0ZXh0Q29udGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ2YWx1ZSIsInJlbW92ZUNoaWxkIiwiZmlsdGVyIiwiZGF0YUl0ZW0iLCJmaW5kIiwiZ2V0TG9jYWxTdG9yYWdlIiwidG9kb1N0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwic2V0TG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJwdXNoIiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0NBRUE7O0FBQ0EsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBYixDLENBQWtEOztBQUNsRCxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFsQixDLENBQXdEOztBQUN4RCxJQUFNRSxRQUFRLEdBQUdILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFqQjtBQUNBLElBQU1HLE1BQU0sR0FBR0osUUFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLENBQWY7QUFDQSxJQUFNSSxXQUFXLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUFwQjtBQUVBLElBQUlLLFNBQVMsR0FBRyxFQUFoQjtBQUVBLElBQU1DLEtBQUssR0FBR1AsUUFBUSxDQUFDUSxnQkFBVCxDQUEwQixZQUExQixDQUFkOztBQUVBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVVILFNBQVYsRUFBcUI7QUFDbkNILFVBQVEsQ0FBQ08sU0FBVCxHQUFxQixFQUFyQjtBQUVBSixXQUFTLENBQUNLLE9BQVYsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzFCVCxZQUFRLENB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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSxvQjs7Ozs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgaHRtbCBmcm9tICcuL2luZGV4Lmh0bWwnO1xuLy8gZGVjbGFyYXRpb25zXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1Gb3JtJyk7IC8vIHNlbGVjdCB0aGUgZm9ybVxuY29uc3QgaXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1JbnB1dCcpOyAvLyBzZWxlY3QgdGhlIGlucHV0IGJveCBmcm9tIHRoZSBmb3JtXG5jb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWxpc3QnKTtcbmNvbnN0IGluZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvcm0nKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLWxpc3QnKTtcblxubGV0IHRvZG9JdGVtcyA9IFtdO1xuXG5jb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pdGVtLWxpc3QnKTtcblxuY29uc3QgZ2V0TGlzdCA9IGZ1bmN0aW9uICh0b2RvSXRlbXMpIHtcbiAgaXRlbUxpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgdG9kb0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtTGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsXG4gICAgICBgPGRpdiBjbGFzcz1cIml0ZW0gbXktM1wiPlxuICA8aDUgY2xhc3M9XCJpdGVtLW5hbWUgdGV4dC1jYXBpdGFsaXplXCI+JHtpdGVtfTwvaDU+XG4gIDxkaXYgY2xhc3M9XCJpdGVtLWljb25zXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImNvbXBsZXRlLWl0ZW0gbXgtMiBpdGVtLWljb25cIj5cbiAgPGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYT48YSBocmVmPVwiI1wiIGNsYXNzPVwiZWRpdC1pdGVtIG14LTIgaXRlbS1pY29uXCI+XG4gIDxpIGNsYXNzPVwiZmFyIGZhLWVkaXRcIj48L2k+PC9hPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJkZWxldGUtaXRlbSBpdGVtLWljb25cIj5cbiAgPGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlXCI+PC9pPjwvYT48L2Rpdj48L2Rpdj5gKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIGFkZFRvZG8oaXRlbSk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICBjb25zdCByZW1vdmVJbmRleCA9ICh0b2RvSXRlbXMuaW5kZXhPZihpdGVtKSk7XG4gIC8vIGNvbnNvbGUubG9nKHJlbW92ZUluZGV4KTtcbiAgdG9kb0l0ZW1zLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gIGdldExpc3QodG9kb0l0ZW1zKTtcbn07XG5cbmNvbnN0IGFkZFRvZG8gPSBmdW5jdGlvbiAoaXRlbU5hbWUpIHtcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW5hbWUnKS50ZXh0Q29udGVudCA9PT0gaXRlbU5hbWUpIHtcbiAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIGZvciBjb21wbGV0ZVxuICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGUtaXRlbScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW5hbWUnKS5jbGFzc0xpc3QudG9nZ2xlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmlsaXR5Jyk7XG4gICAgICB9KTtcbiAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIGZvciBmb3IgZWRpdFxuICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1pdGVtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGl0ZW1JbnB1dC52YWx1ZSA9IGl0ZW1OYW1lO1xuICAgICAgICBpdGVtTGlzdC5yZW1vdmVDaGlsZChpdGVtKTtcblxuICAgICAgICB0b2RvSXRlbXMgPSB0b2RvSXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBpdGVtTmFtZSk7XG4gICAgICB9KTtcbiAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGVcbiAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1pdGVtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIC8vIGl0ZW1MaXN0LnJlbW92ZUNoaWxkKGl0ZW0pO1xuXG4gICAgICAgIGNvbnN0IGRhdGFJdGVtID0gdG9kb0l0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0gPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgcmVtb3ZlSXRlbShkYXRhSXRlbSk7XG4gICAgICAgIGdldExpc3QodG9kb0l0ZW1zKTtcbiAgICAgICAgLy8gc2hvd2luZm9ybSgnaXRlbSBkZWxldGUnLCAnc3VjY2VzcycpXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gZ2V0IGxvY2FsIHN0b3JhZ2VcbmNvbnN0IGdldExvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdG9kb1N0b3JhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb0l0ZW1zJyk7XG4gIGlmICh0b2RvU3RvcmFnZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9kb1N0b3JhZ2UgPT09IG51bGwpIHtcbiAgICB0b2RvSXRlbXMgPSBbXTtcbiAgfSBlbHNlIHtcbiAgICB0b2RvSXRlbXMgPSBKU09OLnBhcnNlKHRvZG9TdG9yYWdlKTtcbiAgICBnZXRMaXN0KHRvZG9JdGVtcyk7XG4gIH1cbn07XG5cbi8vIHNldCBsb2NhbCBzdG9yYWdlXG5jb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAodG9kb0l0ZW1zKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5cbi8vIGdldCBsb2NhbCBzdG9yYWdlXG5nZXRMb2NhbFN0b3JhZ2UoKTtcblxuLy8gYWRkIGEgbGlzdCBpdGVtIGFuZCB0byBsb2NhbCBzdG9yYWdlXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgaXRlbU5hbWUgPSBpdGVtSW5wdXQudmFsdWU7XG5cbiAgaWYgKGl0ZW1OYW1lID09PSAwKSB7XG4gICAgaW5mb3JtLmlubmVySFRNTCA9ICdFbnRlciBhIFZhbGlkIHRvIGRvJztcbiAgICBpbmZvcm0uY2xhc3NMaXN0LmFkZCgnc2hvd0l0ZW0nLCAnYWxlcnQtZGFuZ2VyJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvd0l0ZW0nKTtcbiAgICB9LCAzMDAwKTtcbiAgfSBlbHNlIHtcbiAgICB0b2RvSXRlbXMucHVzaChpdGVtTmFtZSk7XG4gICAgc2V0TG9jYWxTdG9yYWdlKHRvZG9JdGVtcyk7XG4gICAgZ2V0TGlzdCh0b2RvSXRlbXMpO1xuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaWNvbnM7XG4gICAgLy8gYWRkdG9kbyhpdGVtTmFtZSk7XG4gIH1cblxuICBpdGVtSW5wdXQudmFsdWUgPSAnJztcbn0pO1xuXG4vLyBjbGVhciBpdGVtcyBmcm9tIHRoZSBsaXN0ZW5lcnNcblxuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHRvZG9JdGVtcyA9IFtdO1xuICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgZ2V0TGlzdCh0b2RvSXRlbXMpO1xufSk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9zdHlsZS5jc3NcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2luZGV4LmpzXCIsIGltcG9ydC5tZXRhLnVybCk7XG4vLyBNb2R1bGVcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18pO1xudmFyIGNvZGUgPSBcIjwhRE9DVFlQRSBodG1sPlxcclxcbjxodG1sIGxhbmc9XFxcImVuXFxcIj5cXHJcXG48aGVhZD5cXHJcXG4gIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIj5cXHJcXG4gIDxtZXRhIGh0dHAtZXF1aXY9XFxcIlgtVUEtQ29tcGF0aWJsZVxcXCIgY29udGVudD1cXFwiSUU9ZWRnZVxcXCI+XFxyXFxuICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCI+XFxyXFxuICA8dGl0bGU+VGhlIFRvZG8gTGlzdDwvdGl0bGU+XFxyXFxuICA8bGluayByZWw9XFxcInByZWNvbm5lY3RcXFwiIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cXFwiPlxcclxcbiAgPGxpbmsgcmVsPVxcXCJwcmVjb25uZWN0XFxcIiBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXFxcIiBjcm9zc29yaWdpbj5cXHJcXG4gIDxsaW5rIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGF0byZkaXNwbGF5PXN3YXBcXFwiIHJlbD1cXFwic3R5bGVzaGVldFxcXCI+XFxyXFxuICA8bGluayByZWw9XFxcInN0eWxlc2hlZXRcXFwiIGhyZWY9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS81LjE1LjMvY3NzL2FsbC5taW4uY3NzXFxcIlxcclxcbiAgICBpbnRlZ3JpdHk9XFxcInNoYTUxMi1pQkJYbThmVzkwK251TGNTS2xibXJQY0xhME9UOTJ4TzFCSXNaK3l3RFdaQ3Zxc1dnY2NWM2dGb1JCdjB6KzhkTEpneUFISWhSMzVWWmMyb00vZ0kxdz09XFxcIlxcclxcbiAgICBjcm9zc29yaWdpbj1cXFwiYW5vbnltb3VzXFxcIiByZWZlcnJlcnBvbGljeT1cXFwibm8tcmVmZXJyZXJcXFwiIC8+XFxyXFxuICA8bGluayBocmVmPVxcXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcEA1LjAuMi9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1xcXCIgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcclxcbiAgICBpbnRlZ3JpdHk9XFxcInNoYTM4NC1FVlNUUU4zL2F6cHJHMUFubTNRRGdwSkxJbTlOYW8wWXoxenRjUVR3RnNwZDN5RDY1Vm9oaHB1dUNPbUxBU2pDXFxcIiBjcm9zc29yaWdpbj1cXFwiYW5vbnltb3VzXFxcIj5cXHJcXG4gIDxsaW5rIHJlbD1cXFwic3R5bGVzaGVldFxcXCIgaHJlZj1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiPlxcclxcbjwvaGVhZD5cXHJcXG5cXHJcXG48aGVhZGVyPlxcclxcbiAgPGgzPlRoZSB0b2RvIExpc3Q8L2gzPlxcclxcbjwvaGVhZGVyPlxcclxcbjxtYWluPlxcclxcbiAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyIGhvbGRcXFwiPlxcclxcbiAgICA8aDMgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5Ub2RheSB0b2RvIExpc3Q8L2gzPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbCBteC1hdXRvIGNvbC1tZC04IG10LTMgdGV4dC1jZW50ZXJcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgdGV4dC1jYXBpdGFsaXplIGZlZWRiYWNrXFxcIj5cXHJcXG4gICAgICAgICAgVG9kYXlzIFRvZG8gTGlzdFxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8IS0tIGZvcm0gLS0+XFxyXFxuICAgICAgICA8Zm9ybSBpZD1cXFwiaXRlbUZvcm1cXFwiIGNsYXNzPVxcXCJteS0zXFxcIj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcIml0ZW1JbnB1dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkFkZCB0byB5b3VyIGxpc3QuLi5cXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwLWFwcGVuZFxcXCI+XFxyXFxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWdyZWVuIHRleHQtY2FwaXRhbGl6ZVxcXCIgdHlwZT1cXFwic3VibWl0XFxcIj5hZGQ8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVtLWNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgIDwhLS0gZW5kIG9mIGZvcm0gIC0tPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVtLWxpc3QgbXktNVxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JlZW4gbXktMyB0ZXh0LWNhcGl0YWxpemVcXFwiIGlkPVxcXCJjbGVhci1saXN0XFxcIj5jbGVhciBhbGxcXHJcXG4gICAgICAgICAgICBjb21wbGV0ZWQ8L2J1dHRvbj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbjwvbWFpbj5cXHJcXG48c2NyaXB0IHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fICsgXCJcXFwiPjwvc2NyaXB0PlxcclxcbjwvYm9keT5cXHJcXG48L2h0bWw+XCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==