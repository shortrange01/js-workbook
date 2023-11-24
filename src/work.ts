import dataList from "./config/data.json";
import { answer } from "./answer";
import crypto from "crypto-js";

interface WorkData {
    id: string;
    title: string;
    description: string;
    data: string[][];
    answer: string[];
}

export class Work {
    private data: WorkData | undefined;

    constructor(id: string) {
        this.data = dataList.find((data) => data.id === id);
    }

    private transformList(list: string[], encrypt: boolean): string[] {
        const key = import.meta.env.VITE_AES_KEY;
        return list.map((item) =>
            encrypt ? crypto.AES.encrypt(item, key).toString() : crypto.AES.decrypt(item, key).toString(crypto.enc.Utf8)
        );
    }

    get title(): string {
        return this.data?.title || "The question does not exist.";
    }

    get description(): string {
        return this.data?.description || "Check the id of the data.";
    }

    get decryptQuestions(): string[][] {
        return this.data?.data.map((questionList) => this.transformList(questionList, false)) || [[""]];
    }

    get encryptQuestions(): string[][] {
        return this.data?.data.map((questionList) => this.transformList(questionList, true)) || [[""]];
    }

    get decryptAnswers(): string[] {
        return this.transformList(this.data?.answer || [""], false);
    }

    get encryptAnswers(): string[] {
        return this.transformList(this.data?.answer || [""], true);
    }

    get result(): string | void {
        return answer(this.decryptQuestions[0]);
    }

    get comparison(): boolean[] {
        return this.decryptQuestions.map((question, index) => answer(question) === this.decryptAnswers[index]);
    }
}
