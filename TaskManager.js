
class TaskManager extends Table {
    constructor(tableElement, taskPane) {
        super(tableElement);
        this.taskPane = taskPane;
        this.taskBox = document.querySelector("#task-box");
    }

    get taskBoxText() {
        return this.taskBox.value;
    }

    get selectedTask() {
        return document.querySelector("#selected-task");
    }

    set textBoxText(text="") {
        this.taskBox.value = text;
    }

    addTaskButtonClick(clickEvent) {
        if (this.taskBox.value) {
            this.addTaskRow(this.taskBox.value);
            this.textBoxText = "";
        }
    }

    crossOutTask(clickEvent) {
        if (clickEvent.target.getAttribute("type") === "checkbox") {
            clickEvent.target.parentElement.parentElement.classList.toggle("task-complete");
            clickEvent.target.parentElement.parentElement.removeAttribute("id");
        }
    }

    selectTask(clickEvent) {
        const allTasks = document.querySelectorAll(".task-name");
        if (
        clickEvent.target.parentElement.id !== "selected-task" &&
        !clickEvent.target.parentElement.classList.contains("task-complete")
        ) {
            allTasks.forEach((task) => task.parentElement.removeAttribute("id"));
            clickEvent.target.parentElement.setAttribute("id", "selected-task");
        } else {
            clickEvent.target.parentElement.removeAttribute("id");
        }
    }

    addTaskRow(taskName) {
        const taskRow = super.createElementWith("tr", {className: "task-row"});
        const checkBox = super.createElementWith("td", {
            className: "task-checkbox",
            innerHTML: "<input type='checkbox'>"
        });
        const task = super.createElementWith("td", {
            className: "task-name",
            innerHTML: taskName
        });
        const editors = super.createElementWith("td", {
            className: "editors",
        })
        super.addRow(taskRow, [checkBox, task, editors]);
        }
};
