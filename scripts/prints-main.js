// © 2024 vimedia

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/prints`)
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
            c1.innerHTML = `<p>Druk nr ${data[i].number}<br>${name}</p>`;
            table.addEventListener('click', function() {
                window.location.href = `/result/print.html?id=${data[i].number}`;
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

// fetch(`https://api.sejm.gov.pl/sejm/term10/prints`)
// .then(response => {
//     if (!response.ok) {
//       document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć druków.<br><br></p></center>`
//       document.title = "Wystąpił błąd | SejmTracker";
//       throw new Error('Network response was not ok');
//     }
//         return response.json();
// })
// .then(data => {
//   let name;

//   for(let i = 0; i < data.length; i++) {
//     name = data[i].title
//     if(name.length > 100) {
//       name = name.slice(0, 100) + "...";
//     }

//     let div = document.getElementById("tab");
//     let table = document.createElement("table");
//     let row = document.createElement("tr");
//     let c1 = document.createElement("td");
//     c1.innerHTML = `<p>Druk nr ${data[i].number}<br>${name}</p>`;
//     table.addEventListener('click', function() {
//         window.location.href = `/result/print.html?id=${data[i].number}`;
//     });
//     table.className = "single";
//     row.appendChild(c1);
//     table.appendChild(row);
//     div.appendChild(table);
//   }
// })