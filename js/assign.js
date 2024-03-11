document.addEventListener("DOMContentLoaded", (event) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;

  document.getElementById("date title").textContent=today;
  document.forms["assign form"]["date"].value=today;
  const el = document.getElementById("start");

  el.addEventListener("change", function handleChange(event) {
    validatedate();
  });
});



function validateform() {
  let slot = document.forms["assign form"]["date"].value;
  let x = document.forms["assign form"]["slot"].value;
  let y = document.forms["assign form"]["dj"].value;
  console.log(slot, x);
  console.log(y);
  let test = 0;
  if (x == "") {
    test = 1
  }
  if (y == "") {
    test = test + 2
  }
  console.log(test)
  switch (test){
    case 0:
    today[x]=y;
    console.log(today);
    return true;
	  case 1:
		alert("Time Slot must be filled out");
		return false;
	  case 2:
		alert("DJ must be filled out");
		return false;
	  case 3:
	  alert("Time Slot and DJ must be filled out");
		return false;
	  default:
		break;
  }
}

function validatedate() {
  let slot = document.forms["assign form"]["date"].value;
  console.log(slot);
  document.getElementById("date title").textContent=slot;
}

let today = {
  1: "James masons long name",
  2: "P2",
  3: "P3",
  4: "David"
}
