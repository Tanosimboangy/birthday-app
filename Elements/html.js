import {differenceInCalendarYears, differenceInCalendarDays, compareAsc} from 'date-fns';
import {getNextBirthday} from "./util.js"

// Create a function to store the html so that you can reuse it again
export function populatePersons(people) {
    let sortedPeople = people;

    sortedPeople.sort((a, b) => {
        let dayToBirthdayA = differenceInCalendarDays(getNextBirthday(a.birthday), new Date());
        let dayToBirthdayB = differenceInCalendarDays(getNextBirthday(b.birthday), new Date());
        return compareAsc(dayToBirthdayA, dayToBirthdayB);
    })

    return sortedPeople.map(person => {
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
        const fullDate = `${day}/${months + 1}/${year}`;
        const personAge = date.getFullYear() - year;
        const futureAge = personAge;

        // Counting the days until the birthday comes
        const Year = date.getFullYear();
        const birthDayDate = new Date(Year, months, day);
        let oneDay = 1000*60*60*24;
        const dayLeft = Math.ceil((birthDayDate.getTime() - date.getTime()) / (oneDay));

        return `
        <article data-id="${person.id}" value="${person.id}" class="article">
            <ul>
                <li><img src="${person.picture}"></li>
                <li>
                    <h2>${person.lastName} ${person.firstName}</h2> 
                    <p>
                        Turns <span>${futureAge + 1}</span> on ${new Date(person.birthday).toLocaleString("en-US", { month: "long" })} <time datetime="${fullDate}"> ${new Date(person.birthday).toLocaleString("en-Us", { day: "numeric" })}${nthDate(date)}</time>
                         
                    </p>    
                </li>
                <li>
                    <ul>
                        <li>
                            in ${dayLeft < 0 ? dayLeft + 365 + " " + "days" : dayLeft + " days"}</li>
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
        </article>`;}).join('');
}









// export function generatePeopleList(people) {
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