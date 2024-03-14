// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');

fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowań.<br><br></p></center>`
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    for(let i = 0; i < data.length; i++) {
        let div = document.getElementById("tab");
        let link = document.createElement("div");
        link.innerHTML = `<a href="/result/voting.html?sit=${sit}&id=${i+1}">${i+1}. ${data[i].title}</a><br><br>`;
        div.appendChild(link);
    }
})