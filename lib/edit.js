// // Activating the edit button by showing the form
// export const editPartnerPopup = idToEdit => {
//     // Finding the object mathes to the id
//     const editpersons = persons.find(person => person.id == idToEdit);
//     return new Promise(async resolve => {
//         // Creating a form element to contain the form
//         const popup = document.createElement('form');
//         popup.classList.add('popup');
//         popup.insertAdjacentHTML('afterbegin',
//             `<fieldset>
//             <ul>
//                 <li>
//                     <h1>Edit the list</h1>
//                 </li>
//                 <li>
//                     <label>Last Name</label>
//                     <input type="text" name="lastName" value="${editpersons.lastName}">
//                 </li>
//                 <li>
//                     <label>First Name</label>
//                 <input type="text" name="firstName" value="${editpersons.firstName}">
//                 </li>
//                 <li>
//                     <label>Date of birthday</label>
//                     <input type="text" name="birthday" value="${editpersons.birthday}">
//                 </li>
//                 <li>
//                     <button class="submit" type="submit" data-id="${editpersons.id}">Submit</button>
//                     <button class="cancel" type="button" data-id="${editpersons.id}">Cancel</button>
//                 </li>
//             </ul>
//         </fieldset>`);

//         // Adding addeventListener in to cancel button in to that button
//         window.addEventListener('click', e => {
//             if (e.target.closest('button.cancel')) {
//                 destroyPopup(popup);
//             }
//         });


//         // Adding eventListener in the popup form
//         popup.addEventListener('submit', e => {
//             e.preventDefault();
//             editpersons.firstName = popup.firstName.value;
//             editpersons.lastName = popup.lastName.value;
//             // editpersons.lastName = popup.birthday.value;
//             showPeople(editpersons);
//             destroyPopup(popup);
//             container.dispatchEvent(new CustomEvent('listUpdated'));
//         }, { once: true });
//         // Adding the popup in the html
//         document.body.appendChild(popup);
//         // Adding the open class to the popup form
//         popup.classList.add('open');
//     });
// };