// © 2025 SejmTracker

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const unid = urlParams.get('unid');

fetch(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć transmisji.<br><br></p></center>`
      document.title = "Wystąpił błąd | SejmTracker";
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    let back = document.createElement("p");
    let header = document.createElement("h1");
    let desc = document.createElement("p");
    let div = document.createElement("div");

    back.innerHTML = `<a href="/live.html">< Powrót do wyboru transmisji</a>`;
    header.textContent = data.title;
    desc.innerHTML = `<i>${data.description}</i>`;
    div.innerHTML = `<iframe id="videoPlayerFrame" width="912" height="710" src="https://www.sejm.gov.pl/Sejm10.nsf/VideoFrame.xsp/${unid}" frameborder="0" allowfullscreen></iframe>`;
    let cont = document.getElementById("stream-container");
    cont.appendChild(back);
    cont.appendChild(header);
    cont.appendChild(desc);
    cont.appendChild(div);

    document.title = `${data.title} | SejmTracker`;
})