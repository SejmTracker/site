// © 2024 vimedia
document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const sit = urlParams.get('sit');
    const id = urlParams.get('id');

    let table = document.getElementById("tab-vote");
    let votingOption = document.getElementById("votingOpt");
    let title = document.getElementById("title");
    let top = document.getElementById("top");
    let info = document.getElementById("info");
    let vote = document.getElementById("vote");
    let screen = document.getElementById("screen");

    document.getElementById("selector").innerHTML = `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`;

    let attempt = 0;
    function fetchData() {
        attempt++;
        fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
            .then(response => response.json())
            .then(async data => {
                document.querySelector('.loader-overlay').style.display = 'none';
                
                document.title = `${data.title} | SejmTracker`;
                document.getElementById("back").innerHTML = `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`
                let glos = "?"
                if(data.kind == "ON_LIST") {
                    let votingOptions = "";
                    for(let i = 0; i < data.votingOptions.length; i++) {
                        votingOptions = votingOptions + `${data.votingOptions[i].optionIndex}. ${data.votingOptions[i].option}: ${data.votingOptions[i].votes}<br>`
                    }
                    votingOption.innerHTML = `Opcje głosowania:<br>${votingOptions}`;
                    title.textContent = data.title;
                    top.textContent = data.topic;
                    info.innerHTML = `Głosowało: ${data.totalVoted}; Niebiorących udziału: ${data.notParticipating}`;
                    for(let j = 0; j < data.votes.length; j++) {
                        for(let k = 1; k <= data.votingOptions.length; k++) {
                            if(data.votes[j].listVotes[k] == "YES") {
                                glos = k;
                            }
                        }
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
                        table.appendChild(row);
                    }
                } else {
                    document.title = `${data.title} | SejmTracker`;
                    title.textContent = data.title;
                    top.textContent = data.topic;
                    vote.innerHTML = `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymujących się: <b>${data.abstain}</b>`;
                    screen.innerHTML = `<a target="_blank" href="/result/screen.html?sit=${sit}&id=${id}">[ Wyświetl jako ekran ]</a>`;
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
                            document.getElementById("tab-vote").appendChild(row);
                        } else {
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
                        }
                    }
                }
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
})