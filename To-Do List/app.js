const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const activeDayElement = document.getElementById("active-day");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
let activeDay = "Monday";

inputBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function switchDay(day){
    activeDay = day;
    activeDayElement.innerText = day;
    listContainer.innerHTML = localStorage.getItem(day) || "";
    showTask();
    updateProgress();
};


function addTask(){
    if(inputBox.value === ""){
        alert("You must enter something!")
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        

        let starButton = document.createElement("button");
        starButton.innerHTML = "🧷";
        starButton.classList.add("star-btn");
        li.appendChild(starButton);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);

        listContainer.appendChild(li);

        starButton.addEventListener("click", function(){
            li.classList.toggle("important");
            if(li.classList.contains("important")){
                listContainer.prepend(li);
            }else{
                listContainer.appendChild(li);
            }
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgress();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgress();
    }

}, false)

function saveData(){
    localStorage.setItem(activeDay, listContainer.innerHTML);
}

function showTask(){

    document.querySelectorAll("#list-container li").forEach(li => {
        let starButton = li.querySelector(".star-btn");

        if(starButton){
            starButton.addEventListener("click", function(){
                li.classList.toggle("important");
                if(li.classList.contains("important")){
                    listContainer.prepend(li);
                }else{
                    listContainer.appendChild(li);
                }
                saveData();
            });

            if(li.classList.contains("important")){
                listContainer.prepend(li);
            }
        }
    });
}

function updateProgress(){
    const tasks = document.querySelectorAll("#list-container li");
    const completedTasks = document.querySelectorAll("#list-container li.checked");

    const progress = tasks.length === 0 ? 0 : (completedTasks.length / tasks.length) * 100;

    progressBar.value = progress;
    progressText.textContent = `${Math.round(progress)}%`;
}

switchDay(activeDay);