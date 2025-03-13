// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/votings`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowań.<br><br></p></center>`
        document.title = "Wystąpił błąd | SejmTracker";
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    let sittings = [];
    for(let i = 0; i < data.length; i++) {
        if(!sittings.includes(data[i].proceeding)) {
            sittings.push(data[i].proceeding);
        }
    }
    for(let i = 0; i < sittings.length; i++) {
        let div = document.getElementById("tab");
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        c1.innerHTML = `<p>Posiedzienie nr ${sittings[i]}.</p>`;
        table.addEventListener('click', function() {
            window.location.href = `/result/votingSelect.html?sit=${sittings[i]}`;
        });
        table.className = "single";
        row.appendChild(c1);
        table.appendChild(row);
        div.appendChild(table);
    }
})