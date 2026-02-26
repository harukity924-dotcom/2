const goalMinutes = 60;
let goalAchieved = false;

////今日の日付を取得
function getTodaykey(){
    const today = new Date();
    return today .toISOString().slice(0,10);
}
////今日の日付を取得

let todaykey = getTodaykey();
let startTime = Number(localStorage.getItem("startTime")) || null;
let isRunning = localStorage.getItem("isRunning") === "true";
let timerId = null;
let studyTime = 0;

function getSelectedSubject(){
  return document.getElementById("subjectselect").value;
}

function getTodayData(){
  const data = localStorage.getItem(todaykey);
  return data ? JSON.parse(data) : {};
}
function loadStudyTime(){
  const subject = getSelectedSubject();
  const todayData = getTodayData();
  studyTime = todayData[subject] || 0;
}

function saveStudyTime(seconds){
  const subject = getSelectedSubject();
  const todayData = getTodayData();
  todayData[subject] = seconds;
  localStorage.setItem(todaykey,JSON.stringify(todayData));
}

////日付変更チェック
function checkDateChange(){
  const newKey = getTodaykey();

  if (newKey !== todaykey){
  
    if (isRunning && startTime){
      const now = Date.now();
      const elapsed = Math.floor((now - startTime)/1000);
      studyTime += elapsed;
      saveStudyTime(studyTime);
    }

    todaykey = newKey;
    studyTime = 0;

    if (isRunning){
      startTime = Date.now();
      localStorage.setItem("startTime",startTime);
    }

      goalAchieved = false;
  }
}
////日付変更チェック

function updateTime(){
    checkDateChange();

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
        "📅" + todaykey + "：　" + 
        minutes + "分" +
        String(seconds).padStart(2,"0") + "秒";

    document.getElementById("todayLog").textContent = text;
}

////開始ボタンの設定
document.getElementById("startBtn").addEventListener("click", function () {
  if (isRunning) return;
  
  loadStudyTime();

  startTime = Date.now();
  localStorage.setItem("startTime",startTime);
  localStorage.setItem("isRunning","true");

  isRunning = true;
  runTimer();
});
////開始ボタンの設定

////停止ボタンの設定
document.getElementById("stopBtn").addEventListener("click", function () {
  if (!isRunning) return;

  const now = Date.now();
  const elapsed = Math.floor((now - startTime)/1000);

  studyTime += elapsed;

  saveStudyTime(studyTime);
  localStorage.setItem("isRunning","false");

  isRunning = false;
  startTime = null;

  clearInterval(timerId);
    timerId = null;
    updateTime();
});
////停止ボタンの設定

document.getElementById("resetBtn").addEventListener("click",() => {
  studyTime = 0;
  saveStudyTime(0);
  updateTime();
});

document.getElementById("saveBtn").addEventListener("click", () => {
  saveStudyTime(studyTime);
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

let currentSubject = getSelectedSubject();

document.getElementById("subjectselect").addEventListener("change", () => {
  const newSubject = getSelectedSubject();

  if (isRunning && startTime){
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    studyTime += elapsed;

    const todayData = getTodayData();
    todayData[currentSubject] = studyTime;
    localStorage.setItem(todaykey,JSON.stringify(todayData));
    ///saveStudyTime(studyTime);
  }

  isRunning = false;
  startTime = null;
  clearInterval(timerId);
  timerId = null;
  localStorage.setItem("isRunning","false");
  ///studyTime = 0;
  currentSubject = newSubject;
  loadStudyTime();
  updateTime();
});
