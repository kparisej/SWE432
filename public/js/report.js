var sched = null;
document.addEventListener("DOMContentLoaded", (event) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("date-report").textContent=today;
  document.forms["reportform"]["date-report"].value=today;
});

async function dater() {
  document.getElementById("selectslot").innerHTML = "";
  let x = document.forms["reportform"]["date-report"].value;
  try{
    sched = await fetch('date?' + new URLSearchParams({
      date: x,
  })).then(response => response.json());
}
catch{
}
if (sched){
  if(sched.date==x){
    timer(sched);}
  else{
    alert("No Schedule Available For This Date")
    document.getElementById("selectslot").innerHTML = "";
  }
}
else{
  alert("No Schedule Available For This Date")
  document.getElementById("selectslot").innerHTML = "";
}

}
function timer(sched){
  var select = document.getElementById("selectslot");
  
  for(var i = 0; i < sched.timeSlots.length; i++) {
      var opt = sched.timeSlots[i].startTime;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = i;
      select.appendChild(el);
  }
}
function buildtable (){
  let slot = document.forms["reportform"]["selectslot"].value;
  let ts = sched.timeSlots[slot];
  if (ts.producerList.length>ts.djList.length){
    leng = ts.producerList.length;
  }
  else{
    leng = ts.djList.length;
  }
  countSame = 0;
  countProd = 0;
  countDJ = 0;
  for(var i=0; i<ts.producerList.length; i++){
    if (ts.djList.findIndex(item => item.songName === ts.producerList[i].songName)>=0){
      countSame++;
    }
    else{
      countProd++;
    }
  }
  for(var i=0; i<ts.djList.length; i++){
    if (ts.producerList.findIndex(item => item.songName === ts.djList[i].songName)<0)
      countDJ++;
  }
  let same = document.getElementById('countSame');
  let diff = document.getElementById('countDif');
  let prod = document.getElementById('countSkip');
  same.textContent = countSame;
  prod.textContent = countProd;
  diff.textContent = countDJ;

}