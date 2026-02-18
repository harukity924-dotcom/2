function resetAllRecords(){
    if (!confirm("すべての学習記録を削除します。よろしいですか？")) return;

    Object.keys(localStorage).forEach(key => {
        if(/^\d{4}-\d{2}-\d{2}$/.test(key)) {
            localStorage.removeItem(key);
        }
    });

    alert("すべての記録を削除しました");
    location.reload();
}

window.addEventListener("DOMContentLoaded",function(){
    const loglist = document.getElementById("logList");
    const totalTimeEl = document.getElementById("totaltime");

    if (!loglist || !totalTimeEl){
        console.error("IDが見つかりません： LogList または totaltime");
        return;
    }
    
    function getTodaykey(){
        const today = new Date;
        return today.toISOString().slice(0,10);
    }

    const todaykey = getTodaykey();
    const dateKeys = [];
    
    let totalSecondsAll = 0;

    for (let i = 0; i<localStorage.length; i++){
        const key = localStorage.key(i);

            if (key.match(/^\d{4}-\d{2}-\d{2}$/)){
                dateKeys.push(key);
            }
    }
        dateKeys.sort((a,b) => b.localeCompare(a));

        dateKeys.forEach(key => {
            const value = localStorage.getItem(key);
            
            let seconds = 0;

            try {
                const parsed = JSON.parse(value);

                if (typeof parsed ==="object"){
                    seconds = Object.values(parsed)
                    .map(v => Number(v) || 0)
                    .reduce((sum,v) => sum + v,0);
                } else {
                    seconds = Number(parsed) || 0;
                }
            } catch {
                seconds = Number(value) || 0;
            }

            totalSecondsAll += seconds;

            const minutes = Math.floor(seconds/60);
            const remainSeconds = seconds % 60;

            const li = document.createElement("li");
            li.textContent = key + ": " + minutes + "分" + 
            String(remainSeconds).padStart(2,"0") + "秒";

            if (key === todaykey){
                li.style.fontWeight = "bold";
                li.style.color = "red"
            }
            loglist.appendChild(li);

        });

        const hours = Math.floor(totalSecondsAll / 3600);
        const minutes = Math.floor((totalSecondsAll % 3600) / 60);
        const seconds = totalSecondsAll % 60;

        totalTimeEl.textContent = 
        "合計：" + hours + "時間" + minutes + "分" +
        String(seconds).padStart(2,"0") + "秒"; 

});