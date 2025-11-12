document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const sit = urlParams.get('sit');
    const id = urlParams.get('id');

    let clubs = [];
    let members = [];
    let yesVotes = [];
    let noVotes = [];
    let abstainVotes = [];
    let absentMPs = [];
    let mpsVoted = [];

    document.getElementById("selector").innerHTML = `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`;

    let attempt = 0;
    function fetchData1() {
        attempt++;
        fetch(`https://api.sejm.gov.pl/sejm/term10/clubs`)
            .then(response => response.json())
            .then(async data => {
                data.forEach(element => {
                    clubs.push(element.id);
                    members.push(element.membersCount);
                });
                
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
                setTimeout(fetchData1, 2000);
            });
    }
    fetchData1();

    attempt = 0;
    function fetchData2() {
        attempt++;
        fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.loader-overlay').style.display = 'none';

                document.title = `${data.title} | SejmTracker`;
                document.getElementById("back").innerHTML = `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`
                if(data.kind != "ELECTRONIC") {
                    alert("W tym momencie nie jest możliwe sprawdzenie wyników głosowania wg klubów dla typów innych niż głosowanie elektroniczne");
                    window.location.href = `/result/voting.html?sit=${sit}&id=${id}`
                } else {
                    document.title = `${data.title} | SejmTracker`;
                    title.textContent = data.title;
                    top.textContent = data.topic;
                    vote.innerHTML = `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymujących się: <b>${data.abstain}</b>`;
                    screen.innerHTML = `<a target="_blank" href="/result/screen.html?sit=${sit}&id=${id}">[ Wyświetl jako ekran ]</a>`;
                    
                    let table = document.createElement("table")
                    let trDesc = document.createElement("tr");
                    let dName = document.createElement("td");
                    dName.textContent = "Klub/Koło";
                    let dMPCount = document.createElement("td");
                    dMPCount.textContent = "Liczba członków";
                    let dVoted = document.createElement("td");
                    dVoted.textContent = "Głosowało";
                    let dYes = document.createElement("td");
                    dYes.textContent = "Za";
                    let dNo = document.createElement("td");
                    dNo.textContent = "Przeciw";
                    let dAbstain = document.createElement("td");
                    dAbstain.textContent = "Wstrzymało się";
                    let dAbsent = document.createElement("td");
                    dAbsent.textContent = "Nie głosowało";
                    document.getElementById("vote-container").appendChild(table);
                    trDesc.appendChild(dName);
                    trDesc.appendChild(dMPCount);
                    trDesc.appendChild(dVoted);
                    trDesc.appendChild(dYes);
                    trDesc.appendChild(dNo);
                    trDesc.appendChild(dAbstain);
                    trDesc.appendChild(dAbsent);
                    table.appendChild(trDesc);

                    for(let i = 0; i < clubs.length; i++) {
                        yesVotes[i] = 0;
                        noVotes[i] = 0;
                        abstainVotes[i] = 0;
                        absentMPs[i] = 0;
                        mpsVoted[i] = 0;
                    }

                    data.votes.forEach(element => {
                        let index = clubs.indexOf(element.club);
                        switch (element.vote) {
                            case "YES": yesVotes[index]++; mpsVoted[index]++; break;
                            case "NO": noVotes[index]++; mpsVoted[index]++; break;
                            case "ABSTAIN": abstainVotes[index]++; mpsVoted[index]++; break;
                            case "ABSENT": absentMPs[index]++; break;
                        }
                    });

                    const arrays = [yesVotes, noVotes, abstainVotes, absentMPs, mpsVoted];

                    arrays.forEach(array => {
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] === 0) {
                                array[i] = "-";
                            }
                        }
                    });

                    for(let j = 0; j < clubs.length; j++) {
                        let tr = document.createElement("tr");
                        let name = document.createElement("td");
                        name.innerHTML = `<a target="_blank" href="/result/clubs.html?id=${clubs[j]}">${clubs[j]}</a>`;
                        let mpCount = document.createElement("td");
                        mpCount.textContent = members[j];
                        let voted = document.createElement("td");
                        voted.textContent = mpsVoted[j];
                        let yes = document.createElement("td");
                        yes.textContent = yesVotes[j];
                        let no = document.createElement("td");
                        no.textContent = noVotes[j];
                        let abstain = document.createElement("td");
                        abstain.textContent = abstainVotes[j];
                        let absent = document.createElement("td");
                        absent.textContent = absentMPs[j];

                        tr.appendChild(name);
                        tr.appendChild(mpCount);
                        tr.appendChild(voted);
                        tr.appendChild(yes);
                        tr.appendChild(no);
                        tr.appendChild(abstain);
                        tr.appendChild(absent);
                        table.appendChild(tr);
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
                setTimeout(fetchData2, 2000);
            });
    }
    fetchData2();

//     fetch(`https://api.sejm.gov.pl/sejm/term10/clubs`)
//     .then(response => {
//         if (!response.ok) {
//             document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubów.<br><br></p></center>`
//             document.title = "Wystąpił błąd | SejmTracker";
//             throw new Error('Network response was not ok');
//         }
//             return response.json();
//     })
//     .then(async data => {
//         data.forEach(element => {
//             clubs.push(element.id);
//             members.push(element.membersCount);
//         });
//     })


//     fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
//     .then(response => {
//         if (!response.ok) {
//             document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowania.<br><br></p></center>`
//             document.title = "Wystąpił błąd | SejmTracker";
//             throw new Error('Network response was not ok');
//         }
//             return response.json();
//     })
//     .then(async data => {
//         document.title = `${data.title} | SejmTracker`;
//         document.getElementById("back").innerHTML = `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`
//         if(data.kind != "ELECTRONIC") {
//             alert("W tym momencie nie jest możliwe sprawdzenie wyników głosowania wg klubów dla typów innych niż głosowanie elektroniczne");
//         } else {
//             document.title = `${data.title} | SejmTracker`;
//             title.textContent = data.title;
//             top.textContent = data.topic;
//             vote.innerHTML = `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymujących się: <b>${data.abstain}</b>`;
//             screen.innerHTML = `<a target="_blank" href="/result/screen.html?sit=${sit}&id=${id}">[ Wyświetl jako ekran ]</a>`;
            
//             let table = document.createElement("table")
//             let trDesc = document.createElement("tr");
//             let dName = document.createElement("td");
//             dName.textContent = "Klub/Koło";
//             let dMPCount = document.createElement("td");
//             dMPCount.textContent = "Liczba członków";
//             let dVoted = document.createElement("td");
//             dVoted.textContent = "Głosowało";
//             let dYes = document.createElement("td");
//             dYes.textContent = "Za";
//             let dNo = document.createElement("td");
//             dNo.textContent = "Przeciw";
//             let dAbstain = document.createElement("td");
//             dAbstain.textContent = "Wstrzymało się";
//             let dAbsent = document.createElement("td");
//             dAbsent.textContent = "Nie głosowało";
//             document.getElementById("vote-container").appendChild(table);
//             trDesc.appendChild(dName);
//             trDesc.appendChild(dMPCount);
//             trDesc.appendChild(dVoted);
//             trDesc.appendChild(dYes);
//             trDesc.appendChild(dNo);
//             trDesc.appendChild(dAbstain);
//             trDesc.appendChild(dAbsent);
//             table.appendChild(trDesc);

//             for(let i = 0; i < clubs.length; i++) {
//                 yesVotes[i] = 0;
//                 noVotes[i] = 0;
//                 abstainVotes[i] = 0;
//                 absentMPs[i] = 0;
//                 mpsVoted[i] = 0;
//             }

//             data.votes.forEach(element => {
//                 let index = clubs.indexOf(element.club);
//                 switch (element.vote) {
//                     case "YES": yesVotes[index]++; mpsVoted[index]++; break;
//                     case "NO": noVotes[index]++; mpsVoted[index]++; break;
//                     case "ABSTAIN": abstainVotes[index]++; mpsVoted[index]++; break;
//                     case "ABSENT": absentMPs[index]++; break;
//                 }
//             });

//             const arrays = [yesVotes, noVotes, abstainVotes, absentMPs, mpsVoted];

//             arrays.forEach(array => {
//                 for (let i = 0; i < array.length; i++) {
//                     if (array[i] === 0) {
//                         array[i] = "-";
//                     }
//                 }
//             });

//             for(let j = 0; j < clubs.length; j++) {
//                 let tr = document.createElement("tr");
//                 let name = document.createElement("td");
//                 name.innerHTML = `<a target="_blank" href="/result/clubs.html?id=${clubs[j]}">${clubs[j]}</a>`;
//                 let mpCount = document.createElement("td");
//                 mpCount.textContent = members[j];
//                 let voted = document.createElement("td");
//                 voted.textContent = mpsVoted[j];
//                 let yes = document.createElement("td");
//                 yes.textContent = yesVotes[j];
//                 let no = document.createElement("td");
//                 no.textContent = noVotes[j];
//                 let abstain = document.createElement("td");
//                 abstain.textContent = abstainVotes[j];
//                 let absent = document.createElement("td");
//                 absent.textContent = absentMPs[j];

//                 tr.appendChild(name);
//                 tr.appendChild(mpCount);
//                 tr.appendChild(voted);
//                 tr.appendChild(yes);
//                 tr.appendChild(no);
//                 tr.appendChild(abstain);
//                 tr.appendChild(absent);
//                 table.appendChild(tr);
//             }
//         }
//     })
})