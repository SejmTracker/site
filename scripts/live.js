// © 2024 vimedia

let desc;
let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/videos/today`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            data.forEach(element => {
                desc = element.description;
                if(desc.length > 100) {
                    desc = desc.slice(0, 100) + "...";
                }

                let table = document.createElement("table");
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td1.innerHTML = `<b>${element.title}</b><br><i>${desc}</i>`;
                td2.textContent = `${element.startDateTime.split("T")[1]} - ${element.endDateTime.split("T")[1]}`;
                td3.textContent = element.room;
                td4.textContent = element.type;
                td5.innerHTML = `<a href="/result/watch.html?unid=${element.unid}"><button>Oglądaj</button></a>`;
                td1.width = "20%";
                td2.width = "20%";
                td3.width = "20%";
                td4.width = "20%";
                td5.width = "20%";
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                table.classList.add("glass-navbar");
                tr.style.width = "100%";
                table.appendChild(tr);
                document.getElementById("list-container").appendChild(table);
            });
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