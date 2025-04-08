// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            let name;

            for(let i = 0; i < data.length; i++) {
                name = data[i].title
                if(name.length > 100) {
                name = name.slice(0, 100) + "...";
                }

                let div = document.getElementById("tab");
                let table = document.createElement("table");
                let row = document.createElement("tr");
                let c1 = document.createElement("td");
                c1.innerHTML = `<p>[ Głosowanie nr ${i+1} ]<br>${name}</p>`;
                table.addEventListener('click', function() {
                    window.location.href = `/result/vote-club.html?sit=${sit}&id=${i+1}`;
                });
                table.className = "single";
                row.appendChild(c1);
                table.appendChild(row);
                div.appendChild(table);
            }
        })
        .catch(() => {
            if (attempt >= 7) {
                document.getElementById('loaderContainer').innerHTML = `
                    <p>Nie udało się załadować zawartości. Odśwież stronę i spróbuj ponownie.</p>
                    <button onclick="location.reload()"><i class="fa-solid fa-rotate-right"></i> Odśwież</button>
                `;
                return;
            }
            let text = "Ponawiam próbę";
            if (attempt === 2) text = "Trwa to dłużej niż powinno...";
            if (attempt > 2) text = `Ponawiam próbę (${attempt - 2})...`;
            document.getElementById('loadingText').innerText = text;
            setTimeout(fetchData, 2000);
        });
}
fetchData();