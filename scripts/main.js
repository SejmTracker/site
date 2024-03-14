// © 2024 vimedia

fetch(`/assets/data.json`)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    document.getElementById("ver").textContent = data.version;
})