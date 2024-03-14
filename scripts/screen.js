// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const sit = urlParams.get('sit');
const id = urlParams.get('id');

fetch(`https://api.sejm.gov.pl/sejm/term10/votings/${sit}/${id}`)
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    document.getElementById("voteNum").textContent = id;
    document.getElementById("total").textContent = data.totalVoted;
    document.getElementById("yes").textContent = data.yes;
    document.getElementById("no").textContent = data.no;
    document.getElementById("abstain").textContent = data.abstain;
})