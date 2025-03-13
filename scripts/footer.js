/*
Wersja v<span id="ver"></span><br>
&copy; 2024 SejmTracker. Wszelkie prawa zastrzeżone.<br><br>
Dane &copy; <a href="https://sejm.gov.pl/">System Informacyjny Sejmu</a> &bull; <a href="/contact.html" target="_blank">Kontakt</a> &bull; <a href="/privacy-policy.html">Polityka prywatności</a>
<br>
<p>
    <a href="https://instagram.com/sejmtracker.pl" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://github.com/im-vi/SejmTracker" target="_blank"><i class="fa-brands fa-github"></i></a>
    <a href="https://youtube.com/@sejmtracker" target="_blank"><i class="fa-brands fa-youtube"></i></a>
</p>
*/

let version;

fetch(`/assets/data.json`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
    let foot = document.createElement("footer");
    foot.innerHTML = `Wersja v${data.version}<br>
    &copy; 2025 SejmTracker. Wszelkie prawa zastrzeżone.<br><br>
    Dane &copy; <a href="https://sejm.gov.pl/">System Informacyjny Sejmu</a> &bull; <a href="/contact.html" target="_blank">Kontakt</a> &bull; <a href="/privacy-policy.html">Polityka prywatności</a>
    <br>
    <p>
        <a href="https://instagram.com/sejmtracker.pl" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://github.com/im-vi/SejmTracker" target="_blank"><i class="fa-brands fa-github"></i></a>
        <a href="https://youtube.com/@sejmtracker" target="_blank"><i class="fa-brands fa-youtube"></i></a>
    </p>`;
    document.body.appendChild(foot);
});