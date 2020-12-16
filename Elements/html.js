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
        const dayLeft = Math.ceil((birthDayDate.getTime() - date.getTime()) / (oneDay)) + 365 ;

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
                            in ${dayLeft < 0 ? dayLeft * -1 + " " + "days" : dayLeft + " days"}</li>
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
