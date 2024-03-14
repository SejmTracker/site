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
    let title = document.getElementById("title");
    title.textContent = `Transmisja specjalna: ${data.name}`
    let live = document.getElementById("live");
    live.innerHTML = `<iframe id="videoPlayerFrame" width="912" height="620" src="https://sejm-embed.redcdn.pl/Sejm10.nsf/VideoFrame.xsp/${data.unid}" frameborder="0" allowfullscreen></iframe>`
})