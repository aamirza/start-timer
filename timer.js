class Timer {
    constructor() {
        this.countDown = false;
        this.countUp = false;
        this.shortBreak = false;
        this.longBreak = false;
        this.working = false;
        this.pause = true;
        this.secondsElapsed = 0;
        this.timerBody = document.querySelector("#timer");
        this.formValues = document.querySelector("#work-params");
        this.mainButton = document.querySelector("#main-button");
        this.secondButton = document.querySelector("#second-button");
        this.workField = document.querySelector("#work");
        this.shortBreakField = document.querySelector("#sbreak")
        this.sound = document.querySelector("audio");
        this.table = new Table(document.querySelector("#work-table"));

    }

    get workTime() {
        return this.workField.value;
    }

    set workTime(minutes) {
        this.workField.value = minutes;
    }

    set pageTitle(title) {
        if (!document.querySelector("title")) {
            const titleElement = document.createElement("title");
            document.querySelector("head").appendChild(titleElement);
        }
        document.querySelector("title").innerHTML = title;
    }

    get shortBreakTime() {
        return this.shortBreakField.value;
    }

    get onBreak() {
        return (this.shortBreak || this.longBreak);
    }

    set timerText(seconds) {
        if (seconds >= 0) {
            this.countDown = true;
            this.countUp = false;
            this.timerBody.innerHTML = this.convertToTime(seconds);
        } else if (this.working) {
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

    pad(number) {
        if (number < 10) {
            return "0" + number;
        } else {
            return number;
        }
    }

    convertToTime(timeInSeconds) {
        const h = Math.floor(timeInSeconds / 3600);
        const mm = this.pad(Math.floor(timeInSeconds / 60) - (60*h));
        const ss = this.pad(timeInSeconds % 60);

        return (h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`);
    }

    startTimer(seconds) {
        this.secondsElapsed = 0;
        return setInterval(() => {
            if (!this.pause && (this.working || this.onBreak)) {
                this.secondsElapsed += 1;
                timer.timerText = seconds - this.secondsElapsed;
                this.pageTitle = this.timerBody.innerHTML;
                if (this.onBreak && this.secondsElapsed >= seconds) {
                    this.breakOver();
                }
            } else if (this.pause) {
                this.secondsElapsed += 0;
            }
            if (this.countUp && this.mainButton.innerHTML === "Stop") {
                this.mainButtonText = "Break";
            }
        }, 1000)
    }

    beep() {
        if (document.querySelector("input[name=sound]").checked) {
            this.sound.play();
        } else {
            this.sound.pause();
        }
    }

    breakOver() {
        this.stopCommand();
        this.beep();
        alert("Your break is over!");
        this.sound.pause();
    }

    stopCommand() {
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

    mainButtonPress(buttonEvent) {
        const command = buttonEvent.target.textContent.toLowerCase();
        if (command === "start") {
            this.timerText = this.workTime * 60;
            this.working = true;
            this.pause = false;
            this.countDown = true;
            this.mainButtonText = "Stop";
            this.secondButtonText = "Pause";
            let now = new Date();
            this.startTime = this.pad(now.getHours()) + ":" + this.pad(now.getMinutes());
            this.runningTimer = this.startTimer(this.workTime*60);
        } else if (command === "stop") {
            this.stopCommand()
        } else if (command === "break") {
            clearInterval(this.runningTimer);
            this.countDown = true;
            this.countUp = false;
            this.shortBreak = true;
            this.longBreak = false;
            this.working = false;
            this.pause = false;
            this.working = false;
            this.pause = false;
            this.mainButtonText = "Stop";
            this.secondButtonText = "Reset";
            const timeWorked = Math.floor(this.secondsElapsed/60);
            this.workTime = timeWorked;
            this.table.removeNoWorkRow();
            this.table.addWorkRow(this.startTime, timeWorked, this.shortBreakTime);
            this.runningTimer = this.startTimer(this.shortBreakTime*60);
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
