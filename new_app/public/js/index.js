const container = document.getElementById('container');

fetch('http://localhost:3000/get_anime')
    .then(response => response.json())
    .then(response => renderAnimeList(response.data.body))
    .catch(error => console.log(error))


const renderAnimeList = data => {
    data.map(item => {
        const card = document.createElement('div');
        card.className = 'card'

        const {title, description, director, release_date} = item;

        const cardTitle = document.createElement('p')
        cardTitle.innerText = title;
        cardTitle.className = 'title'

        const cardDescription = document.createElement('p')
        cardDescription.innerText = description;
        cardDescription.className = 'description';

        const cardDirector = document.createElement('p')
        cardDirector.innerText = director;
        const cardRelease = document.createElement('p')
        cardRelease.innerText = release_date;

        const secondary = document.createElement('div');
        secondary.appendChild(cardDirector);
        secondary.appendChild(cardRelease);
        secondary.className = 'secondary'

        card.appendChild(cardTitle);
        card.appendChild(cardDescription);
        card.appendChild(secondary);
        container.appendChild(card);
    })
};
