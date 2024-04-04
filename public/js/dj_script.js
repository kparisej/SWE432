let selectedDate;

function handleButtonClick(day) {
  console.log("Inline event handler clicked for", day);
}

document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.getElementById("datepicker");
  const submitButton = document.getElementById("submitDateButton");

  // Add an event listener to the submit button
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    selectedDate = datePicker.value;
    console.log("Selected date:", selectedDate);
    // Make an HTTP request to the server with the selected date
    fetch(`/api/dates?date=${selectedDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Find the object with the matching date
        const matchingDate = data.find((item) => item.date === selectedDate);
        populateMasonRadioPlaylist(matchingDate);
        // Log the matching date object
        console.log("Data received:", matchingDate);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
  function populateMasonRadioPlaylist(data) {
    const masonPlaylistTableBody = document.querySelector(
      "#masonPlaylistTable tbody"
    );
    // Clear exisitng rows
    masonPlaylistTableBody.innerHTML = "";
    // Iterate over each time slot
    data.timeSlots.forEach((timeSlot) => {
      // Iterate over djList in each time slot
      timeSlot.djList.forEach((song) => {
        const { songName, artist, genre } = song;
        // Create a new row in the table for each song
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${songName}</td>
        <td>${artist}</td>
        <td>${genre}</td>
        <td>${timeSlot.startTime} - ${timeSlot.endTime}
        </td>
      `;
        masonPlaylistTableBody.appendChild(row);
      });
    });
  }

  const dayButtons = document.querySelectorAll(".dayButton"); // Select all day buttons
  const playlistSections = document.querySelectorAll(
    ".flex-section.flex-column[id$='Playlist']"
  );

  dayButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelector(".dayButton.selected")
        ?.classList.remove("selected");

      button.classList.add("selected");

      const day = button.id.replace("Button", ""); // Get day from button id
      console.log("Selected Day:", day); // Log the selected day
      playlistSections.forEach((section) => {
        if (section.id.startsWith(day)) {
          section.style.display = ""; // Show the matching section
        } else {
          section.style.display = "none"; // Hide non-matching sections
        }
      });
    });
  });

  const rows = document.querySelectorAll("#yourPlaylistTable tbody tr"); // Select all rows in the playlist table

  rows.forEach((row) => {
    row.addEventListener("click", function () {
      // Toggle 'selected' class
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
      } else {
        rows.forEach((row) => row.classList.remove("selected"));
        this.classList.add("selected");
      }
    });
  });

  const addSongButton = document.getElementById("addSongButton");
  if (addSongButton) {
    addSongButton.addEventListener("click", addSelectedSongsToMasonPlaylist);
  }

  // Event listener setup for headerIcon
  const headerIcon = document.querySelector(".header-icon");
  if (headerIcon) {
    headerIcon.addEventListener("mouseover", function () {
      console.log("Mouse over the header icon");
    });
  }

  // Function to fetch songs from the server and populate the Your Playlist table
  function populateYourPlaylist() {
    fetch("/api/songs")
      .then((response) => response.json())
      .then((songs) => {
        const yourPlaylistTableBody = document.getElementById(
          "yourPlaylistTableBody"
        );
        // Clear any existing content in the table body
        yourPlaylistTableBody.innerHTML = "";

        // Iterate over each song and create HTML elements for them
        songs.forEach((song) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${song.songName}</td>
            <td>${song.artist}</td>
            <td>${song.genre}</td>
          `;
          // Add click event listener to toggle selected class
          row.addEventListener("click", function () {
            // Toggle 'selected' class
            if (this.classList.contains("selected")) {
              this.classList.remove("selected");
            } else {
              // Remove 'selected' class from other rows
              const allRows = document.querySelectorAll(
                "#yourPlaylistTable tbody tr"
              );
              allRows.forEach((row) => {
                row.classList.remove("selected");
              });
              this.classList.add("selected");
            }
          });
          yourPlaylistTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }

  // Call the function to populate Your Playlist when the DOM content is loaded
  populateYourPlaylist();
});

function addSelectedSongsToMasonPlaylist() {
  // Check if a date is selected
  if (!selectedDate) {
    console.error("Please select a date first.");
    return;
  }
  const selectedTimeSlot = document.getElementById("timeSlot").value;
  if (!selectedTimeSlot) {
    console.error("Please select a time slot first.");
    return;
  }

  // Get Mason playlist
  const masonPlaylistTableBody = document.querySelector(
    "#masonPlaylistTable tbody"
  );

  // Get all selected rows in user's playlist
  const selectedRows = document.querySelectorAll(
    "#yourPlaylistTable tbody tr.selected"
  );

  // Iterate over selected rows
  selectedRows.forEach((selectedRow) => {
    // Get the song title, artist, and genre of the selected row
    const songTitle = selectedRow.cells[0].textContent;
    const artist = selectedRow.cells[1].textContent;
    const genre = selectedRow.cells[2].textContent;

    // Check if the song already exists in the Mason playlist for the selected day
    let exists = false;
    const existingSongs = masonPlaylistTableBody.querySelectorAll("tr");
    existingSongs.forEach((existingSong) => {
      const masonSongTitle = existingSong.cells[0].textContent;
      const masonArtist = existingSong.cells[1].textContent;
      if (masonSongTitle === songTitle && masonArtist === artist) {
        exists = true;
        return;
      }
    });

    // If the song does not already exist, add it to the Mason playlist
    if (!exists) {
      // Create a new row in the Mason playlist table for each selected song
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${songTitle}</td>
        <td>${artist}</td>
        <td>${genre}</td>
        <td>${selectedTimeSlot}</td>
      `;
      masonPlaylistTableBody.appendChild(newRow);
    }
  });
}

function updateUsersPlaylist(song) {
  // Find the table body element
  const tableBody = document.querySelector("#yourPlaylistTable tbody");

  // Check if the song already exists in the playlist
  const existingRow = tableBody.querySelector(
    `tr[data-title="${song.title}"][data-artist="${song.artist}"]`
  );

  if (existingRow) {
    // If the song already exists, update its information
    existingRow.cells[0].textContent = song.title;
    existingRow.cells[1].textContent = song.artist;
    existingRow.cells[2].textContent = song.genre;
  } else {
    // If the song doesn't exist, create a new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td>${song.title}</td>
          <td>${song.artist}</td>
          <td>${song.genre}</td>
      `;
    tableBody.appendChild(newRow);
  }
}

/////////
window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");
});
