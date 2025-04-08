// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');
const id = urlParams.get('id');

// fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
// .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//         return response.json();
// })
// .then(data => {
//     document.getElementById("voteNum").textContent = id;
//     document.getElementById("total").textContent = data.totalVoted;
//     document.getElementById("yes").textContent = data.yes;
//     document.getElementById("no").textContent = data.no;
//     document.getElementById("abstain").textContent = data.abstain;
// })

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            document.getElementById("voteNum").textContent = id;
            document.getElementById("total").textContent = data.totalVoted;
            document.getElementById("yes").textContent = data.yes;
            document.getElementById("no").textContent = data.no;
            document.getElementById("abstain").textContent = data.abstain;
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