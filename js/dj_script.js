function handleButtonClick(day) {
  console.log("Inline event handler clicked for", day);
}

document.addEventListener("DOMContentLoaded", function () {
  const dayButtons = document.querySelectorAll(".dayButton"); // Select all day buttons
  const playlistSections = document.querySelectorAll(
    ".flex-section.flex-column[id$='Playlist']"
  );

  // playlistSections.forEach((section) => {
  //   console.log("Day:", section.id.replace("Playlist", ""));
  // });

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

  // Creating Song Objects
  const songs = [];

  rows.forEach((row) => {
    const title = row.cells[0].textContent;
    const artist = row.cells[1].textContent;
    const genre = row.cells[2].textContent;

    const song = {
      title: title,
      artist: artist,
      genre: genre,
    };

    songs.push(song);
  });
  // Accessing Object Properties
  songs.forEach((song) => {
    console.log("Title:", song.title);
    console.log("Artist:", song.artist);
    console.log("Genre:", song.genre);
  });

  // Modifying Object Properties
  songs[0].title = "TV";
  songs[0].artist = "Billie Eilish";
  songs[0].genre = "Pop";
  // Adding New Properties
  songs[0].albumName = "Guitar Songs";
  console.log("Updated Song Object:", songs[0]);
  console.log("Updated List Of Songs:", songs);

  updateUsersPlaylist(songs[0]);
});

function addSelectedSongsToMasonPlaylist() {
  /// Get Mason playlist
  const masonPlaylist = document.querySelector(
    `#${document
      .querySelector(".dayButton.selected")
      .id.replace("Button", "")}Playlist`
  );

  if (!masonPlaylist) {
    console.error("No Mason playlist is currently displayed.");
    return;
  }

  console.log("Selected Mason Playlist:", masonPlaylist);

  // Get all selected rows in user's playlist
  const selectedRows = document.querySelectorAll(
    "#yourPlaylistTable tbody tr.selected"
  );

  console.log("Selected Rows:", selectedRows);

  // Iterate over selected rows
  selectedRows.forEach((row) => {
    // Get the song title, artist, and genre of the selected row
    const songTitle = row.cells[0].textContent;
    const artist = row.cells[1].textContent;
    const genre = row.cells[2].textContent;

    console.log("Adding Song:", songTitle, "-", artist, "-", genre);

    // Check if the song already exists in the Mason playlist for the selected day
    let exists = false;
    const rows = masonPlaylist.querySelectorAll("tbody tr");
    rows.forEach((masonRow) => {
      const masonSongTitle = masonRow.cells[0].textContent;
      if (masonSongTitle === songTitle) {
        exists = true;
        return;
      }
    });

    // If the song does not already exist, add it to the Mason playlist
    if (!exists) {
      // Clone the selected row
      const newRow = row.cloneNode(true);
      // Append the cloned row to the Mason playlist
      masonPlaylist.querySelector("tbody").appendChild(newRow);
      newRow.classList.remove("selected");
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
window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");
});
