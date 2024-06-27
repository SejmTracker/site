// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

fetch(`https://api.sejm.gov.pl/sejm/term10/MP/${id}`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć posła.<br><br></p></center>`
      document.title = "Wystąpił błąd | SejmTracker";
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
  if(data.active == false) {
    document.getElementById("div").innerHTML = `<p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>MANDAT WYGASŁ<br>Mandat posła został wygaszony z powodu: ${data.waiverDesc}<br><br></p>`
  }

    document.getElementById("photo").src = `https://api.sejm.gov.pl/sejm/term10/MP/${id}/photo`;
    document.getElementById("lastFirstName").textContent = data.firstLastName;
    document.getElementById("id").textContent = data.id;
    document.getElementById("dob").textContent = data.birthDate;
    document.getElementById("pob").textContent = data.birthLocation;
    document.getElementById("club").innerHTML = `<a target="_blank" href="/result/clubs.html?id=${data.club}">${data.club}</a>`;
    document.getElementById("district").textContent = `${data.districtName} (${data.districtNum})`;
    document.getElementById("voivodeship").textContent = data.voivodeship;
    document.getElementById("votesQty").textContent = data.numberOfVotes;
    document.getElementById("educationLvl").textContent = data.educationLevel;
    document.getElementById("profession").textContent = data.profession;
    document.getElementById("email").innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
    document.getElementById("btnSpace").innerHTML = `<a id="btnMP" href="/result/mp.html?id=${data.id - 1}">< Poprzedni</a>&nbsp;<a id="btnMP" href="/result/mp.html?id=${data.id + 1}">Następny ></a>`
    document.title = `${data.firstLastName} | SejmTracker`;
})