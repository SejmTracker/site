// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/videos/today`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć transmisji.<br><br></p></center>`
        document.title = "Wystąpił błąd | SejmTracker";
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    data.forEach(element => {
        let table = document.createElement("table");
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        td1.innerHTML = `<b>${element.title}</b><br><i>${element.description}</i>`;
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