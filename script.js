// Elementele din DOM
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let day = document.getElementById("day");
let date = document.getElementById("date");
const newsList = document.getElementById("news-list");
const clearNewsBtn = document.getElementById("clear-news");

// Cheia API (înlocuiește cu cheia ta)
const apiKey = '1ab000de5f184b17b3c33b028d9e62be';

// Actualizează ora și data
setInterval(() => {
    const currentTime = new Date();

    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    day.innerHTML = days[currentTime.getDay()];
    date.innerHTML = currentTime.getDate() + " " + months[currentTime.getMonth()] + " " + currentTime.getFullYear();
}, 1000);

// Fetch știri globale (Hot News)
async function fetchGlobalNews() {
    try {
        // Solicită știri globale
        const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Răspuns API:', data); // Log pentru debugging
        displayNews(data.articles);
    } catch (error) {
        console.error('Eroare la preluarea știrilor:', error);
        newsList.innerHTML = `<li>Eroare la preluarea știrilor. Încearcă din nou mai târziu.</li>`;
    }
}

// Afișează știrile în HTML
function displayNews(articles) {
    newsList.innerHTML = ''; // Golește lista de știri

    if (articles.length === 0) {
        newsList.innerHTML = `<li>Nu s-au găsit știri.</li>`;
        return;
    }

    articles.forEach(article => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = article.title;
        listItem.appendChild(link);
        newsList.appendChild(listItem);
    });
}

// Golire manuală a știrilor
clearNewsBtn.addEventListener('click', () => {
    newsList.innerHTML = ''; // Golește lista manual
});

// Apelează funcția pentru a prelua și afișa știrile
fetchGlobalNews();
