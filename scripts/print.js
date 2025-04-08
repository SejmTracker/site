// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/prints/${id}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            document.getElementById("title").textContent = data.title;
            document.getElementById("num").textContent = data.number;
            document.getElementById("date").textContent = data.deliveryDate;
            document.getElementById("pdf").src = `https://api.sejm.gov.pl/sejm/term10/prints/${id}/${id}.pdf`;
            document.title = `Druk nr ${data.number} "${data.title}" | SejmTracker`;
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

// fetch(`https://api.sejm.gov.pl/sejm/term10/prints/${id}`)
// .then(response => {
//     if (!response.ok) {
//       document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć druku.<br><br></p></center>`
//       document.title = "Wystąpił błąd | SejmTracker";
//       throw new Error('Network response was not ok');
//     }
//         return response.json();
// })
// .then(data => {
//     document.getElementById("title").textContent = data.title;
//     document.getElementById("num").textContent = data.number;
//     document.getElementById("date").textContent = data.deliveryDate;
//     document.getElementById("pdf").src = `https://api.sejm.gov.pl/sejm/term10/prints/${id}/${id}.pdf`;
//     document.title = `Druk nr ${data.number} "${data.title}" | SejmTracker`;
// })