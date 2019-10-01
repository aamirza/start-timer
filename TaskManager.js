
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

    addTaskButtonClick(clickEvent) {
        if (this.taskBox.value) {
            this.addTaskRow(this.taskBox.value);
        }
    }

    addTaskRow(taskName) {
        const taskRow = super.createElementWith("tr", {className: "task-row"});
        const checkBox = super.createElementWith("td", {
            className: "task-checkbox"
        });
        const task = super.createElementWith("td", {
            className: "task-name",
            innerHTML: taskName
        });
        const editors = super.createElementWith("td", {
            className: "editors",
        })
        // taskRow.appendChild(checkBox);
        // taskRow.appendChild(task);
        // taskRow.appendChild(editors);
        // this.table.appendChild(taskRow);
        super.addRow(taskRow, [checkBox, task, editors]);
        }
};
