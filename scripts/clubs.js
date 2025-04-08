// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

let email;
let txt = "";
let multipleEmails = false;

let attempt = 0;
function fetchData1() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/clubs/${id}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';

            if(data.email.includes(", ")) {
              email = data.email.split(", ");
              multipleEmails = true;
              console.log(email);
            }
          
              document.getElementById("photo").src = `https://api.sejm.gov.pl/sejm/term10/clubs/${id}/logo`;
              document.getElementById("name").textContent = data.name;
              document.getElementById("membersCount").textContent = data.membersCount;
              document.getElementById("phone").textContent = data.phone;
              document.getElementById("fax").textContent = data.fax;
              if(!multipleEmails) {
                document.getElementById("email").innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
              } else {
                document.getElementById("email-form").innerHTML = `Adresy e-mail: <span id="email"></span>`;
                for(let i = 0; i < email.length; i++) {
                  txt += `<a href="mailto:${email[i]}">${email[i]}</a>`
                  if(i != email.length - 1) {
                    txt += ", ";
                  }
                }
                if(txt.includes("undefined")) txt.replace("undefined", "");
                document.getElementById("email").innerHTML = txt;
              }
              document.title = `${data.id} | SejmTracker`;
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
            setTimeout(fetchData1, 2000);
        });
}
fetchData1();

attempt = 0;
function fetchData2() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
        .then(response => response.json())
        .then(mpData => {
            document.querySelector('.loader-overlay').style.display = 'none';
            let ids = [];
            for(let x = 0; x < mpData.length; x++) {
              if(mpData[x].club == id && mpData[x].active) {
                ids.push(x);
              }
            }
            console.log(ids);

            for(let i = 0; i < ids.length; i++) {
              if(mpData[ids[i]].active == true) {
                  let divS = document.getElementById("tab");
                  let table = document.createElement("table");
                  let row = document.createElement("tr");
                  let c1 = document.createElement("td");
                  let c2 = document.createElement("td");
                  table.id = `mp${ids[i]}`;
                  table.className = "single";
                  c1.innerHTML = `<img src="https://api.sejm.gov.pl/sejm/term10/MP/${mpData[ids[i]].id}/photo-mini">`;
                  c2.innerHTML = `<p>${mpData[ids[i]].lastFirstName}`;
                  table.addEventListener('click', function() {
                      window.open(`/result/mp.html?id=${mpData[ids[i]].id}`);
                  });
                  row.appendChild(c1);
                  row.appendChild(c2);
                  table.appendChild(row);
                  divS.appendChild(table);
              }
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
            setTimeout(fetchData2, 2000);
        });
}
fetchData2();