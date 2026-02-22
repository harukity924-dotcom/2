function getSubject(){
    return JSON.parse(localStorage.getItem("subject")) || [];
}

function saveSubject(subject){
    localStorage.setItem("subject",JSON.stringify(subject));
}
function renderSubject(){
    const select = document.getElementById("subjectselect");
    select.innerHTML = "";

    getSubject().foreach(sub => {
        const option = document.createElement("option");
        option.value = sub;
        select.appendChild(option);
    });
}

function addSubject(){
    const input = document.getElementById("newSubject");
    const newSub = input.value.trim();

    if(subject.includes(newSub)){
        alert("すでに登録されています");
        return;
    }

    subject.push(newSub);
    saveSubject(subject);
    renderSubject();

    input.value = "";
}

window.addEventListener("DOMContentLoaded",() => {
    renderSubject();
});
