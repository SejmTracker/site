// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

fetch(`https://api.sejm.gov.pl/sejm/term10/prints/${id}`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć druku.<br><br></p></center>`
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    document.getElementById("title").textContent = data.title;
    document.getElementById("num").textContent = data.number;
    document.getElementById("date").textContent = data.deliveryDate;
    document.getElementById("pdf").src = `https://api.sejm.gov.pl/sejm/term10/prints/${id}/${id}.pdf`;
    document.title = `Druk nr ${data.number} | SejmTracker`;
})