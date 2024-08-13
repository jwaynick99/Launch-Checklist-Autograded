// Write your JavaScript code here!

window.addEventListener("load", function () {
    let document = this.document;
    let submit = document.getElementById("formSubmit");
    let faultyItems = document.getElementById("faultyItems");
    let pilotName = document.getElementsByName("pilotName")[0];
    let copilotName = document.getElementsByName("copilotName")[0];
    let fuelLevel = document.getElementsByName("fuelLevel")[0];
    let cargoMass = document.getElementsByName("cargoMass")[0];
    faultyItems.style.visibility = "hidden";

    submit.addEventListener("click", function (event) {
        formSubmission(document, faultyItems, pilotName, copilotName, fuelLevel, cargoMass);
        event.preventDefault();
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse
        .then(function (result) {
            listedPlanets = result;
        })
        .then(function () {
            // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
            let randomPlanet = pickPlanet(listedPlanets);
            addDestinationInfo(
                document,
                randomPlanet["name"],
                randomPlanet["diameter"],
                randomPlanet["star"],
                randomPlanet["distance"],
                randomPlanet["moons"],
                randomPlanet["image"]
            );
        });
});
