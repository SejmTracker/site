// (C) 2025 AV/PA Studios

async function loadClubs() {
    const data = await getData("https://api.sejm.gov.pl/sejm/term10/clubs");
    hideLoadingOverlay();

    document.querySelector('.loader-overlay').style.display = 'none';
            
    let div = document.getElementById("tab");

    for (let i = 0; i < data.length; i++) {
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        let c2 = document.createElement("td");
    
        let img = document.createElement("img");
        img.src = `https://api.sejm.gov.pl/sejm/term10/clubs/${data[i].id}/logo`
        c1.appendChild(img);
    
        c2.innerHTML = `<p>${data[i].name}</p>`;
        table.addEventListener('click', function () {
            window.location.href = `/result/clubs.html?id=${data[i].id}`;
        });
        table.className = "single";
        row.appendChild(c1);
        row.appendChild(c2);
        table.appendChild(row);
        div.appendChild(table);

    }
}

loadClubs();