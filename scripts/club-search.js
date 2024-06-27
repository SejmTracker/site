// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/clubs`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubów.<br><br></p></center>`;
        document.title = "Wystąpił błąd | SejmTracker";
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    for(let i = 0; i < data.length; i++) {
        let div = document.getElementById("tab")
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        let c2 = document.createElement("td");
        c1.innerHTML = `<img src="https://api.sejm.gov.pl/sejm/term10/clubs/${data[i].id}/logo">`
        c2.innerHTML = `<p>${data[i].name}</p>`;
        table.addEventListener('click', function() {
            window.open(`/result/clubs.html?id=${data[i].id}`);
        });
        table.className = "single";
        row.appendChild(c1);
        row.appendChild(c2);
        table.appendChild(row);
        div.appendChild(table);
    }
})