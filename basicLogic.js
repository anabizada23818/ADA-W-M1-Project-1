// Seat list (flexbox cards) and app startup

const typeLabels = {
    [SeatType.SMALL]: "Small round",
    [SeatType.BIG]: "Big round",
    [SeatType.RECTANGULAR]: "Rectangular",
    [SeatType.COUCH_TABLE]: "Couch table"
};

function renderSeats() {
    const container = document.getElementById("seats-container");
    container.innerHTML = "";

    seats.forEach(seat => {
        const card = document.createElement("article");
        card.className = "seat-card";

        const selectable = isSelectable(seat);
        const isSelected = seat.status === SeatStatus.SELECTED;

        let buttonText = "Unavailable";
        let buttonClass = "btn-action btn-disabled";
        if (selectable) {
            buttonText = isSelected ? "Deselect" : "Select Seat";
            buttonClass = isSelected ? "btn-action btn-deselect" : "btn-action btn-select";
        }

        const imageSrc = getSeatImage(seat);

        card.innerHTML = `
            <div class="seat-preview">
                <img class="seat-image" src="${imageSrc}" alt="${typeLabels[seat.type] || seat.type} table">
            </div>
            <div class="seat-info">
                <header class="seat-header">
                    <h3 class="seat-title">${seat.name}</h3>
                    <span class="status-tag status-${seat.status}">${seat.status}</span>
                </header>
                <div class="seat-details">
                    <p>Capacity: ${seat.capacity} Person(s)</p>
                    <p>Type: ${typeLabels[seat.type] || seat.type}</p>
                    <p>Price: ${formatPrice(getSeatPrice(seat))}</p>
                </div>
                <button class="${buttonClass}" ${selectable ? "" : "disabled"}>${buttonText}</button>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            toggleSeatSelection(seat.id);
        });

        container.appendChild(card);
    });

    const selected = seats.filter(s => s.status === SeatStatus.SELECTED);
    const total = selected.reduce((sum, s) => sum + getSeatPrice(s), 0);
    document.getElementById("cart-summary").textContent =
        `Selected Seats: ${selected.length} · Total: ${formatPrice(total)}`;
}

loadSeats();
renderSeats();
