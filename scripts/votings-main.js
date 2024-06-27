// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');

fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowań.<br><br></p></center>`
        document.title = "Wystąpił błąd | SejmTracker";
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // for(let i = 0; i < data.length; i++) {
    //     let div = document.getElementById("tab");
    //     let link = document.createElement("div");
    //     link.innerHTML = `<a href="/result/voting.html?sit=${sit}&id=${i+1}">${i+1}. ${data[i].title}</a><br><br>`;
    //     div.appendChild(link);
    // }

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
            window.location.href = `/result/voting.html?sit=${sit}&id=${i+1}`;
        });
        table.className = "single";
        row.appendChild(c1);
        table.appendChild(row);
        div.appendChild(table);
      }
})