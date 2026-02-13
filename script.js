const goalMinutes = 60;
let goalAchieved = false;

function getTodaykey(){
    const today = new Date();
    return today .toISOString().slice(0,10);
}

const todaykey = getTodaykey();

let studyTime = Number(localStorage.getItem(todaykey)) || 0;
let timerId = null;

function updateTime(){
    const minutes = Math.floor(studyTime/60);
    const seconds = studyTime % 60;

    const formatted = 
        minutes + "分" + String(seconds).padStart(2,"0") + "秒";
        document.getElementById("time").textContent = formatted;

        if (minutes >= goalMinutes && !goalAchieved){
            goalAchieved = true;
            alert("🎉 今日の目標達成！");
        }
    updateTodayLog();
}

function updateTodayLog(){
    const minutes = Math.floor(studyTime / 60);
    const seconds = studyTime % 60;
    const text =
        "📅" + todaykey + ":" + 
        minutes + "分" +
        String(seconds).padStart(2,"0") + "秒";

    document.getElementById("todayLog").textContent = text;
}

document.getElementById("startBtn").addEventListener("click", function () {
  if (timerId !== null) return;
  

  timerId = setInterval(function () {
    studyTime++;
    localStorage.setItem(todaykey,studyTime);
    updateTime();
  }, 1000);
});

document.getElementById("stopBtn").addEventListener("click", function () {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
});