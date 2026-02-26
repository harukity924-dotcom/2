function getSubjectFromURL(){
    const params = new URLSearchParams(location.search);
    return params.get("name");
}

function getTotalTime(subjectName){
    let total = 0;

    for (let i = 0; i < localStorage.length; i ++){
        const key = localStorage.key(i);

        if (key.match(/^\d{4}-\d{2}-\d{2}$/)){
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data[subjectName]){
                total += data[subjectName];
            }
        }
    }
    return total;
}

const subjectName = getSubjectFromURL();
document.getElementById("subjectName").textContent = subjectName;

const totalSeconds = getTotalTime(subjectName);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;

document.getElementById("totalTime").textContent = 
    minutes + "分" + String(seconds).padStart(2,"0") + "秒";

function getTodaykey(){
    return new Date().toISOString().slice(0,10);
}

function getTodayTime(subjectName){
    const todaykey = getTodaykey();
    const data = JSON.parse(localStorage.getItem(todaykey)) || {};
    return data[subjectName] || 0;
}

const todayseconds = getTodayTime(subjectName);
const todayMin = Math.floor(todayseconds / 60);
const todaySec = todayseconds % 60;

document.getElementById("todayTime").textContent = 
    todayMin + "分" + String(todaySec).padStart(2,"0") + "秒";