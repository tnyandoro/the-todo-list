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
// eslint-disable-next-line no-unused-vars

 // declarations

var form = document.querySelector('#itemForm'); // select the form

var itemInput = document.querySelector('#itemInput'); // select the input box from the form

var itemList = document.querySelector('.item-list');
var inform = document.querySelector('.inform');
var clearButton = document.querySelector('#clear-list');
var tasks = [];
var items = document.querySelectorAll('.item-list');

var renderTasks = function renderTasks() {
  itemList.innerHTML = '';
  tasks.forEach(function (task) {
    itemList.insertAdjacentHTML('beforeend', "<div class=\"item my-3\">\n        <div class=\"item-icons\">\n          <a href=\"#\" class=\"complete-item mx-2 item-icon\">\n            <i class=\"far fa-check-square\"></i>\n          </a>\n        </div>\n        <h5 class=\"item-name text-capitalize\">".concat(task.description, "</h5>       \n      </div>"));
  });
};

var removeItem = function removeItem(item) {
  // console.log(item);
  var removeIndex = tasks.indexOf(item); // console.log(removeIndex);

  tasks.splice(removeIndex, 1);
  renderTasks();
};

var addTodo = function addTodo(itemDescription) {
  items.forEach(function (item) {
    if (item.querySelector('.item-name').textContent === itemDescription) {
      // event listener for complete
      item.querySelector('.complete-item').addEventListener('click', function () {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      }); // event listener for for edit

      item.querySelector('.edit-item').addEventListener('click', function () {
        itemInput.value = itemDescription;
        itemList.removeChild(item);
        tasks = tasks.filter(function (item) {
          return item !== itemDescription;
        });
      }); // event listener for delete

      item.querySelector('.delete-item').addEventListener('click', function () {
        // itemList.removeChild(item);
        var dataItem = tasks.find(function (item) {
          return item === itemDescription;
        });
        removeItem(dataItem);
        renderTasks(); // showinform('item delete', 'success')
      });
    }
  });
}; // get local storage


var getLocalStorage = function getLocalStorage() {
  var storedTasksStr = localStorage.getItem('tasks');

  if (storedTasksStr === 'undefined' || storedTasksStr === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(storedTasksStr);
    renderTasks();
  }
}; // set local storage


var setLocalStorage = function setLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}; // get local storage


getLocalStorage(); // add a list item and to local storage

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var itemDescription = itemInput.value;

  if (itemDescription === 0) {
    inform.innerHTML = 'Enter a Valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(function () {
      inform.classList.remove('showItem');
    }, 3000);
  } else {
    tasks.push({
      description: itemDescription,
      completed: false,
      index: tasks.length
    });
    setLocalStorage();
    renderTasks(); // add event listeners to icons;
    // addtodo(itemDescription);
  }

  itemInput.value = '';
}); // clear items from the listeners

clearButton.addEventListener('click', function () {
  tasks = [];
  localStorage.clear();
  renderTasks();
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
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>The Todo List</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Lato&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"\n    integrity=\"sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==\"\n    crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC\" crossorigin=\"anonymous\">\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\n</head>\n<header>\n  <h3 class=\"title\">The todo List</h3>\n</header>\n<div class=\"container hold\">\n  <h3 class=\"text-center heading\">Today todo List</h3>\n  <div class=\"row\">\n    <div class=\"col mx-auto col-md-8 mt-3 text-center\">\n      <div class=\"alert text-capitalize heading feedback\">\n        Todays Todo List\n      </div>\n      <!-- form -->\n      <form id=\"itemForm\" class=\"my-3\">\n        <div class=\"input-group\">\n          <input type=\"text\" class=\"form-control text-capitalize\" id=\"itemInput\" placeholder=\"Add to your list...\">\n          <div class=\"input-group-append\">\n            <button id=\"submitButton\" class=\"btn btn-grey text-capitalize\" type=\"submit\">add</button>\n          </div>\n        </div>\n      </form>\n      <!-- end of form  -->\n      <div class=\"item-list my-5\">\n      </div>\n      <button type=\"button\" class=\"btn btn-grey my-3 text-capitalize\" id=\"clear-list\">clear all\n        completed</button>\n    </div>\n  </div>\n</div>\n</div>\n<script src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"></script>\n</body>\n\n</html>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3QvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RoZS10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdGhlLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90aGUtdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJmb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaXRlbUlucHV0IiwiaXRlbUxpc3QiLCJpbmZvcm0iLCJjbGVhckJ1dHRvbiIsInRhc2tzIiwiaXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVuZGVyVGFza3MiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwidGFzayIsImluc2VydEFkamFjZW50SFRNTCIsImRlc2NyaXB0aW9uIiwicmVtb3ZlSXRlbSIsIml0ZW0iLCJyZW1vdmVJbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJhZGRUb2RvIiwiaXRlbURlc2NyaXB0aW9uIiwidGV4dENvbnRlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidmFsdWUiLCJyZW1vdmVDaGlsZCIsImZpbHRlciIsImRhdGFJdGVtIiwiZmluZCIsImdldExvY2FsU3RvcmFnZSIsInN0b3JlZFRhc2tzU3RyIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsInNldExvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJlIiwicHJldmVudERlZmF1bHQiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwicHVzaCIsImNvbXBsZXRlZCIsImluZGV4IiwibGVuZ3RoIiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7Q0FFQTs7QUFDQSxJQUFNQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixDQUFiLEMsQ0FBa0Q7O0FBQ2xELElBQU1DLFNBQVMsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQWxCLEMsQ0FBd0Q7O0FBQ3hELElBQU1FLFFBQVEsR0FBR0gsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQWpCO0FBQ0EsSUFBTUcsTUFBTSxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZjtBQUNBLElBQU1JLFdBQVcsR0FBR0wsUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLENBQXBCO0FBRUEsSUFBSUssS0FBSyxHQUFHLEVBQVo7QUFFQSxJQUFNQyxLQUFLLEdBQUdQLFFBQVEsQ0FBQ1EsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBZDs7QUFFQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFZO0FBQzlCTixVQUFRLENBQUNPLFNBQVQsR0FBcUIsRUFBckI7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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLG9COzs7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IGNzcyBmcm9tICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaHRtbCBmcm9tICcuL2luZGV4Lmh0bWwnO1xuLy8gZGVjbGFyYXRpb25zXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1Gb3JtJyk7IC8vIHNlbGVjdCB0aGUgZm9ybVxuY29uc3QgaXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2l0ZW1JbnB1dCcpOyAvLyBzZWxlY3QgdGhlIGlucHV0IGJveCBmcm9tIHRoZSBmb3JtXG5jb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWxpc3QnKTtcbmNvbnN0IGluZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvcm0nKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLWxpc3QnKTtcblxubGV0IHRhc2tzID0gW107XG5cbmNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0tbGlzdCcpO1xuXG5jb25zdCByZW5kZXJUYXNrcyA9IGZ1bmN0aW9uICgpIHtcbiAgaXRlbUxpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGl0ZW1MaXN0Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtIG15LTNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0taWNvbnNcIj5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY29tcGxldGUtaXRlbSBteC0yIGl0ZW0taWNvblwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stc3F1YXJlXCI+PC9pPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoNSBjbGFzcz1cIml0ZW0tbmFtZSB0ZXh0LWNhcGl0YWxpemVcIj4ke3Rhc2suZGVzY3JpcHRpb259PC9oNT4gICAgICAgXG4gICAgICA8L2Rpdj5gLFxuICAgICk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICBjb25zdCByZW1vdmVJbmRleCA9ICh0YXNrcy5pbmRleE9mKGl0ZW0pKTtcbiAgLy8gY29uc29sZS5sb2cocmVtb3ZlSW5kZXgpO1xuICB0YXNrcy5zcGxpY2UocmVtb3ZlSW5kZXgsIDEpO1xuICByZW5kZXJUYXNrcygpO1xufTtcblxuY29uc3QgYWRkVG9kbyA9IGZ1bmN0aW9uIChpdGVtRGVzY3JpcHRpb24pIHtcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW5hbWUnKS50ZXh0Q29udGVudCA9PT0gaXRlbURlc2NyaXB0aW9uKSB7XG4gICAgICAvLyBldmVudCBsaXN0ZW5lciBmb3IgY29tcGxldGVcbiAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlLWl0ZW0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1uYW1lJykuY2xhc3NMaXN0LnRvZ2dsZSgnY29tcGxldGVkJyk7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJpbGl0eScpO1xuICAgICAgfSk7XG4gICAgICAvLyBldmVudCBsaXN0ZW5lciBmb3IgZm9yIGVkaXRcbiAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmVkaXQtaXRlbScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpdGVtSW5wdXQudmFsdWUgPSBpdGVtRGVzY3JpcHRpb247XG4gICAgICAgIGl0ZW1MaXN0LnJlbW92ZUNoaWxkKGl0ZW0pO1xuXG4gICAgICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBpdGVtRGVzY3JpcHRpb24pO1xuICAgICAgfSk7XG4gICAgICAvLyBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRlXG4gICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaXRlbScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyBpdGVtTGlzdC5yZW1vdmVDaGlsZChpdGVtKTtcblxuICAgICAgICBjb25zdCBkYXRhSXRlbSA9IHRhc2tzLmZpbmQoKGl0ZW0pID0+IGl0ZW0gPT09IGl0ZW1EZXNjcmlwdGlvbik7XG4gICAgICAgIHJlbW92ZUl0ZW0oZGF0YUl0ZW0pO1xuICAgICAgICByZW5kZXJUYXNrcygpO1xuICAgICAgICAvLyBzaG93aW5mb3JtKCdpdGVtIGRlbGV0ZScsICdzdWNjZXNzJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBnZXQgbG9jYWwgc3RvcmFnZVxuY29uc3QgZ2V0TG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzdG9yZWRUYXNrc1N0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpO1xuICBpZiAoc3RvcmVkVGFza3NTdHIgPT09ICd1bmRlZmluZWQnIHx8IHN0b3JlZFRhc2tzU3RyID09PSBudWxsKSB7XG4gICAgdGFza3MgPSBbXTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrcyA9IEpTT04ucGFyc2Uoc3RvcmVkVGFza3NTdHIpO1xuICAgIHJlbmRlclRhc2tzKCk7XG4gIH1cbn07XG5cbi8vIHNldCBsb2NhbCBzdG9yYWdlXG5jb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG59O1xuXG4vLyBnZXQgbG9jYWwgc3RvcmFnZVxuZ2V0TG9jYWxTdG9yYWdlKCk7XG5cbi8vIGFkZCBhIGxpc3QgaXRlbSBhbmQgdG8gbG9jYWwgc3RvcmFnZVxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGl0ZW1JbnB1dC52YWx1ZTtcblxuICBpZiAoaXRlbURlc2NyaXB0aW9uID09PSAwKSB7XG4gICAgaW5mb3JtLmlubmVySFRNTCA9ICdFbnRlciBhIFZhbGlkIHRvIGRvJztcbiAgICBpbmZvcm0uY2xhc3NMaXN0LmFkZCgnc2hvd0l0ZW0nLCAnYWxlcnQtZGFuZ2VyJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvd0l0ZW0nKTtcbiAgICB9LCAzMDAwKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrcy5wdXNoKHtcbiAgICAgIGRlc2NyaXB0aW9uOiBpdGVtRGVzY3JpcHRpb24sXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgaW5kZXg6IHRhc2tzLmxlbmd0aCxcbiAgICB9KTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICByZW5kZXJUYXNrcygpO1xuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaWNvbnM7XG4gICAgLy8gYWRkdG9kbyhpdGVtRGVzY3JpcHRpb24pO1xuICB9XG5cbiAgaXRlbUlucHV0LnZhbHVlID0gJyc7XG59KTtcblxuLy8gY2xlYXIgaXRlbXMgZnJvbSB0aGUgbGlzdGVuZXJzXG5cbmNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB0YXNrcyA9IFtdO1xuICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgcmVuZGVyVGFza3MoKTtcbn0pOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vc3R5bGUuY3NzXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbmRleC5qc1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBjb2RlID0gXCI8IURPQ1RZUEUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuXFxuPGhlYWQ+XFxuICA8bWV0YSBjaGFyc2V0PVxcXCJVVEYtOFxcXCI+XFxuICA8bWV0YSBodHRwLWVxdWl2PVxcXCJYLVVBLUNvbXBhdGlibGVcXFwiIGNvbnRlbnQ9XFxcIklFPWVkZ2VcXFwiPlxcbiAgPG1ldGEgbmFtZT1cXFwidmlld3BvcnRcXFwiIGNvbnRlbnQ9XFxcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcXFwiPlxcbiAgPHRpdGxlPlRoZSBUb2RvIExpc3Q8L3RpdGxlPlxcbiAgPGxpbmsgcmVsPVxcXCJwcmVjb25uZWN0XFxcIiBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXFxcIj5cXG4gIDxsaW5rIHJlbD1cXFwicHJlY29ubmVjdFxcXCIgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVxcXCIgY3Jvc3NvcmlnaW4+XFxuICA8bGluayBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxhdG8mZGlzcGxheT1zd2FwXFxcIiByZWw9XFxcInN0eWxlc2hlZXRcXFwiPlxcbiAgPGxpbmsgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIiBocmVmPVxcXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNS4xNS4zL2Nzcy9hbGwubWluLmNzc1xcXCJcXG4gICAgaW50ZWdyaXR5PVxcXCJzaGE1MTItaUJCWG04Zlc5MCtudUxjU0tsYm1yUGNMYTBPVDkyeE8xQklzWit5d0RXWkN2cXNXZ2NjVjNnRm9SQnYweis4ZExKZ3lBSEloUjM1VlpjMm9NL2dJMXc9PVxcXCJcXG4gICAgY3Jvc3NvcmlnaW49XFxcImFub255bW91c1xcXCIgcmVmZXJyZXJwb2xpY3k9XFxcIm5vLXJlZmVycmVyXFxcIiAvPlxcbiAgPGxpbmsgaHJlZj1cXFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANS4wLjIvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcXFwiIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgaW50ZWdyaXR5PVxcXCJzaGEzODQtRVZTVFFOMy9henByRzFBbm0zUURncEpMSW05TmFvMFl6MXp0Y1FUd0ZzcGQzeUQ2NVZvaGhwdXVDT21MQVNqQ1xcXCIgY3Jvc3NvcmlnaW49XFxcImFub255bW91c1xcXCI+XFxuICA8bGluayByZWw9XFxcInN0eWxlc2hlZXRcXFwiIGhyZWY9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyArIFwiXFxcIj5cXG48L2hlYWQ+XFxuPGhlYWRlcj5cXG4gIDxoMyBjbGFzcz1cXFwidGl0bGVcXFwiPlRoZSB0b2RvIExpc3Q8L2gzPlxcbjwvaGVhZGVyPlxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lciBob2xkXFxcIj5cXG4gIDxoMyBjbGFzcz1cXFwidGV4dC1jZW50ZXIgaGVhZGluZ1xcXCI+VG9kYXkgdG9kbyBMaXN0PC9oMz5cXG4gIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbCBteC1hdXRvIGNvbC1tZC04IG10LTMgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IHRleHQtY2FwaXRhbGl6ZSBoZWFkaW5nIGZlZWRiYWNrXFxcIj5cXG4gICAgICAgIFRvZGF5cyBUb2RvIExpc3RcXG4gICAgICA8L2Rpdj5cXG4gICAgICA8IS0tIGZvcm0gLS0+XFxuICAgICAgPGZvcm0gaWQ9XFxcIml0ZW1Gb3JtXFxcIiBjbGFzcz1cXFwibXktM1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cFxcXCI+XFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcIml0ZW1JbnB1dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkFkZCB0byB5b3VyIGxpc3QuLi5cXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hcHBlbmRcXFwiPlxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdEJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JleSB0ZXh0LWNhcGl0YWxpemVcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+YWRkPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9mb3JtPlxcbiAgICAgIDwhLS0gZW5kIG9mIGZvcm0gIC0tPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0tbGlzdCBteS01XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZ3JleSBteS0zIHRleHQtY2FwaXRhbGl6ZVxcXCIgaWQ9XFxcImNsZWFyLWxpc3RcXFwiPmNsZWFyIGFsbFxcbiAgICAgICAgY29tcGxldGVkPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPHNjcmlwdCBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIj48L3NjcmlwdD5cXG48L2JvZHk+XFxuXFxuPC9odG1sPlwiO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGUsIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICBpZiAob3B0aW9ucy5tYXliZU5lZWRRdW90ZXMgJiYgL1tcXHRcXG5cXGZcXHIgXCInPTw+YF0vLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=