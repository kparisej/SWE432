document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#run").addEventListener("click", function() {
      validateform()
    }
  );
});

function validateform() {
  let x = document.forms["reportform"]["producer"].value;
  let y = document.forms["reportform"]["dj"].value;
  let test = 0;
  if (x != "") {
    test = 0
  }
  else{
    test = 1;
  }
  if (y == "") {
    test = test + 2
  }
  switch (test){
	  case 1:
		alert("Producer must be filled out");
		return false;
	  case 2:
		alert("DJ must be filled out");
		return false;
	  case 3:
	  alert("Producer and DJ must be filled out");
		return false;
	  default:
		break;
  }
}
