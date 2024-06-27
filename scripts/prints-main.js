// © 2024 vimedia

fetch(`https://api.sejm.gov.pl/sejm/term10/prints`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć druków.<br><br></p></center>`
      document.title = "Wystąpił błąd | SejmTracker";
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
  let name;

  for(let i = 0; i < data.length; i++) {
    name = data[i].title
    if(name.length > 100) {
      name = name.slice(0, 100) + "...";
    }

    let div = document.getElementById("tab");
    let table = document.createElement("table");
    let row = document.createElement("tr");
    let c1 = document.createElement("td");
    c1.innerHTML = `<p>Druk nr ${data[i].number}<br>${name}</p>`;
    table.addEventListener('click', function() {
        window.open(`/result/print.html?id=${data[i].number}`);
    });
    table.className = "single";
    row.appendChild(c1);
    table.appendChild(row);
    div.appendChild(table);
  }
})