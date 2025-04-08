// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/MP/${id}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            document.getElementById('info').style.display = 'block';
            
            if(data.active == false) {
              document.getElementById("div").innerHTML = `<p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>MANDAT WYGASŁ<br>Mandat posła został wygaszony z powodu: ${data.waiverDesc}<br><br></p>`
            }
      
              document.getElementById("photo").src = `https://api.sejm.gov.pl/sejm/term10/MP/${id}/photo`;
              document.getElementById("lastFirstName").textContent = data.firstLastName;
              document.getElementById("id").textContent = data.id;
              document.getElementById("dob").textContent = data.birthDate;
              document.getElementById("pob").textContent = data.birthLocation;
              document.getElementById("club").innerHTML = `<a target="_blank" href="/result/clubs.html?id=${data.club}">${data.club}</a>`;
              document.getElementById("district").textContent = `${data.districtName} (${data.districtNum})`;
              document.getElementById("voivodeship").textContent = data.voivodeship;
              document.getElementById("votesQty").textContent = data.numberOfVotes;
              document.getElementById("educationLvl").textContent = data.educationLevel;
              document.getElementById("profession").textContent = data.profession;
              document.getElementById("email").innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
              document.getElementById("btnSpace").innerHTML = `<a id="btnMP" href="/result/mp.html?id=${data.id - 1}">< Poprzedni</a>&nbsp;<a id="btnMP" href="/result/mp.html?id=${data.id + 1}">Następny ></a>`
              document.title = `${data.firstLastName} | SejmTracker`;
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