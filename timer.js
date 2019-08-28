class Timer {
    constructor() {
        this.countDown = false;
        this.countUp = false;
        this.shortBreak = false;
        this.longBreak = false;
        this.working = false;
        this.pause = true;
        this.timerBody = document.querySelector("#timer");
        this.formValues = document.querySelector("#work-params");
        this.mainButton = document.querySelector("#main-button");
        this.secondButton = document.querySelector("#second-button");
        this.workField = document.querySelector("#work");
        this.shortBreakField = document.querySelector("#sbreak")
    }

    get workTime() {
        return this.workField.value;
    }

    get shortBreakTime() {
        return this.shortBreakField.value;
    }

    get secondsRemaining() {
        return this.timerBody
    }

    get onBreak() {
        return (this.shortBreak || this.longBreak);
    }

    set timerText(seconds) {
        if (seconds >= 0) {
            this.countDown = true;
            this.countUp = false;
            this.timerBody.innerHTML = this.convertToTime(seconds);
        } else {
            this.countUp = true;
            this.countDown = false;
            this.timerBody.innerHTML = "+" + this.convertToTime(seconds*-1);
        }
    }

    set mainButtonText(text) {
        this.mainButton.textContent = text;
    }

    set secondButtonText(text) {
        this.secondButton.textContent = text;
    }

    convertToTime(timeInSeconds) {
        function pad(number) {
            if (number < 10) {
                return "0" + number;
            } else {
                return number;
            }
        }

        const h = Math.floor(timeInSeconds / 3600);
        const mm = pad(Math.floor(timeInSeconds / 60) - (60*h));
        const ss = pad(timeInSeconds % 60);

        return (h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`);
    }

    startTimer() {
        let secondsLapsed = 0;
        return setInterval(() => {
            if (!this.pause && (this.working || this.onBreak)) {
                secondsLapsed += 10;
                timer.timerText = (timer.workTime*60) - secondsLapsed;
            } else if (this.pause) {
                //clearInterval();
                secondsLapsed += 0;
            }
        }, 1000)
    }

    mainButtonPress(buttonEvent) {
        const command = buttonEvent.target.textContent.toLowerCase();
        if (command === "start") {
            this.timerText = this.workTime * 60;
            this.working = true;
            this.pause = false;
            this.countDown = true;
            this.mainButtonText = "Stop";
            this.secondButtonText = "Pause";
            this.runningTimer = this.startTimer();
        } else if (command === "stop") {
            this.working = false;
            this.pause = false;
            this.countDown = false;
            this.mainButtonText = "Start";
            this.secondButtonText = "Reset";
            this.shortBreak = false;
            this.longBreak = false;
            this.timerText = this.workTime*60;
            clearInterval(this.runningTimer);
        }
    }

    secondButtonPress(buttonEvent) {
        const command = buttonEvent.target.textContent.toLowerCase();
        if (command === "reset") {
            this.countDown = false;
            this.countUp = false;
            this.shortBreak = false;
            this.longBreak = false;
            this.working = false;
            this.pause = true;
            this.workField.value = 10;
            this.shortBreakField.value = 3;
            this.timerText = 10*60;
            this.mainButtonText = "Start";
            this.secondButtonText = "Reset";
        } else if (command === "pause") {
            this.pause = true;
            this.secondButtonText = "Unpause";
        } else if (command === "unpause") {
            this.pause = false;
            this.secondButtonText = "Pause";
        }
    }
}
