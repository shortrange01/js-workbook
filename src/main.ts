import "./style.css";
import { Work } from "./work";
import { Countdown } from "./countdown";
const work = new Work("work1");

console.log(JSON.stringify(work.encryptQuestions));
console.log(JSON.stringify(work.encryptAnswers));

const appElement = document.querySelector<HTMLDivElement>("#app")!;
appElement.innerHTML = `
    <h1>${work.title}</h1>
    <div id="js-countdown" class="countdown"></div>
    <div class="countdown-btns">
        <button id="js-set-2min-btn">2:00</button>
        <button id="js-set-3min-btn">3:00</button>
        <button id="js-start-btn">START</button>
        <button id="js-stop-btn">STOP</button>
        <button id="js-clear-btn">CLEAR</button>
    </div>
    <div class="work">${work.description}
        <p>sample: ${JSON.stringify(work.decryptQuestions[0])}</p>
    </div>

    <h2>OUTPUT</h2>
    <div class="result">${work.result}</div>
    <div id="js-comparison"></div>
    <button id="js-toggle-hint-btn">Hint</button>
    <p id="js-hint" class="hint">${JSON.stringify(work.decryptQuestions)}</p>
`;

const countdownElement: HTMLElement = document.getElementById("js-countdown")!;
const comparisonElement: HTMLElement = document.getElementById("js-comparison")!;
const toggleHintBtn: HTMLElement = document.getElementById("js-toggle-hint-btn")!;
const set2minBtn: HTMLElement = document.getElementById("js-set-2min-btn")!;
const set3minBtn: HTMLElement = document.getElementById("js-set-3min-btn")!;
const startBtn: HTMLElement = document.getElementById("js-start-btn")!;
const stopBtn: HTMLElement = document.getElementById("js-stop-btn")!;
const clearBtn: HTMLElement = document.getElementById("js-clear-btn")!;
const hintElement: HTMLElement = document.getElementById("js-hint")!;

for (let i = 1; i <= work.comparison.length; i++) {
    comparisonElement.innerHTML += `<p>CHECK${i}: ${work.comparison[i - 1] ? "⭕️" : "❌"} </p>`;
}

const countdown = new Countdown(countdownElement);
countdown.start();

toggleHintBtn.addEventListener("click", () => hintElement.classList.toggle("show"));
set2minBtn.addEventListener("click", () => countdown.setTimer(120));
set3minBtn.addEventListener("click", () => countdown.setTimer(180));
startBtn.addEventListener("click", () => countdown.start());
stopBtn.addEventListener("click", () => countdown.stop());
clearBtn.addEventListener("click", () => countdown.delete());
