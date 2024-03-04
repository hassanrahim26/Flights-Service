function addRowLockOnFlights(flightId) {
    return `select * from Flights where Flights.id = ${flightId} for update;`;
}

module.exports = {
    addRowLockOnFlights
}