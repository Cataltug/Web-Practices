const wordEl = document.getElementById("word");
const correctLetters = [];
const wrongLetters = [];
const popup = document.getElementById("popup-container");
const messageEl = document.getElementById("success-message");
let selectedWord = getRandomWord();
const wrongLettersEl = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const messagePopEl = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");

function getRandomWord(){
    const words = ["photography", "agenda", "subway",
         "storm", "log", "nun",
        "dare", "castle", "veteran",
         "earwax", "assessment", "hover", "level",
    ]
    return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </div>
            `).join("")}
    `;

    const w = wordEl.innerText.replace(/\n/g, '')
    if(w === selectedWord){
        popup.style.display = "flex";
        messageEl.innerText = "Congrats, You Win!"
    }
}

function updateWrongLetters(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Wrong Numbers</h3>" : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = "flex";
        messageEl.innerText = "You Lose!";
    }
}

function displayMessage(){
    messagePopEl.classList.add("show");

    setTimeout(function(){
        messagePopEl.classList.remove("show");
    }, 2000);
}

playAgainBtn.addEventListener("click", function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
});

window.addEventListener("keydown", function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

displayWord()
