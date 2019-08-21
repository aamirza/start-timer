
function setTimer() {
    const timer = document.querySelector("#timer");
    const formValues = document.querySelector("#work-params");

    const work = formValues[0].value;

    timer.innerHTML = convertToTime(work*60);
}

function convertToTime(timeInSeconds) {
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

function startCountdown(

)
