let now = new Date();
let year = now.getFullYear();   // 年
let month = now.getMonth() + 1; // 月（0～11なので+1）
const today = year+"/"+month+"/"+now.getDate();
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
        td.id = `${year}/${month-1}/${firstday_1+j}`;
        td.className = `notMonth`;
      }else{
        td.textContent = `${firstday_2+j-firstweek}`;
        td.id = `${year}/${month}/${firstday_2+j-firstweek}`;
      }
      tr.appendChild(td);

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
          td.id = `${year}/${month+1}/${k}`;
          k++;
        }else{
          td.textContent = `${value}`;
          td.id = `${year}/${month}/${value}`;
          value++;
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
      m++;
  }
  document.getElementById("display").appendChild(table);

fetch("json/images.json")
  .then(response => response.json())
  .then(images => {

    // 配列をシャッフル（Fisher-Yates）
    for (let a = images.length - 1; a > 0; a--) {
      const b = Math.floor(Math.random() * (a + 1));
      [images[a], images[b]] = [images[b], images[a]];
    }

const photos = document.querySelectorAll(".notMonth");

photos.forEach((photo, index) => {
  if (index < images.length) {
    photo.style.backgroundImage = `url("${images[index]}")`;
  }
});

  })
  .catch(error => console.error(error));


  loadHoliday(firstweek);
}

function loadHoliday(week) {
  fetch("json/holidays.json")
  .then(response => response.json())
  .then(data => {
      const arrays = [
        [1, 7,  8, 14, 15, 21, 22, 28, 29],
        [6, 7, 13, 14, 20, 21, 27, 28],
        [5, 6, 12, 13, 19, 20, 26, 27],
        [4, 5, 11, 12, 18, 19, 25, 26],
        [3, 4, 10, 11, 17, 18, 24, 25, 31],
        [2, 3,  9, 10, 16, 17, 23, 24, 30, 31],
        [1, 2,  8,  9, 15, 16, 22, 23, 29, 30]
      ];
      let doniti = arrays[week];
    for(i=1;i<32;i++){
      let targetDate = year+"/"+month+"/"+i;
      let isholiday = data.find(item => item.date === targetDate);
      let td = document.getElementById(targetDate);
      let day = td.textContent;
      td.innerHTML = `
        <a href="detail.html?date=${targetDate}" class="cell-link">${i}</a>
      `;

      const memoValue = localStorage.getItem("title"+targetDate);
      
      if (isholiday) {
        if(targetDate == today){
          document.getElementById(targetDate).className = `today`;
        }else{
          document.getElementById(targetDate).className = `holiday`;          
        }
        td.innerHTML = `
        <a href="detail.html?date=${targetDate}" class="cell-link">
          <div id="part1_${i}"></div>
          <div class="holidayName" id="part2_${i}"></div>
          <div id="part3_${i}"></div>
        </a>
        `;
        document.getElementById("part1_"+i).textContent = day;
        document.getElementById("part2_"+i).textContent = isholiday.name;
        document.getElementById("part3_"+i).textContent = memoValue;
      }
      else{
        if(targetDate == today){
          document.getElementById(targetDate).className = `today`;
        }
        else if(doniti.includes(i)){
          document.getElementById(targetDate).className = `holiday`;
        }
      td.innerHTML = `
      <a href="detail.html?date=${targetDate}" class="cell-link">
        <div id="part1_${i}"></div>
        <div id="part3_${i}"></div>
      </a>
      `;
      document.getElementById("part1_"+i).textContent = day;
      document.getElementById("part3_"+i).textContent = memoValue;
      }
    }
  });
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

function now_month() {
   year = now.getFullYear();
   month = now.getMonth() + 1;
  //alert(year+"年"+month+"月");
　document.getElementById("year").textContent = year;
　document.getElementById("month").textContent = month;
  document.getElementById("display").innerHTML = "";
  display();
}

function hozon() {
  const value1 = "title"+year+"/"+month+"/";
  for(i=1;i<32;i++){
    const value2 = value1 + i;
    const memoValue = localStorage.getItem(value2);
  }
}
