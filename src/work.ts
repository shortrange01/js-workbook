import dataList from "./config/data.json";
import { answer } from "./answer";
import crypto from "crypto-js";

interface workData {
    id: string;
    title: string;
    description: string;
    data: string[][];
    answer: string[];
}

export class Work {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    get workData(): workData | undefined {
        return dataList
            .filter((data) => {
                return data.id === this.id;
            })
            .shift();
    }

    get title(): string {
        if (!this.workData) return "The question does not exist.";
        return this.workData.title;
    }

    get description() {
        if (!this.workData) return "Check the id of the data.";
        return this.workData!.description;
    }

    get decryptQuestions(): string[][] {
        if (!this.workData) return [[""]];
        return this.workData.data.map((questionList: string[]): string[] => {
            return questionList.map((question: string): string => {
                return crypto.AES.decrypt(question, import.meta.env.VITE_AES_KEY).toString(crypto.enc.Utf8);
            });
        });
    }

    get encryptQuestions(): string[][] {
        if (!this.workData) return [[""]];
        return this.workData.data.map((questionList: string[]): string[] => {
            return questionList.map((question: string): string => {
                return crypto.AES.encrypt(question, import.meta.env.VITE_AES_KEY).toString();
            });
        });
    }

    get decryptAnswers(): string[] {
        if (!this.workData) return [""];
        return this.workData.answer.map((answer: string): string => {
            return crypto.AES.decrypt(answer, import.meta.env.VITE_AES_KEY).toString(crypto.enc.Utf8);
        });
    }

    get encryptAnswers(): string[] {
        if (!this.workData) return [""];
        return this.workData.answer.map((answer: string): string => {
            return crypto.AES.encrypt(answer, import.meta.env.VITE_AES_KEY).toString();
        });
    }

    get result(): string | void {
        return answer(this.decryptQuestions[0]);
    }

    get comparison(): boolean[] {
        const comparison = [];
        for (let i = 0; i < this.decryptQuestions.length; i++) {
            comparison.push(answer(this.decryptAnswers[i]) === this.decryptAnswers[i]);
        }
        return comparison;
    }
}
