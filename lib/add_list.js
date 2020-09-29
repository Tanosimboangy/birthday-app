// // Creating a new form for the add list
// const newList = (e) => {
//     const popup = document.createElement('form');
//     popup.classList.add('popup');
//     popup.insertAdjacentHTML('afterbegin',
//         `<ul class="wrapper">
//             <li>
//                 <label>Picture</label><br>
//                 <input type="url" class="image"  name="pic" value="https://picsum.photos/seed/picsum/150/150" required>
//             </li>
//             <li>
//                 <label>Last Name</label><br>
//                 <input type="text" class="last_name" name="lastName" value="jacquit" placeholder="last name" required>
//             </li>
//             <li>
//                 <label>First Name</label><br>
//                 <input type="text" class="first_name" name="firstName" placeholder="first name" value="Valentino" required>
//             </li>
//             <li>
//                 <label>The birthday date: </label><br> 
//                 <input type="date" name="birthday" required>
//             </li>
//             <li>
//                 <button type="submit" class="save">save</button>
//                 <button type="button" class="cancel_list">cancel</button>
//             </li>
//         </ul>`);

//     window.addEventListener('click', e => {
//         if (e.target.closest('button.cancel_list')) {
//             destroyPopup(popup);
//         }
//     })

//     popup.addEventListener('submit', e => {
//         e.preventDefault();
//         const newForm = e.currentTarget;
//         console.log(newForm);

//         const newList = {
//             id: Date.now(),
//             lastName: newForm.lastName.value,
//             firstName: newForm.firstName.value,
//             picture: newForm.pic.value,
//             birthday: newForm.birthday.value,
//         }

//         persons.push(newList);
//         container.dispatchEvent(new CustomEvent('listUpdated'));
//         destroyPopup(popup);
//         showPeople(persons);
//     });
//     document.body.appendChild(popup);
//     popup.classList.add('open');
// };
