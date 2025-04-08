// © 2024 vimedia

function mpURL(id) {
    window.open(`/result/mp.html?id=${id}`);
}

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
        .then(response => response.json())
        .then(async data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            let div = document.getElementById("tab-mp");
            let sel = document.getElementById("select");
            let count = 0;
            let alph = [];

            for (let x = 0; x < data.length; x++) {
                if (!alph.includes(data[x].lastName[0])) {
                    alph.push(data[x].lastName[0]);
                }
            }

            for (let y = 0; y < alph.length; y++) {
                let letter = document.createElement("h1");
                let divLet = document.createElement("div");
                let br = document.createElement("br");
                divLet.id = alph[y];
                letter.id = alph[y].toLowerCase();
                letter.style.marginTop = '100px';
                divLet.className = "tab-mp";
                letter.textContent = alph[y];
                letter.appendChild(br);
                div.appendChild(letter);
                div.appendChild(divLet);
            }

            for (let z = 0; z < alph.length; z++) {
                sel.innerHTML += `<a href="#${alph[z].toLowerCase()}">${alph[z]}</a>`;
            }

            let imagePromises = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].active) {
                    let divS = document.getElementById(data[i].lastName[0]);
                    let table = document.createElement("table");
                    let row = document.createElement("tr");
                    let c1 = document.createElement("td");
                    let c2 = document.createElement("td");
                    table.id = `mp${i + 1}`;
                    table.className = "single";

                    // Opóźnione ładowanie obrazu
                    let img = new Image();
                    img.dataset.src = `https://api.sejm.gov.pl/sejm/term10/MP/${i+1}/photo-mini`;
                    img.className = "lazy";
                    c1.appendChild(img);

                    c2.innerHTML = `<p>${data[i].lastFirstName}<br>${data[i].club}</p>`;
                    table.addEventListener('click', function () {
                        window.location.href = `/result/mp.html?id=${data[i].id}`;
                    });
                    row.appendChild(c1);
                    row.appendChild(c2);
                    table.appendChild(row);
                    divS.appendChild(table);
                    count++;

                    // Dodanie obietnicy pobrania obrazka
                    imagePromises.push(new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                        img.src = img.dataset.src;
                    }));
                }
            }

            // Poczekaj na załadowanie wszystkich obrazków
            await Promise.all(imagePromises);
            document.getElementById("count").textContent = count;
            console.log(alph);
            
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

// fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
//     .then(response => {
//         if (!response.ok) {
//             document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć posłów.<br><br></p></center>`;
//             document.title = "Wystąpił błąd | SejmTracker";
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(async data => {
//         let div = document.getElementById("tab-mp");
//         let sel = document.getElementById("select");
//         let count = 0;
//         let alph = [];

//         for (let x = 0; x < data.length; x++) {
//             if (!alph.includes(data[x].lastName[0])) {
//                 alph.push(data[x].lastName[0]);
//             }
//         }

//         for (let y = 0; y < alph.length; y++) {
//             let letter = document.createElement("h1");
//             let divLet = document.createElement("div");
//             let br = document.createElement("br");
//             divLet.id = alph[y];
//             letter.id = alph[y].toLowerCase();
//             letter.style.marginTop = '100px';
//             divLet.className = "tab-mp";
//             letter.textContent = alph[y];
//             letter.appendChild(br);
//             div.appendChild(letter);
//             div.appendChild(divLet);
//         }

//         for (let z = 0; z < alph.length; z++) {
//             sel.innerHTML += `<a href="#${alph[z].toLowerCase()}">${alph[z]}</a>`;
//         }

//         let imagePromises = [];

//         for (let i = 0; i < data.length; i++) {
//             if (data[i].active) {
//                 let divS = document.getElementById(data[i].lastName[0]);
//                 let table = document.createElement("table");
//                 let row = document.createElement("tr");
//                 let c1 = document.createElement("td");
//                 let c2 = document.createElement("td");
//                 table.id = `mp${i + 1}`;
//                 table.className = "single";

//                 // Opóźnione ładowanie obrazu
//                 let img = new Image();
//                 img.dataset.src = `https://api.sejm.gov.pl/sejm/term10/MP/${i+1}/photo-mini`;
//                 img.className = "lazy";
//                 c1.appendChild(img);

//                 c2.innerHTML = `<p>${data[i].lastFirstName}<br>${data[i].club}</p>`;
//                 table.addEventListener('click', function () {
//                     window.location.href = `/result/mp.html?id=${data[i].id}`;
//                 });
//                 row.appendChild(c1);
//                 row.appendChild(c2);
//                 table.appendChild(row);
//                 divS.appendChild(table);
//                 count++;

//                 // Dodanie obietnicy pobrania obrazka
//                 imagePromises.push(new Promise((resolve, reject) => {
//                     img.onload = resolve;
//                     img.onerror = reject;
//                     img.src = img.dataset.src;
//                 }));
//             }
//         }

//         // Poczekaj na załadowanie wszystkich obrazków
//         await Promise.all(imagePromises);
//         document.getElementById("count").textContent = count;
//         console.log(alph);
//     });