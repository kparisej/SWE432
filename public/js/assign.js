var sched2;
document.addEventListener("DOMContentLoaded", (event) => {
  validatedate();
  const el = document.getElementById("start");
  el.addEventListener("change", function handleChange(event) {
    validatedate();
  });
  const e2 = document.getElementById("slot");
/*
  e2.addEventListener("change", function handleChange(event) {
    loadsongs();
  });*/
});
function loadsongs(){
  //document.getElementById("djList").innerHTML = "";
  let x = document.forms["assign form"]["slot"].value;
  if (sched2 == null){}
  else if (sched2.timeSlots[x]!=null){
  var select = document.getElementById("djList")
  if(sched2.timeSlots[x].producerList!=undefined){
  for(var i = 0; i < sched2.timeSlots[x].producerList.length; i++) {
      var opt = sched2.timeSlots[x].producerList[i].songName;
      var e3 = document.createElement("option");
      e3.textContent = opt;
      e3.value = i;
      select.appendChild(e3);
  }
}
}
}
function schedulebuilder(sched){
  let table = document.getElementById("time table");
  time = 0;
  let trow = document.createElement('tr');
  let tr = document.createElement('th');
  let td = document.createElement('th');
  tr.textContent = "Time Slot";
  td.textContent = "DJ";
  trow.appendChild(tr);
  trow.appendChild(td);
  table.appendChild(trow);

  for (let i = 0; i < 4; i++) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = time + ":00-"+(time+6)+":00";
    time = time+6;
    tr.appendChild(td);
    let td2 = document.createElement('td');
    if (sched==undefined){
      td2.textContent = ""
    }
    else if (sched.timeSlots==undefined){
      td2.textContent = ""
    }
    else{
    td2.textContent = sched.timeSlots[i].djName;
    }
    tr.appendChild(td2);
    table.appendChild(tr);
  }
}


function validateadd() {
  var day = document.forms["assign form"]["date"].value;;
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
function validateremove() {
  let slot = document.forms["assign form"]["date"].value;
  let x = document.forms["assign form"]["slot"].value;
  let test = 0;
  if (x == "") {
    test = 1
  }
  switch (test){
    case 0:
    return true;
	  case 1:
		alert("Time Slot must be filled out");
		return false;
	  default:
		break;
  }
}



async function validatedate() {
  let slot = document.forms["assign form"]["date"].value;
  //document.getElementById("djList").innerHTML = "";
  document.getElementById("date title").textContent=slot;
  try{
     sched2 = await fetch('date?' + new URLSearchParams({
      date: slot,
  })).then(response => response.json());
  }
  catch{
    sched2 = null;
  }
  if (sched2 != null){
    document.getElementById("time table").innerHTML="";
    schedulebuilder(sched2);
  }
  else{
    //document.getElementById("djList").innerHTML = "";
    document.getElementById("time table").innerHTML="";
    let table = document.getElementById("time table");
    let trow = document.createElement('tr');
    let tr = document.createElement('th');
    let td = document.createElement('th');
    tr.textContent = "Time Slot";
    td.textContent = "DJ";
    trow.appendChild(tr);
    trow.appendChild(td);
    table.appendChild(trow);
  }
}
