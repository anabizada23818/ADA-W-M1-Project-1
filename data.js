// Shared seat data: loaded from seats.js, statuses persisted to localStorage.

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


// Price of reservation of each table
const SeatTypeCost = {
    [SeatType.SMALL] : 2.0,
    [SeatType.BIG] : 2.0,
    [SeatType.RECTANGULAR] : 2.0,
    [SeatType.COUCH_TABLE] : 2.0,
}

const CURRENCY = "AZN";

function getSeatPrice(seat) {
    return SeatTypeCost[seat.type] ?? 0;
}

function formatPrice(amount) {
    return `${amount.toFixed(2)} ${CURRENCY}`;
}

function getSeatImage(seat) {
    return SeatTypeImages[seat.type] || null;
}

const STORAGE_KEY = "canteen_selected_seats";
localStorage.removeItem("canteen_seat_statuses"); // drop old format that stored every status

// Single source of truth used by both the list and the map view
let seats = [];

// Parse layout + statuses from SEATS_JSON (seats.js), then re-apply the user's saved selections.
// seats.js is authoritative: a selection is only restored if the seat is still available there.
function loadSeats() {
    seats = JSON.parse(SEATS_JSON);

    let selectedIds = [];
    try {
        selectedIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        console.error("Failed to parse saved selections", e);
    }

    seats.forEach(seat => {
        if (selectedIds.includes(seat.id) && seat.status === SeatStatus.AVAILABLE) {
            seat.status = SeatStatus.SELECTED;
        }
    });
}

// Only the user's selections are stored; everything else always comes from seats.js
function saveSeats() {
    const selectedIds = seats.filter(s => s.status === SeatStatus.SELECTED).map(s => s.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
}

function resetSeats() {
    localStorage.removeItem(STORAGE_KEY);
    loadSeats();
}

function isSelectable(seat) {
    return seat.status === SeatStatus.AVAILABLE || seat.status === SeatStatus.SELECTED;
}

function toggleSeatSelection(seatId) {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || !isSelectable(seat)) return;

    seat.status = seat.status === SeatStatus.AVAILABLE ? SeatStatus.SELECTED : SeatStatus.AVAILABLE;
    saveSeats();
    renderSeats();
    renderWorld();
}
