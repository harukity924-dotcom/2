window.addEventListener("DOMContentLoaded",function(){
    const loglist = document.getElementById("logList");

    for (let i = 0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        const seconds = Number(value);
        const minutes = Math.floor(seconds/60);

        const li = document.createElement("li");
        li.textContent = Key + ": " + minutes + "分";

        loglist.appendChild(li);
    }
})