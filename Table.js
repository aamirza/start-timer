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

    calculateTotal(rowsCollection) {
        let total = 0;
        for (var i = 0; i < rowsCollection.length; i++) {
            total += parseFloat(rowsCollection[i].innerHTML);
        }
        return total;
    }

    createTotalsRow() {
        const footerRow = document.createElement("tfoot");
        footerRow.setAttribute("class", "footer-col")
        const firstCell = document.createElement("td");
        firstCell.setAttribute("id", "total-text");
        firstCell.innerHTML = "Total: ";
        const totalWorkCell = document.createElement("td");
        totalWorkCell.setAttribute("id", "total-work");
        const totalBreakCell = document.createElement("td");
        totalBreakCell.setAttribute("id", "total-break");
        footerRow.appendChild(firstCell);
        footerRow.appendChild(totalWorkCell);
        footerRow.appendChild(totalBreakCell);
        this.table.appendChild(footerRow);
        this.totalsRow = document.querySelector(".footer-col");
    }

    calculateTotalsRow() {
        if (!this.totalsRow) {
            this.createTotalsRow();
        }
        const allWorkRows = document.querySelectorAll(".work-time");
        const allBreakRows = document.querySelectorAll(".break-time");
        const totalWork = this.calculateTotal(allWorkRows);
        const totalBreak = this.calculateTotal(allBreakRows);
        document.querySelector("#total-work").innerHTML = totalWork;
        document.querySelector("#total-break").innerHTML = totalBreak;
    }
}
