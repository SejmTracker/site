// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

fetch(`https://api.sejm.gov.pl/sejm/term10/clubs/${id}`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubu.<br><br></p></center>`
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    document.getElementById("photo").src = `https://api.sejm.gov.pl/sejm/term10/clubs/${id}/logo`;
    document.getElementById("name").textContent = data.name;
    document.getElementById("id").textContent = data.id;
    document.getElementById("membersCount").textContent = data.membersCount;
    document.getElementById("phone").textContent = data.phone;
    document.getElementById("fax").textContent = data.fax;
    document.getElementById("email").innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
    document.title = `${data.id} | SejmTracker`;
})