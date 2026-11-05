// Seat list (flexbox cards), filters and app startup

let currentFilter = "all";

const typeLabels = {
    [SeatType.SMALL]: "Small round",
    [SeatType.BIG]: "Big round",
    [SeatType.RECTANGULAR]: "Rectangular",
    [SeatType.COUCH_TABLE]: "Couch table"
};

function renderSeats() {
    const container = document.getElementById("seats-container");
    container.innerHTML = "";

    seats
        .filter(seat => currentFilter === "all" || seat.status === currentFilter)
        .forEach(seat => {
            const card = document.createElement("article");
            card.className = "seat-card";
            card.tabIndex = 0;

            const selectable = isSelectable(seat);
            const isSelected = seat.status === SeatStatus.SELECTED;
            
            let buttonText = "Unavailable";
            let buttonClass = "btn-action btn-disabled";
            if (selectable) {
                buttonText = isSelected ? "Deselect" : "Select Seat";
                buttonClass = isSelected ? "btn-action btn-deselect" : "btn-action btn-select";
            }

            // Use the type's image; fall back to the CSS shape if there is none
            const imageSrc = getSeatImage(seat);
            const preview = imageSrc
                ? `<img class="seat-image" src="${imageSrc}" alt="${typeLabels[seat.type] || seat.type} table">`
                : `<div class="map-table ${seat.type} status-${seat.status}"></div>`;

            card.innerHTML = `
                <div class="seat-preview">
                    ${preview}
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

            // Clicking the card opens the map scrolled to this seat
            card.addEventListener("click", () => openTopDownView(seat.id));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && e.target === card) openTopDownView(seat.id);
            });

            // The button toggles selection without opening the map
            card.querySelector("button").addEventListener("click", (e) => {
                e.stopPropagation();
                toggleSeatSelection(seat.id);
            });

            container.appendChild(card);
        });

    const selected = seats.filter(s => s.status === SeatStatus.SELECTED);
    const total = selected.reduce((sum, s) => sum + getSeatPrice(s), 0);
    document.getElementById("cart-summary").textContent =
        `Selected Seats: ${selected.length} · Total: ${formatPrice(total)}`;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderSeats();
    });
});

document.getElementById("reset-storage-btn").addEventListener("click", () => {
    resetSeats();
    renderSeats();
    renderWorld();
});

loadSeats();
renderSeats();
