// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

fetch(`https://im-vi.github.io/vi-api/sejmtracker/ministries/${id}.json`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć ministerstwa.<br><br></p></center>`
      document.title = "Wystąpił błąd | SejmTracker";
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
  console.log(data.id)
  document.getElementById("img").src = `/assets/ministries/${data.id}.png`;
  document.getElementById("name").innerHTML = `<a target="_blank" href="${data.link}">${data.name}</a>`;
  document.getElementById("address").textContent = `${data.address}, ${data.postal} ${data.city}`;
  document.getElementById("nip").textContent = data.nip;
  document.getElementById("regon").textContent = data.regon;
  document.getElementById("mp").innerHTML = `<a target="_blank" href="/result/mp.html?id=${data.mp}">${data.mpname}</a>`
  document.title = `${data.name} | SejmTracker`;
})