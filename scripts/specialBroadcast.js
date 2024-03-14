// © 2024 vimedia

fetch(`https://im-vi.github.io/vi-api/sejmtracker/specialBroadcast.json`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć głosowań.<br><br></p></center>`
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    let link = document.getElementById("specialBroadcast");
    if(data.active == true) {
        link.textContent = `Transmisja specjalna: ${data.name}`;
    }
})