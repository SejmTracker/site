let attempt = 0;
function fetchData() {
    attempt++;
    fetch(`https://api.sejm.gov.pl/sejm/term10/clubs`)
        .then(response => response.json())
        .then(async data => {
            document.querySelector('.loader-overlay').style.display = 'none';
            
            let div = document.getElementById("tab");
            let imagePromises = [];

            for (let i = 0; i < data.length; i++) {
                let table = document.createElement("table");
                let row = document.createElement("tr");
                let c1 = document.createElement("td");
                let c2 = document.createElement("td");
    
                // Tworzymy obraz z lazy loadingiem
                let img = new Image();
                img.dataset.src = `https://api.sejm.gov.pl/sejm/term10/clubs/${data[i].id}/logo`;
                img.className = "lazy";
                c1.appendChild(img);
    
                c2.innerHTML = `<p>${data[i].name}</p>`;
                table.addEventListener('click', function () {
                    window.location.href = `/result/clubs.html?id=${data[i].id}`;
                });
                table.className = "single";
                row.appendChild(c1);
                row.appendChild(c2);
                table.appendChild(row);
                div.appendChild(table);
    
                // Dodajemy obietnicę ładowania obrazu
                imagePromises.push(new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = img.dataset.src;
                }));
            }
    
            // Czekamy, aż wszystkie obrazy się załadują
            await Promise.all(imagePromises);
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

// fetch(`https://api.sejm.gov.pl/sejm/term10/clubs`)
//     .then(response => {
//         if (!response.ok) {
//             document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubów.<br><br></p></center>`;
//             document.title = "Wystąpił błąd | SejmTracker";
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(async data => {
//         let div = document.getElementById("tab");
//         let imagePromises = [];

//         for (let i = 0; i < data.length; i++) {
//             let table = document.createElement("table");
//             let row = document.createElement("tr");
//             let c1 = document.createElement("td");
//             let c2 = document.createElement("td");

//             // Tworzymy obraz z lazy loadingiem
//             let img = new Image();
//             img.dataset.src = `https://api.sejm.gov.pl/sejm/term10/clubs/${data[i].id}/logo`;
//             img.className = "lazy";
//             c1.appendChild(img);

//             c2.innerHTML = `<p>${data[i].name}</p>`;
//             table.addEventListener('click', function () {
//                 window.location.href = `/result/clubs.html?id=${data[i].id}`;
//             });
//             table.className = "single";
//             row.appendChild(c1);
//             row.appendChild(c2);
//             table.appendChild(row);
//             div.appendChild(table);

//             // Dodajemy obietnicę ładowania obrazu
//             imagePromises.push(new Promise((resolve, reject) => {
//                 img.onload = resolve;
//                 img.onerror = reject;
//                 img.src = img.dataset.src;
//             }));
//         }

//         // Czekamy, aż wszystkie obrazy się załadują
//         await Promise.all(imagePromises);
//     });

// Lazy loading obrazków
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                obs.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});