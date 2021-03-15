// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Elements/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formFilter = exports.resetBtn = exports.filterByMonth = exports.inputSearchName = exports.container = exports.dataJson = void 0;
// Import the data from people.json
const dataJson = './people.json'; // Grabbing the container element

exports.dataJson = dataJson;
const container = document.querySelector(".container");
exports.container = container;
const inputSearchName = document.querySelector(".input");
exports.inputSearchName = inputSearchName;
const filterByMonth = document.querySelector("#month");
exports.filterByMonth = filterByMonth;
const resetBtn = document.querySelector("reset");
exports.resetBtn = resetBtn;
const formFilter = document.querySelector("form.new_list");
exports.formFilter = formFilter;
},{}],"Elements/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populatePersons = populatePersons;

// Create a function to store the html so that you can reuse it again
function populatePersons(people) {
  return people.map(person => {
    function nthDate(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    } // Getting the date with the day, month, year


    const date = new Date();
    const dateNow = new Date(person.birthday);
    const day = dateNow.getDate();
    const months = dateNow.getMonth();
    const year = dateNow.getFullYear();
    const fullDate = `${day}/${months + 1}/${year}`;
    const personAge = date.getFullYear() - year;
    const futureAge = personAge; // Counting the days until the birthday comes

    const Year = date.getFullYear();
    const birthDayDate = new Date(Year, months, day);
    let oneDay = 1000 * 60 * 60 * 24;
    const dayLeft = Math.ceil((birthDayDate.getTime() - date.getTime()) / oneDay);
    return `
        <article data-id="${person.id}" value="${person.id}" class="article">
            <ul>
                <li><img src="${person.picture}"></li>
                <li>
                    <h2>${person.lastName} ${person.firstName}</h2> 
                    <p>
                        Turns <span>${futureAge + 1}</span> on ${new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    })} <time datetime="${fullDate}"> ${new Date(person.birthday).toLocaleString("en-Us", {
      day: "numeric"
    })}${nthDate(date)}</time>
                         
                    </p>    
                </li>
                <li>
                    <ul>
                        <li>
                            in ${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : dayLeft + " days"}</li>
                        </li>
                        <li>
                        <div class="edit" value="${person.id}" data-id="${person.id}">
                            <svg class="w-6 h-6" fill="none" fill="blue" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/200/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </div>
                        <div class="delete" data-id="${person.id}">
                            <svg class="w-6 h-6" fill="none" fill="red" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/200/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>`;
  }).join('');
} // export function generatePeopleList(people) {
//     return people
//         .sort( function(a, b) {
//             // Sort it by Month
//             return new Date (a.birthday).getMonth() - new Date (b.birthday).getMonth();
//         })
//         .map(
//             person => {
//                 // Get the suffix for the date 
//                 function nthDate(day) {
//                     if (day > 3 && day < 21) return "th";
//                     switch (day % 10) {
//                         case 1: return "st";
//                         case 2: return "nd";
//                         case 3: return "rd";
//                         default: return "th"; 
//                     }
//                 }
//                 // Get the birthday date
//                 const today = new Date();
//                 const currentDate = new Date(person.birthday);
//                 const currentDay = currentDate.getDate();
//                 const month = currentDate.getMonth();
//                 const year = currentDate.getFullYear();
//                 const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1} / ${year}`;
//                 const futureAge = today.getFullYear() - year;
//                 // ********** Counting date ******** \\
//                 // Counting how many days left untill the person's birthday
//                 const momentYear = today.getFullYear();
//                 const birthDayDate = new Date(momentYear, month, currentDay );
//                 let oneDay = 1000 * 60 * 60 * 24;
//                 const getTheDate = birthDayDate.getTime() - today.getTime();
//                 const dayLeft = Math.ceil(getTheDate / oneDay);
//                 return `
//                     <section data-id="${person.id}" class="person-list"> 
//                         <div>
//                             <img class="rounded" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
//                         </div>
//                         <div>
//                             <span class="persoName">${person.lastName} ${person.firstName}</span>
//                             <p>
//                                 Turns ${futureAge <= 1 ? futureAge + " " + "year" : futureAge + " " + "years"} old on the 
//                                 ${new Date(person.birthday)
//                                     .toLocaleString("en-US", 
//                                 { month: "long" })}
//                                 <time datetime="${fullDate}">
//                                     ${new Date(person.birthday)
//                                         .toLocaleString("en-US", 
//                                         { day: "numeric" })}<sup>${nthDate(currentDay)}</sup>
//                                 </time> 
//                             </p>
//                         </div>
//                         <div class="wrapper-actions">
//                             <span>
//                                 ${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" :
//                                 dayLeft <= 1 ? dayLeft + " " + "day" :
//                                 dayLeft + 'days'}
//                             </span>
//                             <div class="actions">
//                                 <button class="edit" data-id="${person.id}">
//                                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                                 </button>
//                                 <button class="delete" data-id="${person.id}">
//                                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </section>
//                 `
//             }
//         )
//         .join('');
// }
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _elements = require("./Elements/elements.js");

var _html = require("./Elements/html.js");

// Fetching the data from the people.json
async function fetchPeopleList() {
  const response = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json");
  const data = await response.json();
  let persons = data; // Push the html into the container

  const showPeople = () => {
    const html = (0, _html.populatePersons)(persons);
    _elements.container.innerHTML = html;
  };

  showPeople(); // Store the data inside of local storage

  const initLocalStorage = () => {
    const stringFromLS = localStorage.getItem('persons');
    const lsItems = JSON.parse(stringFromLS);

    if (lsItems) {
      persons = lsItems;
      showPeople();
    }

    _elements.container.dispatchEvent(new CustomEvent('listUpdated'));
  };

  const updateLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  }; // Update the LocalStorage by adding event Listener


  _elements.container.addEventListener("listUpdated", updateLocalStorage);

  initLocalStorage();

  async function destroyPopup(popup) {
    popup.classList.remove('open');
    popup.remove();
    popup = null;
  } // export async function destroyPopup(popup) {
  // 	popup.classList.remove('open'); 
  // 	await wait(500);
  // 	popup.remove();
  // 	popup = null;
  // }
  // Creating an edit function in order to give access to the user to edit the lists


  const editFunction = e => {
    if (e.target.closest('.edit')) {
      const article = e.target.closest(".article");
      const id = article.dataset.id;
      editPartnerPopup(id);
    }
  }; // Activating the edit button by showing the form


  const editPartnerPopup = idToEdit => {
    // Finding the object mathes to the id
    const editpersons = persons.find(person => person.id == idToEdit);
    return new Promise(async resolve => {
      // Creating a form element to contain the form
      const popup = document.createElement('form');
      popup.classList.add('popup');
      const newDate = new Date(editpersons.birthday).toLocaleDateString();
      popup.insertAdjacentHTML('afterbegin', `<fieldset>
					<ul>
						<li>
							<h2>Edit ${editpersons.lastName} ${editpersons.firstName}</h2>
						</li>
						<li>
							<label>First Name:</label>
							<input type="text" name="lastName" value="${editpersons.lastName}">
							</li>
							<li>
							<label>Last Name:</label>
							<input type="text" name="firstName" value="${editpersons.firstName}">
						</li>
						<li>
							<label>Date of birthday:</label>
							<input type="text" name="birthday" value="${newDate}">
						</li>
						<li>
							<button class="submit" type="submit" data-id="${editpersons.id}">Save changes</button>
							<button class="cancel" type="button" data-id="${editpersons.id}">Cancel</button>
						</li>
					</ul>
				</fieldset>
			`); // Adding addeventListener in to cancel button in to that button

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          destroyPopup(popup);
        }
      }); // Adding eventListener in the popup form

      popup.addEventListener('submit', e => {
        e.preventDefault();
        editpersons.firstName = popup.firstName.value;
        editpersons.lastName = popup.lastName.value;
        editpersons.birthday = popup.birthday.value;
        showPeople(editpersons);

        _elements.container.dispatchEvent(new CustomEvent('listUpdated'));

        destroyPopup(popup);
      }, {
        once: true
      }); // Adding the popup in the html

      document.body.appendChild(popup); // Adding the open class to the popup form

      popup.classList.add('open');
    });
  }; // Creating the delete function


  const deletePartner = e => {
    // Grabbing the delete button with event delegation
    if (e.target.closest(".delete")) {
      const delBtn = e.target.closest('.delete');
      const id = delBtn.dataset.id;
      deleteDeletePopup(id);
    }
  }; // Finction that run the delete function


  const deleteDeletePopup = async id => {
    return new Promise(async function (resolve) {
      // create confirmation popup here
      const deletePopup = document.createElement('form');
      deletePopup.classList.add('popup'); // Insert the html inside the popup form

      deletePopup.insertAdjacentHTML('afterbegin', `<ul class="extra_wrapper">
					<li>
						<h2>Are you sure you want to delete this?</h2>
					</li>
					<li>
						<button type="submit" class="delete">delete</button>
						<button type="button" class="cancel">cancel</button>
					</li>
				</ul>`); // Append the deletePopup inside of the html 

      document.body.appendChild(deletePopup);
      deletePopup.classList.add('open');
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          destroyPopup(deletePopup);
        }
      });
      deletePopup.addEventListener('click', e => {
        if (e.target.closest('button.delete')) {
          e.preventDefault();
          const myPersons = persons.filter(person => person.id != id);
          persons = myPersons;
          localStorage.setItem('persons', JSON.stringify(persons));
          showPeople(myPersons);
          destroyPopup(deletePopup);
        }
      });
    });
  };

  const AddBtn = e => {
    if (e.target.closest('button.save')) {
      newList();
    }
  }; // Creating a new form for the add list


  const newList = e => {
    const popupAdd = document.createElement('form');
    popupAdd.classList.add('popup');
    popupAdd.insertAdjacentHTML('afterbegin', `<ul class="wrapper">
				<li>
					<label>Picture</label><br>
					<input type="url" class="image" placeholder="url" name="pic" value="" required>
				</li>
				<li>
					<label>Last Name</label><br>
					<input type="text" class="last_name" name="lastName" value="" placeholder="last name" required>
				</li>
				<li>
					<label>First Name</label><br>
					<input type="text" class="first_name" name="firstName" placeholder="first name" value="" required>
				</li>
				<li>
					<label>The birthday date: </label><br> 
					<input type="date" name="birthday" required>
				</li>
				<li>
					<button type="submit" class="save">save list</button>
					<button type="button" class="cancel_list">cancel</button>
				</li>
			</ul>`);
    window.addEventListener('click', e => {
      if (e.target.closest('button.cancel_list')) {
        destroyPopup(popupAdd);
      }
    });
    popupAdd.addEventListener('submit', e => {
      e.preventDefault();
      const newForm = e.currentTarget;
      const newList = {
        id: Date.now(),
        lastName: newForm.lastName.value,
        firstName: newForm.firstName.value,
        picture: newForm.pic.value,
        birthday: newForm.birthday.value
      };
      persons.push(newList);

      _elements.container.dispatchEvent(new CustomEvent('listUpdated'));

      showPeople(persons);
      destroyPopup(popupAdd);
    });
    document.body.appendChild(popupAdd);
    popupAdd.classList.add('open');
  };

  const addBtn = document.querySelector('.add');
  addBtn.addEventListener('click', newList); // Filter the list by searching the lastName or the firstName of the person

  const filterName = () => {
    // Grabbing the value of the input
    const input = _elements.inputSearchName.value;
    const inputSearch = input.toLowerCase();
    const filterPersName = persons.filter(person => person.lastName.toLowerCase().includes(inputSearch) || person.firstName.toLowerCase().includes(inputSearch));
    const myHTML = (0, _html.populatePersons)(filterPersName);
    _elements.container.innerHTML = myHTML;
  };

  const filterMonth = () => {
    const select = _elements.filterByMonth.value;
    const filterPeople = persons.filter(person => {
      const month = new Date(person.birthday).toLocaleString("en-US", {
        month: "long"
      });
      return month.toLowerCase().includes(select.toLowerCase());
    });
    const html = (0, _html.populatePersons)(filterPeople);
    _elements.container.innerHTML = html;
  }; // Adding event Listener to the edit fuction, delete fuction


  window.addEventListener("click", editFunction);
  window.addEventListener("click", deletePartner);
  window.addEventListener("submit", AddBtn); // Event listener for the input and search and reset

  _elements.inputSearchName.addEventListener("input", filterName);

  _elements.filterByMonth.addEventListener("input", filterMonth);
}

fetchPeopleList();
},{"./Elements/elements.js":"Elements/elements.js","./Elements/html.js":"Elements/html.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55815" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map