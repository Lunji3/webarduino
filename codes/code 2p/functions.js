/* LEDS */
/* États des LEDs (initialement éteintes) */
const ledStates = {
    1: false,
    2: false,
    3: false,
    4: false
};

/* Fonction pour basculer l'état d'une LED */
function toggleLED(ledNumber) {
    // Basculer l'état de la LED (allumée/éteinte)
    ledStates[ledNumber] = !ledStates[ledNumber];

    // Mettre à jour l'affichage de la LED
    const ledElement = document.getElementById(`led${ledNumber}`);
    if (ledStates[ledNumber]) {
        ledElement.classList.add("on"); // LED allumée
    } else {
        ledElement.classList.remove("on"); // LED éteinte
    }

    // Envoyer la requête à l'Arduino
    fetch(`http://adresse-de-votre-arduino/led${ledNumber}/${ledStates[ledNumber] ? 'ON' : 'OFF'}`)
        .then(response => console.log(`LED ${ledNumber} turned ${ledStates[ledNumber] ? 'ON' : 'OFF'}`))
        .catch(err => console.error('Erreur:', err));
}

/* BOUTONS */
/* Fonction pour vérifier et changer l'état d'un bouton */
function checkButton(buttonNumber) {
    const button = document.getElementById(`button${buttonNumber}`);
    const isOn = button.classList.contains('toggle-on');
    const newState = isOn ? 'OFF' : 'ON';

    // Mettre à jour l'état visuel du bouton
    button.textContent = `Bouton ${buttonNumber}: ${newState}`;
    button.classList.toggle('toggle-on', !isOn);
    button.classList.toggle('toggle-off', isOn);

    // Envoyer la requête à l'Arduino
    fetch(`http://adresse-de-votre-arduino/button${buttonNumber}/${newState}`)
        .then(response => console.log(`Button ${buttonNumber} turned ${newState}`))
        .catch(err => console.error('Erreur:', err));
}

/* POTENTIOMETRE */
/* Fonction pour mettre à jour l'affichage du potentiomètre */
function updatePotValue() {
    const potentiometer = document.getElementById("potentiometer");
    const value = potentiometer.value;
    const indicator = document.getElementById("indicator");

    // Convertir la valeur en angle pour l'indicateur (0 à 1023 -> -135° à +135°)
    const angle = (value / 1023) * 270 - 135;

    // Appliquer la rotation à l'indicateur
    indicator.style.transform = `rotate(${angle}deg)`;

    // Afficher la valeur du potentiomètre
    document.getElementById("potValue").innerText = value;

    // Simulation d'envoi de la valeur
    console.log("Valeur du potentiomètre :", value);
}
