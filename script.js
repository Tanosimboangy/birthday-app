// 1 Import the data
// 2 Display the data in the lists
// 3 Changing the numbers into date
// 4 Store the data into the local storage
// 5 Sort the data from the nearest to the farthest
// 6 Activate the edit button
// 7 Activate the delete button

// Import the data from people.json
const dataJson = './people.json';
const container = document.querySelector(".container");
async function fetchPeopleList() {
    const response = await fetch(dataJson);
	const data = await response.json();
	let persons = data;
	// Create a function to store the html so that you can reuse it again
	function populatePersons(people) {
		return people.map(person => {
			const date = new Date();
			let dateNow = new Date(person.birthday);
			const day = dateNow.getDate();
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][dateNow.getMonth()];
			console.log(months);
			const year = dateNow.getFullYear();
			const fullDate = `${day} / ${months} / ${year}`;
			const personAge = date.getFullYear() - year;
			const fututreAge = personAge;
			// const days = personAge;

			return `
			<article data-id="${person.id}" value="${person.id}" class="article">
				<img src="${person.picture}">
				<p><b>${person.lastName}</b> ${person.firstName} is born in <b>${year}</b>.<br>He will turn <b>${fututreAge}</b> years old on the <b>${day}</b> of <b>${months}</b></p>
				<p><b>${fullDate}</b></p>
				<button class="edit" value="${person.id}" data-id="${person.id}">
					<svg viewBox="0 0 20 20" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
				</button>
				<button class="delete" data-id="${person.id}">
					<svg viewBox="0 0 20 20" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
				</button>
			</article>`;}).join('');
	}

	// Push the html into the container
	const showPeople = () => {
		const html = populatePersons(persons);
		container.innerHTML = html;
	}
	showPeople();

	// Store the data the data inside of local storage
	const initLocalStorage = () => {
		const stringFromLS = localStorage.getItem('persons');
		const lsItems = JSON.parse(stringFromLS);
		if (lsItems) {
			persons = lsItems;
			showPeople();
		}
		// container.dispatchEvent(new CustomEvent('listUpdated'));
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
	}

	// Creating an edit function
	// Grabbing the edit button by event delegation
	const editFunction = e => {
		if (e.target.closest('.edit')) {
			const article = e.target.closest(".article");
			const id = article.dataset.id;
			console.log(id)
			editPartnerPopup(id);
		}
	}

	// Activating the edit button by showing the form
	const editPartnerPopup = idToEdit => {
		// Finding the object mathes to the id
		const editpersons = persons.find(person => person.id === idToEdit); 
		return new Promise(async resolve => {
		// Creating a form element to contain the form
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML('afterbegin', 
			`<fieldset>
				<h1>Edit the list</h1>
				<label>Last Name</label>
				<input type="text" name="lastName" value="${editpersons.lastName}">
				<label>First Name</label>
				<input type="text" name="firstName" value="${editpersons.firstName}">
				<label>Date of birthday</label>
				<input type="text" name="jobTitle" value="${editpersons.birthday}">
				<button class="submit" type="submit" data-id="${editpersons.id}">Submit</button>
			</fieldset>`);
			// Creating a cancel button 
			// Adding addeventListener in to that button
			const CancelButton = document.createElement('button');
			CancelButton.type = 'submit';
			CancelButton.classList.add('cancel');
			CancelButton.textContent = 'cancel';
			popup.appendChild(CancelButton);
			CancelButton.addEventListener('click', () => { resolve();
					destroyPopup(popup);
				},	{ once: true });
	
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
	};
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
		return new Promise(async function(resolve) {
		// create confirmation popup here
		const popup = document.createElement('form');
		popup.classList.add('popup');
		// Insert the html inside of the popup form
		popup.insertAdjacentHTML('afterbegin', 
			`<h2>Are you sure you want to delete this?</h2>`);
			const button = document.createElement("button");
			button.textContent = "delete";
			popup.appendChild(button);
			// popup.classList.add('open');
			button.addEventListener("click", e => {
				e.preventDefault();
				destroyPopup(popup);
				persons = persons.filter(person => person.id !== id);
				console.log(persons);
				showPeople();
				localStorage.setItem('persons', JSON.stringify(persons));
			});
			// Creating a new delete button for the form 
			const cancelbutton = document.createElement("button");
			cancelbutton.textContent = "cancel"
			popup.appendChild(cancelbutton);
			// Adding eventListener in the delete button
			cancelbutton.addEventListener("click", e => {
				e.preventDefault();
				destroyPopup(popup);
			});
		// Append the popup inside of the html 
		document.body.appendChild(popup);
		popup.classList.add('open');
		});
	};

	// Creating a new form for the add list
	const newList = (e) => {
		const popup = document.createElement('form');
		console.log(popup);
		popup.classList.add('popup');

		popup.insertAdjacentHTML('afterbegin', 
			`<ul class="wrapper">
				<li>
					<label>Picture</label><br>
					<input type="text" class="image" value="https://">
				</li>
				<li>
					<label>Last Name</label><br>
					<input type="text" class="last_name" placeholder="last name">
				</li>
				<li>
					<label>First Name</label><br>
					<input type="text" class="first_name" placeholder="first name">
				</li>
				<li>
					<label>The birthday date: </label><br>
					<input type="date"> 
				</li>
				<li>
					<button type="submit" class="submit">submit</button>
				</li>
			</ul>`);

		document.body.appendChild(popup);
		popup.classList.add('open');
	};

	// const addingList = e => {
	// 	console.log("here it is");
	// }

	// const newSubmitBtn = e => {
	// 	e.preventDefault();
	// 	const sub = e.target.closest('.submit');
	// 	console.log(sub);
	// }
	
	const addBtn = document.querySelector('.add');
	addBtn.addEventListener('click', newList);

	// Adding event Listener to the edit fuction
	window.addEventListener("click", editFunction);
	// Adding event Listener to the delete fuction
	window.addEventListener("click", deletePartner);
	// // Adding event Listener to the submit fuction
	// window.addEventListener("click", newSubmitBtn);
}
fetchPeopleList();

// var date = new Date(1546108200 * 1000);
// console.log(date.toUTCString());
