function popUp(type, title, content = "", action = null) {
    // Dodanie kontenera, jeśli go brakuje
    let container = document.getElementById('popup-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'popup-container';
        document.body.appendChild(container);
    }

    // Wyczyszczenie poprzedniej zawartości
    container.innerHTML = '';

    // Tworzenie okna modalnego
    const popup = document.createElement('div');
    popup.className = `popup ${type}`; // Typ okna wpływa na jego styl

    // Symbol zależny od typu
    const typeIcons = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        error: '❌'
    };

    const symbol = document.createElement('span');
    symbol.className = 'popup-icon';
    symbol.innerText = typeIcons[type] || ''; // Domyślnie pusty, jeśli brak typu

    // Dodanie nagłówka i przycisku zamykania
    const closeButton = document.createElement('span');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => closePopup();

    const popupTitle = document.createElement('h2');
    popupTitle.className = 'popup-title';
    popupTitle.innerHTML = title;

    // Treść okna
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = content;

    // Dodanie przycisku akcji
    const popupButton = document.createElement('button');
    popupButton.className = 'popup-button ' + type;
    popupButton.innerText = 'OK'; // Domyślnie "OK"
    popupButton.onclick = () => {
        if (typeof action === 'function') {
            action();
        }
        closePopup();
    };

    // Składanie okna
    popup.appendChild(closeButton);
    popup.appendChild(symbol);
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);
    popup.appendChild(popupButton);

    // Dodanie okna do kontenera
    container.appendChild(popup);

    // Wyświetlenie kontenera i okna
    container.style.display = 'flex';

    // Funkcja zamykająca
    function closePopup() {
        popup.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300); // Czas na zakończenie animacji
    }
}

function ask(title, content, yesAction = null, noAction = null) {
    // Użycie funkcji popUp z typem 'ask'
    const container = document.getElementById('popup-container') || (() => {
        const cont = document.createElement('div');
        cont.id = 'popup-container';
        document.body.appendChild(cont);
        return cont;
    })();

    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup ask';

    const symbol = document.createElement('span');
    symbol.className = 'popup-icon';
    symbol.innerText = '❓';

    const closeButton = document.createElement('span');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => closePopup();

    const popupTitle = document.createElement('h2');
    popupTitle.className = 'popup-title';
    popupTitle.innerHTML = title;

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = content;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'popup-buttons-container';

    const yesButton = document.createElement('button');
    yesButton.className = 'popup-button success';
    yesButton.innerText = 'Tak';
    yesButton.onclick = () => {
        if (typeof yesAction === 'function') {
            yesAction();
        }
        closePopup();
    };

    const noButton = document.createElement('button');
    noButton.className = 'popup-button error';
    noButton.innerText = 'Nie';
    noButton.onclick = () => {
        if (typeof noAction === 'function') {
            noAction();
        }
        closePopup();
    };

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    popup.appendChild(closeButton);
    popup.appendChild(symbol);
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);
    popup.appendChild(buttonContainer);

    container.appendChild(popup);
    container.style.display = 'flex';

    function closePopup() {
        popup.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    }
}

function ask(type = 'info', title, content = "", buttons = 'Tak|Nie', yesAction = null, noAction = null) {
    // Mapowanie ikon dla różnych typów
    const typeIcons = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        error: '❌'
    };

    // Wybrana ikona na podstawie typu lub domyślna
    const icon = typeIcons[type] || '❓';

    // Rozdzielenie tekstów przycisków
    const [yesText, noText] = buttons.split('|');

    // Użycie funkcji popUp z typem 'ask'
    const container = document.getElementById('popup-container') || (() => {
        const cont = document.createElement('div');
        cont.id = 'popup-container';
        document.body.appendChild(cont);
        return cont;
    })();

    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = `popup ${type}`;

    const symbol = document.createElement('span');
    symbol.className = 'popup-icon';
    symbol.innerText = icon;

    const closeButton = document.createElement('span');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => closePopup();

    const popupTitle = document.createElement('h2');
    popupTitle.className = 'popup-title';
    popupTitle.innerHTML = title;

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = content;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'popup-buttons-container';

    const yesButton = document.createElement('button');
    yesButton.className = 'popup-button success';
    yesButton.innerText = yesText || 'Tak';
    yesButton.onclick = () => {
        if (typeof yesAction === 'function') {
            yesAction();
        }
        closePopup();
    };

    const noButton = document.createElement('button');
    noButton.className = 'popup-button error';
    noButton.innerText = noText || 'Nie';
    noButton.onclick = () => {
        if (typeof noAction === 'function') {
            noAction();
        }
        closePopup();
    };

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    popup.appendChild(closeButton);
    popup.appendChild(symbol);
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);
    popup.appendChild(buttonContainer);

    container.appendChild(popup);
    container.style.display = 'flex';

    function closePopup() {
        popup.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    }
}

function modal(htmlContent, buttons = []) {
    // Dodanie kontenera, jeśli go brakuje
    const container = document.getElementById('popup-container') || (() => {
        const cont = document.createElement('div');
        cont.id = 'popup-container';
        document.body.appendChild(cont);
        return cont;
    })();

    container.innerHTML = ''; // Wyczyszczenie poprzedniej zawartości

    const popup = document.createElement('div');
    popup.className = 'popup modal'; // Klasa modal dla większego okna

    // Dodanie HTML wewnątrz okna
    const content = document.createElement('div');
    content.className = 'popup-content';
    content.innerHTML = htmlContent;

    // Dodanie przycisku zamykającego
    const closeButton = document.createElement('span');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => closePopup();

    popup.appendChild(closeButton);
    popup.appendChild(content);

    // Dodanie kontenera przycisków
    if (buttons.length > 0) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'popup-buttons-container';

        buttons.forEach((button) => {
            const btn = document.createElement('button');
            btn.className = 'popup-button';
            btn.innerText = button.text; // Tekst przycisku
            btn.onclick = () => {
                if (typeof button.action === 'function') {
                    button.action(); // Wykonaj akcję przycisku
                }
                closePopup();
            };
            buttonContainer.appendChild(btn);
        });

        popup.appendChild(buttonContainer);
    }

    container.appendChild(popup);
    container.style.display = 'flex';

    // Funkcja zamykania
    function closePopup() {
        popup.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    }
}
