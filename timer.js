class Timer {
    constructor() {
        // What would be the timer's "properties"?
        // The website has loaded. What does the timer do at first?
        // Well, at first the timer is paused, correct?
        this.countDown = false;
        this.countUp = false;
        // It is also currently on break? Not necessarily.
        this.shortBreak = false;
        this.longBreak = false;
        this.working = false;
        this.pause = true;
        // What is it currently set to? It's a dynamic value?
        this.timerBody = document.querySelector("#timer");
        this.formValues = document.querySelector("#work-params");
        this.mainButton = document.querySelector("#main-button");
    }

    get workTime() {
        return document.querySelector("#work").value;
    }

    get shortBreakTime() {
        return document.querySelector("#sbreak").value;
    }

    get secondsRemaining() {
        return this.timerBody
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
        setInterval(function() {
            if (!this.pause) {
                secondsLapsed += 1;
                timer.timerText = (timer.workTime*60) - secondsLapsed;
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
            this.startTimer();
        }
    }
}
