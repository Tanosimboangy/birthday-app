import { container, dataJson, inputSearchName, filterByMonth, resetBtn, formFilter } from './lib/elements.js';

// Importing these files
import { populatePersons } from './lib/html.js';

// Fetching the data from the people.json
async function fetchPeopleList() {
	const response = await fetch(dataJson);
	const data = await response.json();
	let persons = data;

	// Push the html into the container
	const showPeople = () => {
		const html = populatePersons(persons);
		container.innerHTML = html;
	}
	
	showPeople();

	// *************** LOCAL STORAGE **************** //

	// Store the data the data inside of local storage
	const initLocalStorage = () => {
		const stringFromLS = localStorage.getItem('persons');
		const lsItems = JSON.parse(stringFromLS);
		if (lsItems) {
			persons = lsItems;
			showPeople();
		}
		container.dispatchEvent(new CustomEvent('listUpdated'));
	};

	const updateLocalStorage = () => {
		localStorage.setItem('persons', JSON.stringify(persons));
	};
	// Adding eventListner in the updateLocalStorage
	container.addEventListener("listUpdated", updateLocalStorage);
	initLocalStorage();

	async function destroyPopup(popup) {
		popup.classList.remove('open');
		popup.remove();
		popup = null;
	}

	// **************** EDIT PERSON **************** //

	// Creating an edit function by grabbing the edit button using event delegation
	const editFunction = e => {
		if (e.target.closest('.edit')) {
			const article = e.target.closest(".article");
			const id = article.dataset.id;
			editPartnerPopup(id);
		}
	}

	// Activating the edit button by showing the form
	const editPartnerPopup = idToEdit => {
		// Finding the object mathes to the id
		const editpersons = persons.find(person => person.id == idToEdit);
		return new Promise(async resolve => {
			// Creating a form element to contain the form
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin',
				`<fieldset>
				<ul>
					<li>
						<h1>Edit the list</h1>
					</li>
					<li>
						<label>Last Name</label>
						<input type="text" name="lastName" value="${editpersons.lastName}">
					</li>
					<li>
						<label>First Name</label>
					<input type="text" name="firstName" value="${editpersons.firstName}">
					</li>
					<li>
						<label>Date of birthday</label>
						<input type="text" name="birthday" value="${editpersons.birthday}">
					</li>
					<li>
						<button class="submit" type="submit" data-id="${editpersons.id}">Submit</button>
						<button class="cancel" type="button" data-id="${editpersons.id}">Cancel</button>
					</li>
				</ul>
			</fieldset>`);

			// Adding addeventListener in to cancel button in to that button
			window.addEventListener('click', e => {
				if (e.target.closest('button.cancel')) {
					destroyPopup(popup);
				}
			});


			// Adding eventListener in the popup form
			popup.addEventListener('submit', e => {
				e.preventDefault();
				editpersons.firstName = popup.firstName.value;
				editpersons.lastName = popup.lastName.value;
				// editpersons.lastName = popup.birthday.value;
				showPeople(editpersons);
				destroyPopup(popup);
				container.dispatchEvent(new CustomEvent('listUpdated'));
			}, { once: true });
			// Adding the popup in the html
			document.body.appendChild(popup);
			// Adding the open class to the popup form
			popup.classList.add('open');
		});
	}

	// ******************* DELETE PERSON ***************** /

	// Creating the delete function
	const deletePartner = e => {
		// Grabbing the delete button with event delegation
		if (e.target.closest(".delete")) {
			const delBtn = e.target.closest('.delete');
			const id = delBtn.dataset.id;
			deleteDeletePopup(id);
		}
	}
	// Finction that run the delete function
	const deleteDeletePopup = async id => {
		return new Promise(async function (resolve) {
			// create confirmation popup here
			const popup = document.createElement('form');
			popup.classList.add('popup');
			// Insert the html inside the popup form
			popup.insertAdjacentHTML('afterbegin',
				`<ul class="extra_wrapper">
				<li>
					<h2>Are you sure you want to delete this?</h2>
				</li>
				<li>
					<button type="button" class="cancel">cancel</button>
					<button type="button" class="delete">delete</button>
				</li>
			</ul>`);
			// Append the popup inside of the html 
			document.body.appendChild(popup);
			popup.classList.add('open');

			window.addEventListener('click', e => {
				if (e.target.closest('button.delete')) {
					destroyPopup(popup);
					e.preventDefault();
					const myPersons = persons.filter(person => person.id != id);
					persons = myPersons;
					showPeople(myPersons);
					localStorage.setItem('persons', JSON.stringify(persons));
				}
				if (e.target.closest('button.cancel')) {
					destroyPopup(popup);
				}
			});
		});
	};

	// *************************** ADDING PERSON TO THE LIST *************************** //

	const AddBtn = e => {
		if (e.target.closest('button.save')) {
			newList();
		}
	}
	
	// Creating a new form for the add list
	const newList = (e) => {
		const popupAdd = document.createElement('form');
		popupAdd.classList.add('popup');
		popupAdd.insertAdjacentHTML('afterbegin',
			`<ul class="wrapper">
				<li>
					<label>Picture</label><br>
					<input type="url" class="image"  name="pic" value="https://picsum.photos/seed/picsum/150/150" required>
				</li>
				<li>
					<label>Last Name</label><br>
					<input type="text" class="last_name" name="lastName" value="jacquit" placeholder="last name" required>
				</li>
				<li>
					<label>First Name</label><br>
					<input type="text" class="first_name" name="firstName" placeholder="first name" value="Valentino" required>
				</li>
				<li>
					<label>The birthday date: </label><br> 
					<input type="date" name="birthday" required>
				</li>
				<li>
					<button type="submit" class="save">save</button>
					<button type="button" class="cancel_list">cancel</button>
				</li>
			</ul>`);

		window.addEventListener('click', e => {
			if (e.target.closest('button.cancel_list')) {
				destroyPopup(popupAdd);
			}
		})

		// 
		popupAdd.addEventListener('submit', e => {
			e.preventDefault();
			const newForm = e.currentTarget;
			console.log(newForm);

			const newList = {
				id: Date.now(),
				lastName: newForm.lastName.value,
				firstName: newForm.firstName.value,
				picture: newForm.pic.value,
				birthday: newForm.birthday.value,
			}

			persons.push(newList);
			container.dispatchEvent(new CustomEvent('listUpdated'));
			destroyPopup(popupAdd);
			showPeople(persons);
		});
		document.body.appendChild(popupAdd);
		popupAdd.classList.add('open');
	};
	const addBtn = document.querySelector('.add');
	addBtn.addEventListener('click', newList);

	// ****************************** FILTER EVENTS ************************************ //

	// Filter the list by searching the lastName or the firstName of the person
	const filterName = () => {
		// Grabbing the value of the input
		const input = inputSearchName.value;
		const inputSearch = input.toLowerCase();
		const filterPersName = persons.filter(person => person.lastName.toLowerCase().includes(inputSearch) || person.firstName.toLowerCase().includes(inputSearch));
		const myHTML = populatePersons(filterPersName);
        container.innerHTML = myHTML;
	}

	const filterMonth = () => {
		const select = filterByMonth.value;
		const filterPeople = persons.filter(person => {
			const month = new Date(person.birthday).toLocaleString("en-US", { month: "long" });
			return month.toLowerCase().includes(select.toLowerCase());
		});
		const html = populatePersons(filterPeople);
		container.innerHTML = html;
	}

	const reset = e => {
		console.log("here it is ee!");
		formFilter.reset();
		showPeople();
	}

	// ***************************** ADD EVENT LISTENER ********************************** //

	// Adding event Listener to the edit fuction, delete fuction
	window.addEventListener("click", editFunction);
	window.addEventListener("click", deletePartner);
	window.addEventListener("click", AddBtn);
	// Event listener for the input and search and reset
	inputSearchName.addEventListener("input", filterName);
	filterByMonth.addEventListener("input", filterMonth);
	resetBtn.addEventListener("click", reset);
}
fetchPeopleList();