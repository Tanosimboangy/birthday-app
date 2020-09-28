// Import the data from people.json
const dataJson = './people.json';
// Grabbing the container element
const container = document.querySelector(".container");
// Fetching the data from the people.json
async function fetchPeopleList() {
    const response = await fetch(dataJson);
	const data = await response.json();
	let persons = data;
	// Create a function to store the html so that you can reuse it again
	function populatePersons(people) {
		return people.map(person => {
			function nthDate(day) {
				if (day > 3 && day < 21) return "th";
				switch (day % 10) {
					case 1: return "st";
					case 2: return "nd";
					case 3: return "rd";
					default: return "th"; 
				}
			}

			// Getting the date with the day, month, year
			const date = new Date();
			const dateNow = new Date(person.birthday);
			const day = dateNow.getDate();
			const months = dateNow.getMonth();
			const year = dateNow.getFullYear();
			const fullDate = `${day} / ${months + 1} / ${year}`;
			const personAge = date.getFullYear() - year;
			const futureAge = personAge;

			// Counting the days until the birthday comes
			const Year = dateNow.getFullYear();
			const birthDayDate = new Date(Year, months, day);
			let oneDay=1000*60*60*24;
			const dayLeft = Math.ceil((birthDayDate.getTime() - dateNow.getTime()) / (oneDay));

			return `
			<article data-id="${person.id}" value="${person.id}" class="article">
				<img src="${person.picture}">
				<p><b>${person.lastName}</b> ${person.firstName} will turn ${futureAge} years old on the ${new Date(person.birthday).toLocaleString("en-US", { month: "long" })}<time datetime="${fullDate}"> ${new Date(person.birthday).toLocaleString("en-US", { day: "numeric" })}<sup>${nthDate(dateNow)}</sup></time></p>
				<td><time datetime="${fullDate}">${fullDate}</time></td>
				<td>${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : dayLeft + " days"}
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

	// Creating an edit function
	// Grabbing the edit button by event delegation
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

	const AddBtn = e => {
        if (e.target.closest('button.save')) {
            newList();
        }
    }

	// Creating a new form for the add list
	const newList = (e) => {
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML('afterbegin', 
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
					<input type="date" name="birthday">
				</li>
				<li>
					<button type="submit" class="save">save</button>
					<button type="button" class="cancel_list">cancel</button>
				</li>
			</ul>`);
			document.body.appendChild(popup);
			popup.classList.add('open');

			window.addEventListener('click', e => {
                if (e.target.closest('button.cancel_list')) {
                    destroyPopup(popup);
                }
            })

            popup.addEventListener('submit', e => {
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
				destroyPopup(popup);
				showPeople(persons);
			});
		};
	
	const addBtn = document.querySelector('.add');
	addBtn.addEventListener('click', newList);

	// Adding event Listener to the edit fuction, delete fuction
	window.addEventListener("click", editFunction);
	window.addEventListener("click", deletePartner);
	window.addEventListener("click", AddBtn);
}
fetchPeopleList();


