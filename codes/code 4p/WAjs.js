/* LED */
function toggleLED(ledNumber) {
    const ledButton = document.getElementById(`led${ledNumber}`);
    const isOn = ledButton.classList.contains('toggle-on');
    const newState = isOn ? 'OFF' : 'ON';

    // Changer l'état du bouton
    ledButton.textContent = `LED ${ledNumber}: ${newState}`;
    ledButton.classList.toggle('toggle-on', !isOn);
    ledButton.classList.toggle('toggle-off', isOn);

    // Envoyer la requête à l'Arduino
    fetch(`http://adresse-de-votre-arduino/led${ledNumber}/${newState}`)
        .then(response => console.log(`LED ${ledNumber} turned ${newState}`))
        .catch(err => console.error('Erreur:', err));
}

/* BOUTON */
function checkButton(buttonNumber) {
    const button = document.getElementById(`button${buttonNumber}`);
    const isOn = button.classList.contains('toggle-on');
    const newState = isOn ? 'OFF' : 'ON';

    // Changer l'état du bouton
    button.textContent = `Bouton ${buttonNumber}: ${newState}`;
    button.classList.toggle('toggle-on', !isOn);
    button.classList.toggle('toggle-off', isOn);

    // Envoyer la requête à l'Arduino
    fetch(`http://adresse-de-votre-arduino/button${buttonNumber}/${newState}`)
        .then(response => console.log(`Button ${buttonNumber} turned ${newState}`))
        .catch(err => console.error('Erreur:', err));
}

/* POTENTIOMETRE */
function updatePotValue() {
    var potentiometer = document.getElementById("potentiometer");
    var value = potentiometer.value;
    var indicator = document.getElementById("indicator");

    // Convertir la valeur du potentiomètre (0 à 1023) en un angle (0 à 270 degrés)
    var angle = (value / 1023) * 270 - 135; // Rotation de -135° à 135°

    // Mettre à jour la rotation de l'indicateur
    indicator.style.transform = `rotate(${angle}deg)`;

    // Mettre à jour la valeur affichée
    document.getElementById("potValue").innerText = value;

    // Simuler l'envoi de la valeur
    console.log("Valeur du potentiomètre : " + value);
}
