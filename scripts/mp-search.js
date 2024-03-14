// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć posłów.<br><br></p></center>`
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    let count = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i].active == true) {
            let div = document.getElementById("tab")
            let table = document.createElement("table");
            let row = document.createElement("tr");
            let c1 = document.createElement("td");
            let c2 = document.createElement("td");
            c1.innerHTML = `<img src="https://api.sejm.gov.pl/sejm/term10/MP/${i+1}/photo-mini">`
            c2.innerHTML = `<a href="/result/mp.html?id=${data[i].id}">${data[i].lastFirstName}</a>`;
            row.appendChild(c1);
            row.appendChild(c2);
            table.appendChild(row);
            div.appendChild(table);
            count++;
        }
    }

    document.getElementById("count").textContent = count;
})