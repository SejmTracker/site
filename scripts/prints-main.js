// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/prints`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć druków.<br><br></p></center>`
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
  for(let i = 0; i < data.length; i++) {
    let div = document.getElementById("search");
    let printName = document.createElement("p");
    printName.innerHTML = `<a href="/result/print.html?id=${data[i].number}">${data[i].number}. ${data[i].title}</a>`;
    div.appendChild(printName);
  }
})