
class TaskManager {
    constructor(taskPane) {
        this.taskPane = taskPane;
        this.taskBox = this.taskPane.querySelector("#task-box");
        this.taskList = this.taskPane.querySelector("#task-list");
    }

    get taskBoxText() {
        return this.taskBox.value;
    }

    addTaskRow(taskName) {
        
    }
}
