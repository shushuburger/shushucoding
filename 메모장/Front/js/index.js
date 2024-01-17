function getData() {
    const saveData = JSON.parse(localStorage.getItem("memo"));
    const memoWrapper = document.querySelector(".memo-container");

    while(memoWrapper.firstChild) {
        memoWrapper.removeChild(memoWrapper.firstChild);
    }

    for(let i = 0; i<saveData.length; i++){
        const data = saveData[i];
        const list = drawMemo(data);
        memoWrapper.appendChild(list);
    }
}

function drawMemo(memo) {
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.className = "list-header";

    const a = document.createElement("a");
    a.href = "./view/content.html?id=" + memo.id;

    const h1 = document.createElement("h1");
    h1.className = "title";
    h1.textContent = memo.title;

    const buttons = document.createElement("div");

    const modifyBtn = document.createElement("span");
    modifyBtn.textContent = "수정";
    modifyBtn.className = "modify-btn";

    modifyBtn.addEventListener("click", function (event) {
        window.location.href = "./view/note.html?mode=modify&id="+memo.id;
    })

    const deletBtn = document.createElement("span");
    deletBtn.textContent = "삭제";
    deletBtn.className = "delete-btn";

    deletBtn.addEventListener("click", function(event) {
        const saveData = JSON.parse(localStorage.getItem("memo"));

        for(let i = 0; i<saveData.length; i++){
            if(saveData[i].id === Number(memo.id)) {
                saveData.splice(i, 1);
                localStorage.setItem("memo", JSON.stringify(saveData));
            }
        }

        getData();
    })

    buttons.appendChild(modifyBtn);
    buttons.appendChild(deletBtn);
    
    header.appendChild(a);
    a.appendChild(h1);

    header.appendChild(buttons);

    const h2 = document.createElement("h2");
    h2.className = "description";
    h2.textContent = memo.description;

    const div = document.createElement("div");
    div.className = "createdAt";

    const span = document.createElement("span");
    span.textContent = memo.createdAt;

    div.appendChild(span);

    li.appendChild(header);
    li.appendChild(h2);
    li.appendChild(div);

    return li;
}

getData();