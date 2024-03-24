// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let date = urlParams.get('date');

let currentDate = new Date();
let day = (currentDate.getDate()).toString();
let month = (currentDate.getMonth() + 1).toString();

if(day < 10) {
    day = `0${day}`;
} else if(month < 10) {
    month = `0${month}`;
}

let monthWord = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
];

if(!date) {
    date = `${month}-${day}`;
}

let splitDate = date.split("-");
let thisDay = `${splitDate[1]} ${monthWord[splitDate[0] - 1]}`;

fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubu.<br><br></p></center>`
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    document.getElementById("title").textContent = `W dniu ${thisDay} urodziny obchodzą posłowie:`;
    let div = document.getElementById("mps");
    for(let i = 0; i < data.length; i++) {
        if(data[i].birthDate.includes(date)) {
            let table = document.createElement("table");
            let row = document.createElement("tr");
            let c1 = document.createElement("td");
            let c2 = document.createElement("td");
            c1.innerHTML = `<img src="https://api.sejm.gov.pl/sejm/term10/MP/${i+1}/photo-mini">`
            c2.innerHTML = `<a target="_blank" href="/result/mp.html?id=${data[i].id}">${data[i].lastFirstName}</a>`;
            row.appendChild(c1);
            row.appendChild(c2);
            table.appendChild(row);
            div.appendChild(table);
        }
    }
})