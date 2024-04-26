document.getElementById("doneButton").addEventListener("click", function() {
    window.location.href = "/"; // Redirect to the main page
});

document.getElementById("searchInput1").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#songBody1 tr");

    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const artist = row.cells[1].textContent.toLowerCase();
        const genre = row.cells[2].textContent.toLowerCase();
        const duration = row.cells[3].textContent.toLowerCase();

        if (title.includes(searchValue) || artist.includes(searchValue) || genre.includes(searchValue) || duration.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

document.getElementById("searchInput2").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#songBody2 tr");

    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const artist = row.cells[1].textContent.toLowerCase();
        const genre = row.cells[2].textContent.toLowerCase();
        const duration = row.cells[3].textContent.toLowerCase();

        if (title.includes(searchValue) || artist.includes(searchValue) || genre.includes(searchValue) || duration.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

function addSong(producerIndex, dateId, slotIndex) {
    fetch(`/add-song/${dateId}/${slotIndex}/${producerIndex}`, { method: 'POST' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add song');
      }
      // Optionally, you can handle success response here
      console.log("Song added successfully");
      window.location.reload();
    })
    .catch(error => {
      console.error('Error adding song:', error);
      // Optionally, you can handle error here (e.g., display an error message)
    });
}

function removeSong(songId, dateId, slotIndex) {
    console.log("remove song spot");
    fetch(`/remove-song/${dateId}/${slotIndex}/${songId}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add song');
      }
      // Optionally, you can handle success response here
      console.log('Song removed successfully');
      window.location.reload();
    })
    .catch(error => {
        console.error('Error adding song:', error);
        // Optionally, you can handle error here (e.g., display an error message)
    });
    
}