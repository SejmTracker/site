// © 2025 SejmTracker

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const unid = urlParams.get('unid');

let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
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
        .catch(() => {
            if (attempt >= 7) {
                document.getElementById('loaderContainer').innerHTML = `
                    <p>Nie udało się załadować zawartości. Odśwież stronę i spróbuj ponownie.</p>
                    <button onclick="location.reload()"><i class="fa-solid fa-rotate-right"></i> Odśwież</button>
                `;
                return;
            }
            let text = "Ponawiam próbę";
            if (attempt === 2) text = "Trwa to dłużej niż powinno...";
            if (attempt > 2) text = `Ponawiam próbę (${attempt - 2})...`;
            document.getElementById('loadingText').innerText = text;
            setTimeout(fetchData, 2000);
        });
}
fetchData();

// fetch(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`)
// .then(response => {
//     if (!response.ok) {
//       document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć transmisji.<br><br></p></center>`
//       document.title = "Wystąpił błąd | SejmTracker";
//       throw new Error('Network response was not ok');
//     }
//         return response.json();
// })
// .then(data => {
//     let back = document.createElement("p");
//     let header = document.createElement("h1");
//     let desc = document.createElement("p");
//     let div = document.createElement("div");

//     back.innerHTML = `<a href="/live.html">< Powrót do wyboru transmisji</a>`;
//     header.textContent = data.title;
//     desc.innerHTML = `<i>${data.description}</i>`;
//     div.innerHTML = `<iframe id="videoPlayerFrame" width="912" height="710" src="https://www.sejm.gov.pl/Sejm10.nsf/VideoFrame.xsp/${unid}" frameborder="0" allowfullscreen></iframe>`;
//     let cont = document.getElementById("stream-container");
//     cont.appendChild(back);
//     cont.appendChild(header);
//     cont.appendChild(desc);
//     cont.appendChild(div);

//     document.title = `${data.title} | SejmTracker`;
// })