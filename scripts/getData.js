// (C) 2025 AV/PA Studios

async function getData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Pobieranie danych zakończone niepowodzeniem.");
    }
    const data = await response.json();
    return data;
}
