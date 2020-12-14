// Create a function to store the html so that you can reuse it again
export function populatePersons(people) {
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
                        Turns <span>${futureAge}</span> on ${new Date(person.birthday).toLocaleString("en-US", { month: "long" })} <time datetime="${fullDate}"> ${new Date(person.birthday).toLocaleString("en-Us", { day: "numeric" })}${nthDate(date)}</time>
                         
                    </p>    
                </li>
                <li>
                    <ul>
                        <li>
                            in ${dayLeft < 0 ? dayLeft * -1 + " " + "days" : dayLeft + " days"}</li>
                        </li>
                        <li>
                            <div class="edit" value="${person.id}" data-id="${person.id}">
                                <svg viewBox="0 0 20 20" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                            </div>
                            <div class="delete" data-id="${person.id}">
                                <svg viewBox="0 0 20 20" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>`;}).join('');
}
