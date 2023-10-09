let message = document.getElementById("message");
message.innerText = "Pretrazi svoju omiljenu seriju!";

let table = document.getElementById("results");
table.style.display = "none";

let loader = document.getElementById("loader");
loader.style.display = "none";

let searchInput = document.querySelector(".search");
searchInput.addEventListener("input", (e) => {
    const input = e.target.value;
    if (!input) {
        message.style.display = "block";
        message.innerText = "Pretrazi svoju omiljenu seriju!";

        table.style.display = "none";
        return;
    }

    loader.style.display = "block";
    const apiURL = `https://api.tvmaze.com/search/shows?q=${input}`;

    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
        loader.style.display = "none";

        if (data.length === 0) {
            message.style.display = "block";
            message.innerText = "Nema rezultata za tvoj upit :/";

            table.style.display = "none";
            return;
        }

        message.style.display = "none";
        table.style.display = "block";

        const tbody = document.querySelector("#results tbody");
        tbody.innerHTML = "";
        data.forEach((element) => {
            const row = document.createElement("tr");

            const seriesElement = document.createElement("td");
            seriesElement.innerText = element.show.name;
            const ratingElement = document.createElement("td");
            ratingElement.innerText = element.show.rating.average;
            const genresElement = document.createElement("td");
            genresElement.innerText = element.show.genres;
            const descriptionElement = document.createElement("td");
            descriptionElement.innerHTML = element.show.summary;

            row.appendChild(seriesElement);
            row.appendChild(ratingElement);
            row.appendChild(genresElement);
            row.appendChild(descriptionElement);

            tbody.appendChild(row);
        });
    })
    .catch((error) => console.error(error));
});