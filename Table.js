class Table {
    constructor(tableElement) {
        this.table = tableElement;
        this.totalsRow = document.querySelector(".footer-col");
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

    calculateTotalsRow() {
        if (!this.totalsRow) {
            const footerRow = document.createElement("tfoot");
            footerRow.setAttribute("class", "footer-col")
            const firstCell = document.createElement("td");
            firstCell.setAttribute("id", "total-text");
            firstCell.innerHTML = "Total: ";
            const totalWork = document.createElement("td");
            totalWork.setAttribute("id", "total-work");
            const totalBreak = document.createElement("td");
            totalBreak.setAttribute("id", "total-break");
            footerRow.appendChild(firstCell);
            footerRow.appendChild(totalWork);
            footerRow.appendChild(totalBreak);
            this.table.appendChild(footerRow);
            this.totalsRow = document.querySelector(".footer-col");
        }
        const allWorkColumns = document.getElementsByClassName(".work-time");
        const allBreakColumns = document.getElementsByClassName(".break-time");

    }
}
