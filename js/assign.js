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

const classes = [
  {class: "Web App Developement", number: "SWE 432"},
  {class: "Intro to AI", number: "CS 480"},
]

function list2(){
  let list = document.getElementById("classes3");
  let li = document.createElement('li');
  li.innerHTML = "<b>Here we add through for (let p of Class list):</b>";
  list.appendChild(li);
  for (let p of classes) {
    let li = document.createElement('li');
		li.innerText = p.class + " " + p.number;
		list.appendChild(li);
   }
}
function list3(){
  let list = document.getElementById("classes3");
  let li = document.createElement('li');
  li.innerHTML = "<b>Here we add through classes.forEach(function (p) {}</b>";
  list.appendChild(li);
  classes.forEach(function (p) {
    let li = document.createElement('li');
    li.innerText =p.class + ' number is ' + p.number;
    list.appendChild(li);
   });
}

function Card(name, pic, link) {
  this.name = name,
  this.pic = pic,
  this.link = link
}

Card.prototype.makeMarkup = function() {
  return
  `<div class="card">
  <img src="${this.pic}" alt="${this.name}" >
  <div>
  <h4>${this.name}</h4>
  <p>${this.content}</p>
  </div>
  </div>`
 };

Card.prototype.makeElement = function() {
  let cardDiv = document.createElement('div');
  let img = document.createElement('img');
  img.src = this.pic;
  img.style.width="250px"
  let div = document.createElement('div');
  let h4 = document.createElement('h4');
  h4.innerHTML = this.name;
  var a = document.createElement('a');
  div.appendChild(a);
  a.appendChild(h4);
  a.title = this.name;
  a.href = this.link;
  cardDiv.append(img);
  cardDiv.appendChild(div);
  return cardDiv;
 };

 function ClassCard(number, name) {
  this.name = name,
  this.number = number
}

ClassCard.prototype.makeElement = function() {
  let ClassDiv = document.createElement('span');
  let hclass = document.createElement('h4');
  let hnumber = document.createElement('h4');
  hclass.innerHTML = this.name;
  hnumber.innerHTML = this.number;
  ClassDiv.append(hnumber);
  ClassDiv.append(hclass);
  return ClassDiv;
 };