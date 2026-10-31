// Shared seat data: loaded from seats.js

const SeatStatus = {
    AVAILABLE: "available",
    SELECTED: "selected",
    RESERVED: "reserved",
    UNAVAILABLE: "unavailable"
};

const SeatType = {
    SMALL: "small",             // small round tables
    BIG: "big",                 // big round tables
    RECTANGULAR: "rectangular", // the tables which are next to each, usually reserved during events
    COUCH_TABLE: "couch_table"  // tables with couches
};

// Preview image shown on the seat card for each seat type
const SeatTypeImages = {
    [SeatType.SMALL]: "images/small-table.jpg",
    [SeatType.BIG]: "images/small-table.jpg",
    [SeatType.RECTANGULAR]: "images/rectangular-table.jpg",
    [SeatType.COUCH_TABLE]: "images/couch-table.jpg"
};

function getSeatImage(seat) {
    return SeatTypeImages[seat.type] || null;
}

// Single source of truth used by both the list and the map view
let seats = [];

// Parse layout + statuses from SEATS_JSON (seats.js)
function loadSeats() {
    seats = JSON.parse(SEATS_JSON);
}

function isSelectable(seat) {
    return seat.status === SeatStatus.AVAILABLE || seat.status === SeatStatus.SELECTED;
}
