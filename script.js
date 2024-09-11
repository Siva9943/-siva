function fetchAvailableSlots() {
    const bookingDate = document.getElementById('bookingDate').value;

    // Fetch available slots from the server
    fetch(`get_slots.php?date=${bookingDate}`)
        .then(response => response.json())
        .then(slots => {
            const slotsContainer = document.getElementById('slotsContainer');
            slotsContainer.innerHTML = '';

            if (slots.length === 0) {
                slotsContainer.innerHTML = '<p>No slots available for this date.</p>';
                return;
            }

            slots.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.className = 'slot';
                slotDiv.innerHTML = `
                    <span>${slot.start_time} - ${slot.end_time}</span>
                    <button onclick="bookSlot(${slot.slot_id})">Book Now</button>
                `;
                slotsContainer.appendChild(slotDiv);
            });
        })
        .catch(error => console.error('Error fetching slots:', error));
}

function bookSlot(slotId) {
    // Post request to book the slot
    fetch('book_slot.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot_id: slotId }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Slot booked successfully!');
                fetchAvailableSlots();  // Refresh the slot list
            } else {
                alert('Failed to book the slot.');
            }
        })
        .catch(error => console.error('Error booking slot:', error));
}
