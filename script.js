const goalMinutes = 60;
let goalAchieved = false;

function getTodaykey(){
    const today = new Date();
    return today .toISOString().slice(0,10);
}

const todaykey = getTodaykey();

let studyTime = Number(localStorage.getItem(todaykey)) || 0;

let startTime = Number(localStorage.getItem("startTime")) || null;
let isRunning = localStorage.getItem("isRunning") === "true";

let timerId = null;

function updateTime(){

    let totalSeconds = studyTime;

    if (isRunning && startTime){
      const now = Date.now();
      const elapsed = Math.floor((now - startTime)/1000);
      totalSeconds += elapsed;
    }

    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds % 60;
    
    const formatted = 
        minutes + "分" + String(seconds).padStart(2,"0") + "秒";
        document.getElementById("time").textContent = formatted;

        if (minutes >= goalMinutes && !goalAchieved){
            goalAchieved = true;
            alert("🎉 今日の目標達成！");
        }
    updateTodayLog(totalSeconds);
}

function updateTodayLog(totalSeconds){
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const text =
        "📅" + todaykey + ":" + 
        minutes + "分" +
        String(seconds).padStart(2,"0") + "秒";

    document.getElementById("todayLog").textContent = text;
}

document.getElementById("startBtn").addEventListener("click", function () {
  if (isRunning) return;
  
  startTime = Date.now();
  localStorage.setItem("startTime",startTime);
  localStorage.setItem("isRunning","true");

  isRunning = true;
  runTimer();
});

document.getElementById("stopBtn").addEventListener("click", function () {
  if (!isRunning) return;

  const now = Date.now();
  const elapsed = Math.floor((now - startTime)/1000);

  studyTime += elapsed;

  localStorage.setItem(todaykey,studyTime);
  localStorage.setItem("isRunning","false");

  isRunning = false;
  startTime = null;

  clearInterval(timerId);
    timerId = null;
    updateTime();
});

function runTimer(){
  timerId = setInterval(updateTime,1000);
}

window.addEventListener("DOMContentLoaded",function(){
  updateTime();

  if (isRunning && startTime){
    runTimer();
  }
})