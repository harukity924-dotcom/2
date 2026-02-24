function getSubject(){
    return JSON.parse(localStorage.getItem("subject")) || [];
}

function saveSubject(subject){
    localStorage.setItem("subject",JSON.stringify(subject));
}

function renderSelect(){
    const select = document.getElementById("subjectselect");
    if(!select) return;

    select.innerHTML = "";

    getSubject().forEach(sub => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        select.appendChild(option);
    });
}

function renderSubject(){
    const list  = document.getElementById("subjectList");

    if (!list) return;

    list.innerHTML = "";

    const subject = getSubject();

    if(subject.length === 0){
        list.innerHTML = "<li>科目がありません</li>";
        return;
    }

    getSubject().forEach(sub => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = sub;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×"
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.onclick = () => deleteSubject(sub);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addSubject(){
    const input = document.getElementById("newSubject");
    const newSub = input.value.trim();

    if(!newSub) return;

    const subject = getSubject();

    if(subject.includes(newSub)){
        alert("すでに登録されています");
        return;
    }

    subject.push(newSub);
    saveSubject(subject);

    renderSubject();
    renderSelect();

    input.value = "";
}

    function deleteSubject(name) {
        if(!confirm(`「${name}」を削除しますか？`)) return;

        const subjects = getSubject().filter(sub => sub !== name);
        saveSubject(subjects);
        renderSubject();
        renderSelect();
    }

window.addEventListener("DOMContentLoaded", () => {
    renderSelect();
    renderSubject();
});
