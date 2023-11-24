export class Countdown {
    private intervalId: number = 0;
    private localStorageKey = "js-work-count";
    private element: HTMLElement;
    private count = 0;
    private startCount = 120;

    constructor(element: HTMLElement) {
        this.element = element;
        if (window.localStorage.getItem(this.localStorageKey)) {
            this.count = Number(window.localStorage.getItem(this.localStorageKey));
        } else {
            window.localStorage.setItem(this.localStorageKey, "0");
        }
        this.setDisplay();
    }

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            window.localStorage.setItem(this.localStorageKey, String(this.count));
            if (this.count > 0) {
                this.count--;
                this.setDisplay();
            } else {
                this.showChangeView();
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
    }

    delete() {
        this.stop();
        window.localStorage.removeItem(this.localStorageKey);
        this.count = this.startCount;
        this.setDisplay();
    }

    setTimer(time: number) {
        if (this.intervalId) return;
        this.startCount = time;
        this.count = time;
        window.localStorage.setItem(this.localStorageKey, String(this.count));
        this.setDisplay();
    }

    private showChangeView() {
        this.element.innerHTML = '<div id="js-change" class="change"></div>';
        setTimeout(() => {
            this.setDisplay();
        }, 5000);
    }

    private setDisplay() {
        this.element.innerHTML = this.timer;
    }

    private get timer() {
        return Math.floor(this.count / 60) + ":" + (this.count % 60).toString().padStart(2, "0");
    }
}
