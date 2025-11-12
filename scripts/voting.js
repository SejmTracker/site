// (C) 2025 AV/PA Studios
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');
const id = urlParams.get('id');

async function votingRegular() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);

    document.title = data.title + " | SejmTracker";
    
    hideLoadingOverlay();
    const container = document.getElementById("votingTableContainer");
    container.innerHTML = "";

    let backLink = create("p", `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`, "back");
    let selector = create("div", `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`, "selector");
    let infoSection = create("div", "", "info");
    let title = create("h1", data.title, "title");
    let top = create("p", data.topic, "top");
    let vote = create("p", `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymało się: <b>${data.abstain}</b>`);
    
    let tableContainer = create("div", "", "tableContainer");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    let table = create("table", "", "votingTable");
    let tr = create("tr", "");
    let thNum = create("th", "Numer legitymacji");
    let thName = create("th", "Nazwisko i imię");
    let thClub = create("th", "Klub");
    let thVote = create("th", "Głos");
    tr.append(thNum, thName, thClub, thVote);
    table.appendChild(tr);
    for(let i = 0; i < data.votes.length; i++) {
        let tr = create("tr", "");
        let tdNum = create("td", data.votes[i].MP);
        let tdName = create("td", `<a target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`);
        let tdClub = create("td", `<a target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`);
        let voteText;
        switch (data.votes[i].vote) {
            case "YES": voteText = "ZA"; break;
            case "NO": voteText = "PRZECIW"; break;
            case "ABSENT": voteText = "NIEOBECNY"; break;
            case "ABSTAIN": voteText = "WSTRZYMAŁ/A SIĘ"; break;
        }
        let tdVote = create("td", voteText);
        if(voteText == "NIEOBECNY") {
            tdNum.className = "absent";
            tdName.innerHTML = `<a class="absent" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="absent" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
            tdVote.className = "absent";
        }
        tr.append(tdNum, tdName, tdClub, tdVote);
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);

    infoSection.append(title, top, vote);
    container.append(backLink, selector, infoSection, tableContainer);
}

async function votingMobile() {
    console.log("mobile");
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);
    
    hideLoadingOverlay();
    const container = document.getElementById("votingTableContainer");
    container.innerHTML = "";

    let backLink = create("p", `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`, "back");
    let selector = create("div", `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`, "selector");
    let infoSection = create("div", "", "info");
    let title = create("h1", data.title, "title");
    let top = create("p", data.topic, "top");
    let vote = create("p", `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b><br>Za: <b>${data.yes}</b>; Przeciw: <b>${data.no}</b>; Wstrzymało się: <b>${data.abstain}</b>`);
    let colorExplanation = create("p", `<span class="mvote-yes">ZA</span> | <span class="mvote-no">PRZECIW</span> | <span class="mvote-abstain">WSTRZYMAŁ/A SIĘ</span> | <span class="absent">NIEOBECNY</span>`)

    let tableContainer = create("div", "", "tableContainer");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    let table = create("table", "", "votingTable");
    let tr = create("tr", "");
    let thName = create("th", "Nazwisko i imię");
    let thClub = create("th", "Klub");
    tr.append(thName, thClub);
    table.appendChild(tr);
    for(let i = 0; i < data.votes.length; i++) {
        let tr = create("tr", "");
        let tdName = create("td", `<a target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`);
        let tdClub = create("td", `<a target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`);
        if(data.votes[i].vote == "ABSENT") {
            tdName.innerHTML = `<a class="absent" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="absent" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
        } else if(data.votes[i].vote == "YES") {
            tdName.innerHTML = `<a class="mvote-yes" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="mvote-yes" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
        } else if(data.votes[i].vote == "NO") {
            tdName.innerHTML = `<a class="mvote-no" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="mvote-no" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
        } else if(data.votes[i].vote == "ABSTAIN") {
            tdName.innerHTML = `<a class="mvote-abstain" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="mvote-abstain" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
        }
        tr.append(tdName, tdClub);
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);

    infoSection.append(title, top, vote, colorExplanation);
    container.append(backLink, selector, infoSection, tableContainer);
}

async function votingRegularList() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);
    
    hideLoadingOverlay();
    const container = document.getElementById("votingTableContainer");
    container.innerHTML = "";

    let backLink = create("p", `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`, "back");
    let selector = create("div", `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`, "selector");
    let infoSection = create("div", "", "info");
    let title = create("h1", data.title, "title");
    let top = create("p", data.topic, "top");
    let vote = create("p", `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b>`);
    
    let optionsListContainer = create("div", "", "optionsListContainer");
    optionsListContainer.style.display = "flex";
    optionsListContainer.style.justifyContent = "center";

    let optionsList = create("table", "", "optionsList");
    let trOpt = create("tr", "");
    let thIndex = create("th", "Numer");
    let thOption = create("th", "Opcja");
    let thVotes = create("th", "Ilość głosów");
    trOpt.append(thIndex, thOption, thVotes);
    optionsList.appendChild(trOpt);

    for(let i = 0; i < data.votingOptions.length; i++) {
        let tr = create("tr", "");
        let tdIndex = create("td", data.votingOptions[i].optionIndex);
        let tdOption = create("td", data.votingOptions[i].option);
        let tdVotes = create("td", data.votingOptions[i].votes);
        tr.append(tdIndex, tdOption, tdVotes);
        optionsList.appendChild(tr);
    }
    optionsListContainer.appendChild(optionsList);

    let validVotes = 0;
    let abstain = 0;

    for(let i = 0; i < data.votes.length; i++) {
        if(data.votes[i].vote == "VOTE_VALID") validVotes++;
        else abstain++;
    }

    let validityStats = create("p", `Głosów ważnych: <b>${validVotes}</b>; Nie oddano głosu / Nieobecny: <b>${abstain}</b>`);

    let tableContainer = create("div", "", "tableContainer");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    let table = create("table", "", "votingTable");
    let tr = create("tr", "");
    let thNum = create("th", "Numer legitymacji");
    let thName = create("th", "Nazwisko i imię");
    let thClub = create("th", "Klub");
    let thVote = create("th", "Głos");
    tr.append(thNum, thName, thClub, thVote);
    table.appendChild(tr);
    for(let i = 0; i < data.votes.length; i++) {
        let tr = create("tr", "");
        let tdNum = create("td", data.votes[i].MP);
        let tdName = create("td", `<a target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`);
        let tdClub = create("td", `<a target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`);
        let voteText;
        for(let j = 1; j <= data.votingOptions.length; j++) {
            if(data.votes[i].listVotes[j] == "YES") {
                voteText = data.votingOptions[j-1].option;
            }
        }
        if(!voteText) voteText = "BRAK";
        let tdVote = create("td", voteText);
        if(data.votes[i].vote == "ABSENT") {
            tdNum.className = "absent";
            tdName.innerHTML = `<a class="absent" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="absent" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
            tdVote.className = "absent";
            tdVote.innerHTML = "NIEOBECNY";
        }
        tr.append(tdNum, tdName, tdClub, tdVote);
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);

    infoSection.append(title, top, vote, optionsListContainer, validityStats);
    if(data.againstAll) {
        let againstAllInfo = create("p", `Posłowie będący przeciwko wszystkim opcjom: <b>${data.againstAll}</b>`);
        infoSection.appendChild(againstAllInfo);
    }
    container.append(backLink, selector, infoSection, tableContainer);
}

async function votingMobileList() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);
    
    hideLoadingOverlay();
    const container = document.getElementById("votingTableContainer");
    container.innerHTML = "";

    let backLink = create("p", `<a href="/result/votingSelect.html?sit=${sit}">< Powrót do: Wybór głosowania</a>`, "back");
    let selector = create("div", `<a id="btnMP" href="/result/vote-club.html?sit=${sit}&id=${id}">Głosowanie klubowe</a>&nbsp;<a id="btnMP" href="/result/voting.html?sit=${sit}&id=${id}">Głosowanie indywidualne</a>`, "selector");
    let infoSection = create("div", "", "info");
    let title = create("h1", data.title, "title");
    let top = create("p", data.topic, "top");
    let vote = create("p", `Głosowało: <b>${data.totalVoted}</b>; Nieobecnych: <b>${data.notParticipating}</b>`);
    
    let optionsListContainer = create("div", "", "mOptionsListContainer");
    optionsListContainer.style.display = "flex";
    optionsListContainer.style.justifyContent = "center";

    let optionsList = create("table", "", "mOptionsList");
    let trOpt = create("tr", "");
    let thIndex = create("th", "Numer");
    let thOption = create("th", "Opcja");
    let thVotes = create("th", "Ilość głosów");
    trOpt.append(thIndex, thOption, thVotes);
    optionsList.appendChild(trOpt);

    for(let i = 0; i < data.votingOptions.length; i++) {
        let tr = create("tr", "");
        let tdIndex = create("td", data.votingOptions[i].optionIndex);
        let tdOption = create("td", data.votingOptions[i].option);
        let tdVotes = create("td", data.votingOptions[i].votes);
        tr.append(tdIndex, tdOption, tdVotes);
        optionsList.appendChild(tr);
    }
    optionsListContainer.appendChild(optionsList);

    let validVotes = 0;
    let abstain = 0;

    for(let i = 0; i < data.votes.length; i++) {
        if(data.votes[i].vote == "VOTE_VALID") validVotes++;
        else abstain++;
    }

    let validityStats = create("p", `Głosów ważnych: <b>${validVotes}</b>; Nie oddano głosu / Nieobecny: <b>${abstain}</b>`);

    let tableContainer = create("div", "", "tableContainer");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    let table = create("table", "", "votingTable");
    let tr = create("tr", "");
    let thName = create("th", "Nazwisko i imię");
    let thClub = create("th", "Klub");
    let thVote = create("th", "Głos");
    tr.append(thName, thClub, thVote);
    table.appendChild(tr);
    for(let i = 0; i < data.votes.length; i++) {
        let tr = create("tr", "");
        let tdName = create("td", `<a target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].MP}. ${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`);
        let tdClub = create("td", `<a target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`);
        let voteText;
        for(let j = 1; j <= data.votingOptions.length; j++) {
            if(data.votes[i].listVotes[j] == "YES") {
                voteText = data.votingOptions[j-1].option;
            }
        }
        if(!voteText) voteText = "BRAK";
        let tdVote = create("td", voteText);
        if(data.votes[i].vote == "ABSENT") {
            tdName.innerHTML = `<a class="absent" target="_blank" href="/result/mp.html?id=${data.votes[i].MP}">${data.votes[i].lastName.toUpperCase()} ${data.votes[i].firstName}</a>`
            tdClub.innerHTML = `<a class="absent" target="_blank" href="/result/clubs.html?id=${data.votes[i].club}">${data.votes[i].club}</a>`
            tdVote.className = "absent";
            tdVote.innerHTML = "NIEOBECNY";
        }
        tr.append(tdName, tdClub, tdVote);
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);

    infoSection.append(title, top, vote, optionsListContainer, validityStats);
    if(data.againstAll) {
        let againstAllInfo = create("p", `Posłowie będący przeciwko wszystkim opcjom: <b>${data.againstAll}</b>`);
        infoSection.appendChild(againstAllInfo);
    }
    container.append(backLink, selector, infoSection, tableContainer);
}

async function votingKindRegular() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);
    (data.kind == "ON_LIST") ? votingRegularList() : votingRegular();
}

async function votingKindMobile() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`);
    (data.kind == "ON_LIST") ? votingMobileList() : votingMobile();
}

function handleDeviceWidth() {
    if (window.innerWidth <= 1120) {
        votingKindMobile();
    } else {
        votingKindRegular();
    }
}

handleDeviceWidth();

window.addEventListener('resize', handleDeviceWidth);