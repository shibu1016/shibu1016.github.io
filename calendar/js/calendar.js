let now = new Date();
let year = now.getFullYear();   // 年
let month = now.getMonth() + 1; // 月（0～11なので+1）

let weekname = ["日","月","火","水","木","金","土"];


// ページ読み込み完了後に実行
document.addEventListener("DOMContentLoaded", () => {
    console.log("ページが読み込まれました");
　  document.getElementById("year").textContent = year;
　  document.getElementById("month").textContent = month;
    display();
});


function display() {
  let table = document.createElement("table");
  table.className = `display`;
  for (let i = 0; i < 7; i++) {
    let th = document.createElement("th");
    th.textContent = `${weekname[i]}`;
    table.appendChild(th);
  }
  let date = new Date(year, month-1, 1);
  let date_end = new Date(year, month, 0);
  let firstweek = date.getDay();
  let firstdate = new Date(year, month-1, 1-firstweek);
  let tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let td = document.createElement("td");
      let firstday_1 = firstdate.getDate();
      let firstday_2 = date.getDate();
      if(j<firstweek){
        td.textContent = `${firstday_1+j}`;
        td.className = `notMonth`;
      }else{
        td.textContent = `${firstday_2+j-firstweek}`;
      }
      tr.appendChild(td);
      td.id = `day1_${j}`;
    }
    table.appendChild(tr);
  let value = 8 - firstweek;
  let k = 1;
  let m = 2;
  while (value < date_end.getDate()) {
      let tr = document.createElement("tr");
      for (let l = 0; l < 7; l++) {
        let td = document.createElement("td");
        if(value > date_end.getDate()){
          td.textContent = `${k}`;
          td.className = `notMonth`;
          k++;
        }else{
          td.textContent = `${value}`;
          value++;
        }
        tr.appendChild(td);
        td.id = `day${m}_${l}`;
      }
      table.appendChild(tr);
      m++;
  }
  document.getElementById("display").appendChild(table);
}

function previous() {
  if(month==1){
   year = year-1;
   month = 12;
  }else{
   month = month - 1;
  }
  //alert(year+"年"+month+"月");
　document.getElementById("year").textContent = year;
　document.getElementById("month").textContent = month;
  document.getElementById("display").innerHTML = "";
  display();
}

function next() {
  if(month==12){
   year = year+1;
   month = 1;
  }else{
   month = month + 1;
  }
  //alert(year+"年"+month+"月");
　document.getElementById("year").textContent = year;
　document.getElementById("month").textContent = month;
  document.getElementById("display").innerHTML = "";
  display();
}

function hozon() {
  alert("保存しました");
}