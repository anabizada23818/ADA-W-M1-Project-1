// Top-down map view: each seat is absolutely positioned in the world by its [x, y]

const modal = document.getElementById("topdown-modal");
const worldContainer = document.getElementById("topdown-world");
const viewport = document.getElementById("topdown-viewport");

// World point (in world px) currently at the centre of the viewport.
// Browser zoom changes the viewport size but keeps the top-left scroll offset,
// so we restore this point on resize to make zoom scale around the centre.
let viewCenter = null;

function saveViewCenter() {
    viewCenter = {
        x: viewport.scrollLeft + viewport.clientWidth / 2 - worldContainer.offsetLeft,
        y: viewport.scrollTop + viewport.clientHeight / 2 - worldContainer.offsetTop
    };
}

function restoreViewCenter() {
    if (!viewCenter || !modal.open) return;
    viewport.scrollLeft = viewCenter.x + worldContainer.offsetLeft - viewport.clientWidth / 2;
    viewport.scrollTop = viewCenter.y + worldContainer.offsetTop - viewport.clientHeight / 2;
}

viewport.addEventListener("scroll", saveViewCenter);
window.addEventListener("resize", restoreViewCenter);

function openTopDownView(seatId) {
    renderWorld();
    modal.showModal();

    // Scroll the clicked seat into view inside the viewport (no highlight)
    const seatEl = worldContainer.querySelector(`[data-seat-id="${seatId}"]`);
    if (seatEl) seatEl.scrollIntoView({ block: "center", inline: "center" });
    saveViewCenter();
}

function renderWorld() {
    worldContainer.innerHTML = "";

    seats.forEach(seat => {
        const tableEl = document.createElement("button");
        tableEl.className = `map-table ${seat.type} status-${seat.status}`;
        tableEl.dataset.seatId = seat.id;
        if(seat.rotated) tableEl.classList.add("rotated"); // this is fot the rectangular tables, since they can come in 2 ways

        const [x, y] = seat.position;
        tableEl.style.left = `${x}px`;
        tableEl.style.top = `${y}px`;
        tableEl.textContent = seat.id;
        tableEl.title = `${seat.name} | ${seat.capacity} people | ${seat.status}`;
        tableEl.disabled = !isSelectable(seat);

        tableEl.addEventListener("click", () => {
            toggleSeatSelection(seat.id);
        });

        worldContainer.appendChild(tableEl);
    });
}

document.getElementById("close-modal-btn").addEventListener("click", () => modal.close());

// Close when clicking the backdrop (outside the dialog box)
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
});
