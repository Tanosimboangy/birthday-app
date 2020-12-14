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
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="blue" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M22,24H2v-4h20V24z M13.06,5.19l3.75,3.75L7.75,18H4v-3.75L13.06,5.19z M17.88,7.87l-3.75-3.75 l1.83-1.83c0.39-0.39,1.02-0.39,1.41,0l2.34,2.34c0.39,0.39,0.39,1.02,0,1.41L17.88,7.87z" enable-background="new"/></svg>
                        </div>
                        <div class="delete" data-id="${person.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="red" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>`;}).join('');
}
