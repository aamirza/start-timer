class Table {
    constructor(tableElement) {
        this.table = tableElement;
    }

    removeNoWorkRow() {
        const noWorkRow = document.querySelector("#no-work-recorded");
        if (noWorkRow) {
            noWorkRow.parentElement.removeChild(noWorkRow);
        }
    }

    createCell(className="", innerHtml="") {
        const cell = document.createElement("td");
        if (className) cell.setAttribute("class", className)
        if (innerHtml) cell.innerHTML = innerHtml;
        return cell;
    }

    addWorkRow(startTime, workLength, breakLength) {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("class", "work-column")
        const startTimeRow = this.createCell("start-time", startTime);
        const workLengthRow = this.createCell("work-time", workLength);
        const breakLengthRow = this.createCell("break-time", breakLength);
        tableRow.appendChild(startTimeRow);
        tableRow.appendChild(workLengthRow);
        tableRow.appendChild(breakLengthRow);
        this.table.appendChild(tableRow);
    }
}
