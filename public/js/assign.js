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


  let table = document.getElementById("time table");
  time = 0;
  for (let i = 0; i < 4; i++) {
    let tr = document.createElement('tr');
    

    let td = document.createElement('td');
    td.textContent = time + ":00-"+(time+6)+":00";
    time = time+6;
    tr.appendChild(td);
    let td2 = document.createElement('td');
    td2.textContent = todays[i+1];
    tr.appendChild(td2);

    
    table.appendChild(tr);
  }
});



function validateform() {
  let slot = document.forms["assign form"]["date"].value;
  let x = document.forms["assign form"]["slot"].value;
  let y = document.forms["assign form"]["dj"].value;
  let test = 0;
  if (x == "") {
    test = 1
  }
  if (y == "") {
    test = test + 2
  }
  switch (test){
    case 0:
    todays[x]=y;
    console.log(todays);
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
class schedule{
  constructor(slot1, slot2, slot3, slot4){
    this[1] = slot1;
    this[2] = slot2;
    this[3] = slot3;
    this[4] = slot4;
  }
}

let todays = new schedule( 
  "James masons long name",
  "P2",
  "P3",
  "David"
)
