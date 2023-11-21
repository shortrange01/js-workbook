import "./style.css";
import { Work } from "./work";

const work = new Work("work7");

console.log(JSON.stringify(work.encryptQuestions));
console.log(JSON.stringify(work.encryptAnswers));

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>${work.title}</h1>
    <div class="work">${work.description}
        <p>sample: ${JSON.stringify(work.decryptQuestions[0])}</p>
    </div>

    <h2>OUTPUT</h2>
    <div class="result">${work.result}</div>
    <div id="js-comparison"></div>
    <button id="js-toggle-hint-btn">Hint</button>
    <p id="js-hint" class="hint">${JSON.stringify(work.decryptQuestions)}</p>
`;

const comparisonElement: HTMLElement = document.getElementById("js-comparison")!;
const toggleHintBtn: HTMLElement = document.getElementById("js-toggle-hint-btn")!;
const hintElement: HTMLElement = document.getElementById("js-hint")!;

for (let i = 1; i <= work.comparison.length; i++) {
    comparisonElement.innerHTML += `<p>CHECK${i}: ${work.comparison[i - 1] ? "⭕️" : "❌"} </p>`;
}

toggleHintBtn.addEventListener("click", () => hintElement.classList.toggle("show"));
