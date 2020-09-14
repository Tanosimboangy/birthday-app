const dataJson = './people.json';
const container = document.querySelector(".container");

async function fetchPeopleList() {
    const response = await fetch(dataJson);
    const data = await response.json();
    return data;
}

async function populatePerson() {
    const lists = await fetchPeopleList();
    const html = lists.map(person => {
        return `
        <article data-id="${person.id}">
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
    container.innerHTML = html;
}
populatePerson();




const editPersonList = (e) => {
    console.log(e.target);
    const editButton = e.target.closest("button .edit");
    console.log(editButton);
	if (editButton) {
        const article = e.target.closest('article');
        console.log(article);
		const idToEdit = article.dataset.id;
		console.log(idToEdit);
		//  editPartnerPopup(idToEdit);
	}
};
editPersonList();
window.addEventListener('click', editPersonList);

// async function destroyPopup(popup) {
// 	popup.classList.remove('open');
// 	popup.remove();
// }

// const editPartnerPopup = idToEdit => {
//     const lists = await fetchPeopleList();
// 	const editpersons = lists.find(person => person.id === idToEdit);
// 	console.log(editpersons);
// 	return new Promise(async resolve => {
// 	const popup = document.createElement('form');
// 	popup.classList.add('popup');
// 	popup.insertAdjacentHTML('afterbegin', 
// 		`<fieldset>
// 			<label>Last Name</label>
// 			<input type="text" name="lastName" value="${editpersons.lastName}">
// 			<label>First Name</label>
// 			<input type="text" name="firstName" value="${editpersons.firstName}">
// 			<label></label>
// 			<input type="text" name="firstName" value="${editpersons.firstName}">
// 			<button class="submit" data-id="${editpersons.id}">Submit</button>
// 		</fieldset>`);

// 		// const CancelButton = document.createElement('button');
// 		// CancelButton.type = 'button';
// 		// CancelButton.classList.add('cancel');
// 		// CancelButton.textContent = 'cancel';
// 		// popup.appendChild(CancelButton);
// 		// CancelButton.addEventListener('click', () => { resolve();
// 		// 		destroyPopup(popup);
// 		// 	},	{ once: true });

// 		// popup.addEventListener('submit', e => { 
// 		// 	e.preventDefault();
// 		// 	editpersons.firstName = popup.firstName.value;
// 		// 	editpersons.lastName = popup.lastName.value;
// 		// 	editpersons.jobTitle = popup.jobTitle.value;
// 		// 	editpersons.jobArea = popup.jobArea.value;
// 		// 	editpersons.phone = popup.phone.value;
// 		// 	displayList(persons);
// 		// 	destroyPopup(popup);
// 		// }, { once: true });
// 		// document.body.appendChild(popup);
// 		// popup.classList.add('open');
// 	});
// };

