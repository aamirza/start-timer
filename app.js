const timer = new Timer();

document.querySelector(".main-button").addEventListener("click", (event) => {
    timer.mainButtonPress(event);
})

document.querySelector(".second-button").addEventListener("click", (event) => {
    timer.secondButtonPress(event)
})
