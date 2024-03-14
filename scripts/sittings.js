// © 2024 vimedia

fetch(`https://im-vi.github.io/vi-api/sejmtracker/sittings.json`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowań.<br><br></p></center>`
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    let div = document.getElementById("tab");
    let sit = "";
    for(let i = 0; i < data.length; i++) {
        if(data[i].started == true) {
            sit = sit + `<a href="/result/votingSelect.html?sit=${data[i].id}">${data[i].name}</a><br><br>`
        }
    }
    div.innerHTML = sit
})