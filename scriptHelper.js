// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    if (
        validateInput(pilot.value) === "Empty" ||
        validateInput(copilot.value) === "Empty" ||
        validateInput(fuelLevel.value) === "Empty" ||
        validateInput(cargoLevel.value) === "Empty"
    ) {
        alert("All fields are required");
    }
    if (validateInput(pilot.value) === "Is a Number" || validateInput(copilot.value) === "Is a Number") {
        alert("Pilot and Co-pilot fields should contain strings");
    }
    if (validateInput(fuelLevel.value) === "Not a Number" || validateInput(cargoLevel.value) === "Not a Number") {
        alert("Fuel and Cargo levels should be numbers");
    }

    if (
        validateInput(pilot.value) === "Not a Number" &&
        validateInput(copilot.value) === "Not a Number" &&
        validateInput(fuelLevel.value) === "Is a Number" &&
        validateInput(cargoLevel.value) === "Is a Number"
    ) {
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;
        if (Number(cargoLevel.value) > 10000) {
            cargoStatus.innerHTML = "Cargo mass too high for launch";
        } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
        }
        if (Number(fuelLevel.value) < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
        }
        if (Number(cargoLevel.value) > 10000 || Number(fuelLevel.value) < 10000) {
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else {
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    return randomPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
