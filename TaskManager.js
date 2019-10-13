
class TaskManager extends Table {
    constructor(tableElement, taskPane) {
        super(tableElement);
        this.taskPane = taskPane;
        this.taskBox = document.querySelector("#task-box");
        //this.taskList = this.taskPane.querySelector("#task-list");
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
        }
    }

    selectTask(clickEvent) {
        const allTasks = document.querySelectorAll(".task-name");
        allTasks.forEach((task) => task.removeAttribute("id"));
        clickEvent.target.setAttribute("id", "selected-task");
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
