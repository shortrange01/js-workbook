import "./style.css";
import crypto from "crypto-js";
import dataList from "./config/data.json";
import { answer } from "./answer";

const data = dataList
    .filter((data) => {
        return data.id === "work6";
    })
    .shift();

data!.data = data!.data.map((val) => {
    return val.map((v) => {
        return crypto.AES.decrypt(v, import.meta.env.VITE_AES_KEY).toString(crypto.enc.Utf8);
        // return crypto.AES.encrypt(v, import.meta.env.VITE_AES_KEY).toString();
    });
});

data!.answer = data!.answer.map((val) => {
    return crypto.AES.decrypt(val, import.meta.env.VITE_AES_KEY).toString(crypto.enc.Utf8);
    // return crypto.AES.encrypt(val, import.meta.env.VITE_AES_KEY).toString();
});

// console.log(JSON.stringify(data));

const result: string = answer(data!.data[0]);

const comparison: boolean[] = [];

for (let i = 0; i < data!.data.length; i++) {
    comparison.push(answer(data!.data[i]) === data!.answer[i]);
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>${data!.title}</h1>
    <div class="work">${data!.description}
        <p>sample: ${JSON.stringify(data!.data[0])}</p>
    </div>

    <h2>OUTPUT</h2>
    <div class="result">${result}</div>
    <div id="js-comparison"></div>
    <button id="js-toggle-hint-btn">Hint</button>
    <p id="js-hint" class="hint">${JSON.stringify(data!.data)}</p>
`;

const comparisonElement: HTMLElement = document.getElementById("js-comparison")!;
const toggleHintBtn: HTMLElement = document.getElementById("js-toggle-hint-btn")!;
const hintElement: HTMLElement = document.getElementById("js-hint")!;

for (let i = 1; i <= comparison.length; i++) {
    comparisonElement.innerHTML += `<p>CHECK${i}: ${comparison[i - 1] ? "⭕️" : "❌"} </p>`;
}

toggleHintBtn.addEventListener("click", () => hintElement.classList.toggle("show"));
