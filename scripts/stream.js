// © 2025 SejmTracker

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const unid = urlParams.get('unid');

async function showStream() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`);
    hideLoadingOverlay();

    let back = document.createElement("p");
    let header = document.createElement("h1");
    let desc = document.createElement("p");
    let streamEmbed = document.createElement("div");

    back.innerHTML = `<a href="/live.html">< Powrót do wyboru transmisji</a>`;
    header.textContent = data.title;
    if(data.description) {
        desc.innerHTML = `<i>${data.description}</i>`;
    } else {
        desc.innerHTML = `<i>Brak opisu.</i>`;
    }
    streamEmbed.innerHTML = `<iframe id="videoPlayerFrame" width="912" height="710" src="https://sejm.gov.pl/Sejm10.nsf/VideoFrame.xsp/${unid}" frameborder="0" allowfullscreen></iframe>`
    let cont = document.getElementById("stream-container");
    cont.appendChild(back);
    cont.appendChild(header);
    cont.appendChild(desc);
    cont.appendChild(streamEmbed);

    document.title = `${data.title} | SejmTracker`;
}

showStream();