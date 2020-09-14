const dataJson = './people.json';
const container = document.querySelector(".container");

async function fetchPeopleList() {
    const response = await fetch(dataJson);
    const data = await response.json();
    return data;
}

async function populatePerson() {
    const lists = await fetchPeopleList();
    console.log(lists);
    const html = lists.map(person => {
        return`
        <article>
            <img src="${person.picture}">
            <p>${person.lastName}</p>
            <p>${person.firstName}</p>
            <p>${person.birthday}</p>
        </article>
            `;}).join('');
    container.innerHTML = html;
}
populatePerson();