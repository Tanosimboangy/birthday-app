import { container, inputSearchName, filterByMonth, formFilter } from './Elements/elements.js';
import { populatePersons } from './Elements/html.js';

// Fetching the data from the people.json
async function fetchPeopleList() {
	const response = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json");
	const data = await response.json();
	let persons = data;

	// Push the html into the container
	const showPeople = () => {
		const html = populatePersons(persons);
		container.innerHTML = html;
	}
	showPeople();

	// Store the data inside of local storage
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
	// Update the LocalStorage by adding event Listener
	container.addEventListener("listUpdated", updateLocalStorage);
	initLocalStorage();

	async function destroyPopup(popup) {
		popup.classList.remove('open');
		popup.remove();
		popup = null;
	}

	// Creating an edit function in order to give access to the user to edit the lists
	const editFunction = e => {
		if (e.target.closest('.edit')) {
			const article = e.target.closest(".article");
			const id = article.dataset.id;
			editPartnerPopup(id);
		}
	}

	// Activating the edit button by showing the form
	const editPartnerPopup = (idToEdit) => {
		// Finding the object mathes to the id
		const editpersons = persons.find(person => person.id == idToEdit);
		return new Promise(async resolve => {
			// Creating a form element to contain the form
			const popup = document.createElement('form');
			popup.classList.add('popup');
			const newDate = new Date(editpersons.birthday).toLocaleDateString();
			popup.insertAdjacentHTML('afterbegin',
				`<fieldset>
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
			`);

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
				editpersons.birthday= popup.birthday.value;
				showPeople(editpersons);
				container.dispatchEvent(new CustomEvent('listUpdated'));
				destroyPopup(popup)
			}, { once: true });
			// Adding the popup in the html
			document.body.appendChild(popup);
			// Adding the open class to the popup form
			popup.classList.add('open');
		});
	}

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
			const deletePopup = document.createElement('form');
			deletePopup.classList.add('popup');
			// Insert the html inside the popup form
			deletePopup.insertAdjacentHTML('afterbegin',
				`<ul class="extra_wrapper">
					<li>
						<h2>Are you sure you want to delete this?</h2>
					</li>
					<li>
						<button type="submit" class="delete">delete</button>
						<button type="button" class="cancel">cancel</button>
					</li>
				</ul>`);
			// Append the deletePopup inside of the html 
			document.body.appendChild(deletePopup);
			deletePopup.classList.add('open');

			window.addEventListener('click', e => {
				if (e.target.closest('button.cancel')) {
					destroyPopup(deletePopup);
				}
			});

			deletePopup.addEventListener('click', e => {
				if (e.target.closest('button.delete')) {
					destroyPopup(deletePopup);
					// e.preventDefault();
					const myPersons = persons.filter(person => person.id != id);
					persons = myPersons;
					showPeople(myPersons);
					localStorage.setItem('persons', JSON.stringify(persons));
					console.log(destroyPopup, "I am deleted");
				}
			});
		});
	};

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
		})

		popupAdd.addEventListener('submit', e => {
			e.preventDefault();
			const newForm = e.currentTarget;
			const newList = {
				id: Date.now(),
				lastName: newForm.lastName.value,
				firstName: newForm.firstName.value,
				picture: newForm.pic.value,
				birthday: newForm.birthday.value,
			}

			persons.push(newList);
			container.dispatchEvent(new CustomEvent('listUpdated'));
			showPeople(persons);
			destroyPopup(popupAdd);
		});
		document.body.appendChild(popupAdd);
		popupAdd.classList.add('open');
	};
	const addBtn = document.querySelector('.add');
	addBtn.addEventListener('click', newList);

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

	// Adding event Listener to the edit fuction, delete fuction
	window.addEventListener("click", editFunction);
	window.addEventListener("click", deletePartner);
	window.addEventListener("submit", AddBtn);
	// Event listener for the input and search and reset
	inputSearchName.addEventListener("input", filterName);
	filterByMonth.addEventListener("input", filterMonth);
}
fetchPeopleList();