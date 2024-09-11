// © 2024 vimedia

let unid = "";

fetch(`https://api.sejm.gov.pl/sejm/term10/videos/today`)
.then(response => {
    if (!response.ok) {
        document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć transmisji.<br><br></p></center>`
        document.title = "Wystąpił błąd | SejmTracker";
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    for(let i = 0; i < data.length; i++) {
        if(data[i].type == "posiedzenie") {
            console.log(data[i])
            unid = data[i].unid;
            document.getElementById("live").innerHTML = `<iframe id="videoPlayerFrame" width="912" height="620" src="https://www.sejm.gov.pl/Sejm10.nsf/VideoFrame.xsp/${unid}" frameborder="0" allowfullscreen></iframe>`
        }
    }
    if(unid == "") {
        document.getElementById("live").innerHTML = `<p>Dzisiaj nie ma posiedzenia Sejmu.</p>`
    }
})