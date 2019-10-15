class Worklog extends Table {
    constructor(tableElement) {
        super(tableElement);
        this.totalsRow = document.querySelector(".footer-col");
    }

    removeNoWorkRow() {
        const noWorkRow = document.querySelector("#no-work-recorded");
        if (noWorkRow) noWorkRow.parentElement.removeChild(noWorkRow);
    }

    addWorkRow(startTime, workLength, breakLength) {
        const tableRow = this.createElementWith("tr", {className: "work-column"});
        const startTimeRow = this.createElementWith("td", {
            className: "start-time",
            innerHTML: startTime
        });
        const workLengthRow = this.createElementWith("td", {
            className: "work-time",
            innerHTML: workLength
        });
        const breakLengthRow = this.createElementWith("td", {
            className: "break-time",
            innerHTML: breakLength
        });
        super.addRow(tableRow, [startTimeRow, workLengthRow, breakLengthRow]);
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
        const footerRow = super.createElementWith("tfoot", {className: "footer-col"});
        const firstCell = super.createElementWith("td", {
            idName: "total-text",
            innerHTML: "Total: "
        });
        const totalWorkCell = super.createElementWith("td", {idName: "total-work"});
        const totalBreakCell = super.createElementWith("td", {idName: "total-break"});
        super.addRow(footerRow, [firstCell, totalWorkCell, totalBreakCell]);
        this.table.appendChild(footerRow);
        this.totalsRow = document.querySelector(".footer-col");
    }

    calculateTotalsRow() {
        if (!this.totalsRow) this.createTotalsRow();
        const allWorkRows = document.querySelectorAll(".work-time");
        const allBreakRows = document.querySelectorAll(".break-time");
        const totalWork = this.calculateTotal(allWorkRows);
        const totalBreak = this.calculateTotal(allBreakRows);
        document.querySelector("#total-work").innerHTML = totalWork;
        document.querySelector("#total-break").innerHTML = totalBreak;
    }
}
