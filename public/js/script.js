document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for the search input
    document.getElementById("searchSched").addEventListener("keypress", function(event) {
    // Check if Enter key was pressed
    if (event.key === "Enter") {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll("#schedBody tr");

        let showRow = false;

        rows.forEach(row => {
            // Check if the row contains a date
            if (row.classList.contains('date-row')) {
                // Check if the row's date matches the search value
                if (row.textContent.toLowerCase().includes(searchValue)) {
                    showRow = true;
                } else {
                    showRow = false;
                }
            }

            // Show or hide the row based on search result
            row.style.display = showRow ? "" : "none";
        });
    }
    });
});

