// © 2025 AV/PA Studios

async function displayStreams() {
    const data = await getData("https://api.sejm.gov.pl/sejm/term10/videos/today");
    hideLoadingOverlay();

    const container = document.getElementById("container");
    container.innerHTML = "";
    if(!data.length) {
        let info = create("p", "Dzisiaj nie ma żadnych transmisji.", "info");
        info.style.paddingBottom = "48vh";
        container.appendChild(info);
    } else {
        let streamContainer = create("div", "", "", "glass-navbar streamContainer");
        streamContainer.style.display = "flex";
        streamContainer.style.flexDirection = "row";
        streamContainer.style.width = "90%";
        streamContainer.style.border = "none"; 
        let titleContainer = create("div", "", "", "streamInfoContainer");
        let title = create("h3", "Tytuł");
        let desc = create("p", "Opis");
        titleContainer.append(title, desc);
        let time = create("p", `Czas`, "", "streamInfoContainer");
        let room = create("p", "Miejsce", "", "streamInfoContainer");
        let type = create("p", "Typ", "", "streamInfoContainer");
        let btn = create("div", ``, "", "streamInfoContainer");
        streamContainer.append(titleContainer, time, room, type, btn);
        container.append(streamContainer, create("br", ""));

        for(let i = 0; i < data.length; i++) {
            let streamContainer = create("div", "", "", "glass-navbar streamContainer");
            streamContainer.style.display = "flex";
            streamContainer.style.flexDirection = "row";
            let titleContainer = create("div", "", "", "streamInfoContainer");
            let title = create("h3", data[i].title);
            let desc;
            if(data[i].description) {
                if(data[i].description.length > 100) {
                    desc = create("p", data[i].description.slice(0, 100) + "...");
                } else {
                    desc = create("p", data[i].description);
                }
            } else {
                desc = create("p", "<i>Brak opisu.</i>");
            }
            titleContainer.append(title, desc);
            let time = create("p", `${data[i].startDateTime.split("T")[1]} - ${data[i].endDateTime.split("T")[1]}`, "", "streamInfoContainer");
            let room = create("p", data[i].room, "", "streamInfoContainer");
            let type = create("p", data[i].type, "", "streamInfoContainer");
            let btn = create("a", `<button>Oglądaj</button>`, "", "streamInfoContainer");
            btn.href = `/result/watch.html?unid=${data[i].unid}`;
            streamContainer.append(titleContainer, time, room, type, btn);
            container.append(streamContainer, create("br", ""));
        }
    }
}

async function displayStreamsMobile() {
    const data = await getData("https://api.sejm.gov.pl/sejm/term10/videos/today");
    hideLoadingOverlay();

    const container = document.getElementById("container");
    container.innerHTML = "";
    if(!data.length) {
        let info = create("p", "Dzisiaj nie ma żadnych transmisji.", "info");
        info.style.paddingBottom = "48vh";
        container.appendChild(info);
    } else {
        for(let i = 0; i < data.length; i++) {
            let streamContainer = create("div", "", "", "glass-navbar streamContainer");
            streamContainer.style.display = "flex";
            streamContainer.style.flexDirection = "column";
            let titleContainer = create("div", "", "", "mstreamInfoContainer");
            let title = create("h3", data[i].title);
            let desc;
            if(data[i].description) {
                desc = create("p", data[i].description);
            } else {
                desc = create("p", "<i>Brak opisu.</i>");
            }
            titleContainer.append(title, desc);
            let time = create("p", `${data[i].startDateTime.split("T")[1]} - ${data[i].endDateTime.split("T")[1]}`, "", "mstreamInfoContainer");
            let type = create("p", data[i].type, "", "mstreamInfoContainer");
            let btn = create("a", `<button>Oglądaj</button>`, "", "mstreamInfoContainer");
            btn.href = `/result/watch.html?unid=${data[i].unid}`;
            streamContainer.append(titleContainer, time, type, create("br", ""), btn);
            container.append(streamContainer, create("br", ""));
        }
    }
}

function handleDeviceWidth() {
    if (window.innerWidth <= 1120) {
        displayStreamsMobile();
    } else {
        displayStreams();
    }
}

handleDeviceWidth();

window.addEventListener('resize', handleDeviceWidth);