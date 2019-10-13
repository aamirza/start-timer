const timer = new Timer();
const taskManager = new TaskManager(document.querySelector("#task-list"),
                                    document.querySelector("#task-pane"));

document.querySelector(".main-button").addEventListener("click", (event) => {
    timer.mainButtonPress(event);
});

document.querySelector(".second-button").addEventListener("click", (event) => {
    timer.secondButtonPress(event)
});

document.querySelector("#task-box").addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        taskManager.addTaskButtonClick(event);
    }
})

document.querySelector("#add-task").addEventListener("click", (event) => {
    taskManager.addTaskButtonClick(event);
});

document.querySelector("#task-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("task-name")) {
        taskManager.selectTask(event);
    } else {
        taskManager.crossOutTask(event)
    };
});

document.querySelectorAll(".view").forEach((element) => {
    element.addEventListener("click", (event) => {
        document.querySelectorAll(".view").forEach((paneButton) => {
            paneButton.classList.remove("selected-pane");
        });
        event.target.classList.add("selected-pane");
        const selectedPaneId = event.target.id.split("-")[0] + "-pane";
        const panes = document.querySelectorAll(".pane");
        panes.forEach(pane => pane.classList.remove("current-pane"))
        document.querySelector("#"+selectedPaneId).classList.add("current-pane");
    });
});
