// 1 Import the data
// 2 Display the data in the lists
// 3 Changing the numbers into date
// 4 Store the data into the local storage
// 5 Sort the data from the nearest to the farthest
// 6 Activate the edit button
// 7 Activate the delete button

const dataJson = './people.json';
const container = document.querySelector(".container");
async function fetchPeopleList() {
    const response = await fetch(dataJson);
	const data = await response.json();
	const persons = data;

	function populatePersons(people) {
		return people.map(person => {
			return `
			<article data-id="${person.id}" class="article">
				<img src="${person.picture}">
				<p>${person.lastName}</p>
				<p>${person.firstName}</p>
				<p>${person.birthday}</p>
				<button class="edit" data-id="${person.id}">
					<svg viewBox="0 0 20 20" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
				</button>
				<button class="delete" data-id="${person.id}">
					<svg viewBox="0 0 20 20" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
				</button>
			</article>`;}).join('');
	}

	const showPeople = () => {
		const html = populatePersons(persons);
		container.innerHTML = html;
	}
	showPeople();

	const initLocalStorage = () => {
		const stringFromLS = localStorage.getItem('persons');
		const lsItems = JSON.parse(stringFromLS);
		if (lsItems) {
			let persons = lsItems;
			showPeople();
		}
		container.dispatchEvent(new CustomEvent('listUpdated'));
	};
	const updateLocalStorage = () => {
		localStorage.setItem('persons', JSON.stringify(persons));
	};
	container.addEventListener("listUpdated", updateLocalStorage);
	initLocalStorage();


	
	const editFunction = e => {
		const editBtn = e.target.closest(".edit");
		console.log(editFunction);
		if (editBtn) {
			const article = e.target.closest('.article');
			console.log(article);
			const idToEdit = article.dataset.id;
			console.log(idToEdit);
			// editPartnerPopup(idToEdit);
		}
	}
	editFunction();
	window.addEventListener("click", editFunction);


}
fetchPeopleList();





// async function destroyPopup(popup) {
// 	popup.classList.remove('open');
// 	popup.remove();
// }


// const editPartnerPopup = async idToEdit => {
// 	const persons = await fetchPeopleList(dataJson);
// 	const editpersons = persons.find(person => person.id === idToEdit);
// 	// console.log(idToEdit);
// 	// console.log(editpersons);
// 	return new Promise(async resolve => {
// 	const popup = document.createElement('form');
// 	popup.classList.add('popup');
// 	popup.insertAdjacentHTML('afterbegin', 
// 		`<fieldset>
// 			<h1>Edit the list</h1>
// 			<label>Last Name</label>
// 			<input type="text" name="lastName" value="${editpersons.lastName}">
// 			<label>First Name</label>
// 			<input type="text" name="firstName" value="${editpersons.firstName}">
// 			<label>Job Title</label>
// 			<input type="text" name="jobTitle" value="${editpersons.birthday}">
// 			<button class="submit" type="submit" data-id="${editpersons.id}">Submit</button>
// 		</fieldset>`);
// 		// Creating a cancel button 
// 		// Adding addeventListener in to that button
// 		const CancelButton = document.createElement('button');
// 		CancelButton.type = 'submit';
// 		CancelButton.classList.add('cancel');
// 		CancelButton.textContent = 'cancel';
// 		popup.appendChild(CancelButton);
// 		CancelButton.addEventListener('click', () => { resolve();
// 				destroyPopup(popup);
// 			},	{ once: true });

// 		// Adding eventListener in the popup form
// 		popup.addEventListener('submit', e => {
// 			e.preventDefault();
// 			editpersons.firstName = popup.firstName.value;
// 			// console.log(editpersons);
// 			// console.log(editpersons.firstName);
// 			editpersons.lastName = popup.lastName.value;
// 			// console.log(editpersons.lastName);
// 			populatePerson(editpersons);
// 			// initLocalStorage(editpersons);
// 			destroyPopup(popup);
// 		}, { once: true });
// 		document.body.appendChild(popup);
// 		popup.classList.add('open');
// 	});
// };
// editPartnerPopup();


































// const deletePartner = e => {
// 	// Grabbing the delete button with event delegation
// 	const remove = e.target.closest(".delete");
// 	if (remove) {
// 		const delBtn = remove.closest('.delete');
// 		console.log(delBtn);
// 		const id = delBtn.dataset.id;
// 		deleteDeletePopup(id);
// 	}
// }

// const deleteDeletePopup = async id => {
// 	// const persons = await fetchPeopleList();
// 	return new Promise(async function(resolve) {
// 	// create confirmation popup here
// 	const popup = document.createElement('form');
// 	popup.classList.add('popup');
// 	// Insert the html inside of the popup form
// 	popup.insertAdjacentHTML('afterbegin', 
// 		`<h2>Are you sure you want to delete this?</h2>`);
// 		const button = document.createElement("button");
// 		button.textContent = "delete"
// 		popup.appendChild(button);
// 		popup.classList.add('open');
// 		button.addEventListener("click", (e) => {
// 			e.preventDefault();
// 			const newList = lists.filter(person => person.id !== id);
// 			populatePerson(newList);
// 			popup.classList.remove("open");
// 		});

// 		const cancelbutton = document.createElement("button");
// 		cancelbutton.textContent = "cancel"
// 		popup.appendChild(cancelbutton);
// 		cancelbutton.addEventListener("click", (e) => {
// 			e.preventDefault();
// 			popup.classList.remove("open");
// 		});
// 	// Append the popup inside of the html 
// 	document.body.appendChild(popup);
// 	});
// };


// window.addEventListener("click", deletePartner);

// var date = new Date(1546108200 * 1000);
// console.log(date.toUTCString());