let schedules = [];

const params = new URLSearchParams(location.search);
const date = params.get("date");
const titles = "title" + date;
const savedValue = localStorage.getItem(titles);

document.addEventListener("DOMContentLoaded", () => {
    if (savedValue !== null) {
        document.getElementById("title").value = savedValue;
    }
    const Value2 = localStorage.getItem("memo");
    document.getElementById("memo").value = Value2;
    document.getElementById("date").textContent=date;
});

function addSchedule(){
    let data = {
    start:
    document.getElementById("start").value,
    end:
    document.getElementById("end").value,
    category:
    document.getElementById("category").value,
    title:
    document.getElementById("title").value,
    memo:
    document.getElementById("memo").value
    };
    schedules.push(data);
    display2();
}

function display2(){
    let html="";
    schedules.forEach(x=>{
    html += `
    <tr>
    <td>
    ${x.start}
    ～
    ${x.end}
    </td>
    <td>
    ${x.title}
    </td>
    </tr>
    `;
    });
    document.getElementById("list").innerHTML=html;
}

function downloadCSV(){
    let csv =
    "開始,終了,分類,内容,備考\n";
    schedules.forEach(x=>{
    csv +=
    `${x.start},${x.end},${x.category},${x.title},${x.memo}\n`;
    });
    let blob =
    new Blob(
    [csv],
    {type:"text/csv"}
    );
    let link =
    document.createElement("a");
    link.href =
    URL.createObjectURL(blob);
    link.download =
    "Schedule.csv";
    link.click();
}

function saveData() {
    const value = document.getElementById("title").value;
    localStorage.setItem(titles, value);
    const value2 = document.getElementById("memo").value;
    localStorage.setItem("memo", value2);
    alert("保存しました");

}

function backpage() {
    location.href = "index.html";
}
