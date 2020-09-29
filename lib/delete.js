// // Finction that run the delete function
// export const deleteDeletePopup = async id => {
//     return new Promise(async function (resolve) {
//         // create confirmation popup here
//         const form = document.createElement('form');
//         form.classList.add('popup');
//         // Insert the html inside of the popup form
//         form.insertAdjacentHTML('afterbegin',
//             `<ul class="extra_wrapper">
//             <li>
//                 <h2>Are you sure you want to delete this?</h2>
//             </li>
//             <li>
//                 <button type="button" class="cancel">cancel</button>
//                 <button type="button" class="delete">delete</button>
//             </li>
//         </ul>`);
//         // Append the popup inside of the html 
//         document.body.appendChild(form);
//         form.classList.add('open');

//         window.addEventListener('click', e => {
//             if (e.target.closest('button.delete')) {
//                 e.preventDefault();
//                 const myPersons = persons.filter(person => person.id != id);
//                 persons = myPersons;
//                 showPeople(myPersons);
//                 localStorage.setItem('persons', JSON.stringify(persons));
//                 console.log("This is deleted");
//                 form.classList.remove('open');
//                 form.remove();
//             }
//             if (e.target.closest('button.cancel')) {
//                 form.classList.remove('open');
//                 form.remove();
//             } 
//         });
//     });
// };