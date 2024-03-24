// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');
const id = urlParams.get('id');

fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowania.<br><br></p></center>`
        throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(async data => {
    document.getElementById("back").innerHTML = `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`
    let glos = "?"
    if(data.kind == "ON_LIST") {
        let votingOptions = "";
        for(let i = 0; i < data.votingOptions.length; i++) {
            votingOptions = votingOptions + `${data.votingOptions[i].optionIndex}. ${data.votingOptions[i].option}: ${data.votingOptions[i].votes}<br>`
        }
        document.getElementById("votingOpt").innerHTML = `Opcje głosowania:<br>${votingOptions}`;
        document.getElementById("title").textContent = data.title;
        document.getElementById("top").textContent = data.topic;
        document.getElementById("info").innerHTML = `Głosowało: ${data.totalVoted}; Niebiorących udziału: ${data.notParticipating}`;
        for(let j = 0; j < data.votes.length; j++) {
            for(let k = 1; k <= data.votingOptions.length; k++) {
                if(data.votes[j].listVotes[k] == "YES") {
                    glos = k;
                }
            } 
            let div = document.getElementById("div")
            let table;
            table = document.getElementById("tab");
            let row = document.createElement("tr");
            let num = document.createElement("td");
            let nam = document.createElement("td");
            let clu = document.createElement("td");
            let vot = document.createElement("td");
            num.textContent = data.votes[j].MP
            nam.innerHTML = `<a target="_blank" href="/result/mp.html?id=${data.votes[j].MP}">${data.votes[j].lastName.toUpperCase()} ${data.votes[j].firstName}</a>`
            clu.innerHTML = `<a target="_blank" href="/result/clubs.html?id=${data.votes[j].club}">${data.votes[j].club}</a>`
            vot.textContent = data.votingOptions[glos - 1].option;
            row.appendChild(num);
            row.appendChild(nam);
            row.appendChild(clu);
            row.appendChild(vot);
            await table.appendChild(row);
            div.appendChild(table);
        }
    } else {
        document.getElementById("title").textContent = data.title;
        document.getElementById("top").textContent = data.topic;
        document.getElementById("vote").innerHTML = `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymujących się: <b>${data.abstain}</b>`;
        document.getElementById("screen").innerHTML = `<a target="_blank" href="/result/screen.html?sit=${sit}&id=${id}">[ Wyświetl jako ekran ]</a>`;
        for(let i = 0; i <= data.votes.length; i++) {
            if(data.votes[i].vote === "NO") {
                glos = "PRZECIW"
            } else if(data.votes[i].vote === "YES") {
                glos = "ZA"
            } else if(data.votes[i].vote === "ABSTAIN") {
                glos = "WSTRZYMAŁ/A SIĘ"
            } else if(data.votes[i].vote == "ABSENT") {
                glos = "NIEOBECNY"
            }

            if(data.votes[i].vote == "ABSENT") {
                let div = document.getElementById("div")
                let table = document.getElementById("tab");
                let row = document.createElement("tr");
                let num = document.createElement("td");
                let nam = document.createElement("td");
                let clu = document.createElement("td");
                let vot = document.createElement("td");
                num.innerHTML = data.votes[i].MP;
                nam.innerHTML = `<a class="absent" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`;
                clu.innerHTML = `<a class="absent" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`;
                vot.textContent = glos;
                num.className = "absent";
                vot.className = "absent";
                row.appendChild(num);
                row.appendChild(nam);
                row.appendChild(clu);
                row.appendChild(vot);
                table.appendChild(row);
                div.appendChild(table);
            } else {
                let div = document.getElementById("div")
                let table = document.getElementById("tab");
                let row = document.createElement("tr");
                let num = document.createElement("td");
                let nam = document.createElement("td");
                let clu = document.createElement("td");
                let vot = document.createElement("td");
                num.textContent = data.votes[i].MP
                nam.innerHTML = `<a target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
                clu.innerHTML = `<a target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
                vot.textContent = glos
                row.appendChild(num);
                row.appendChild(nam);
                row.appendChild(clu);
                row.appendChild(vot);
                table.appendChild(row);
                div.appendChild(table);
            }
        }
    }
})