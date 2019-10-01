class Table {
    constructor(tableElement) {
        this.table = tableElement;
    }

    createElementWith(element, options) {
        const cell = document.createElement(element);
        if ('className' in options) cell.setAttribute("class", options.className);
        if ('idName' in options) cell.setAttribute("id", options.idName);
        if ('innerHTML' in options) cell.innerHTML = options.innerHTML;
        return cell;
    }

    addRow(rowElement, cells=[]) {
        for (var row in cells) rowElement.appendChild(cells[row]);
        this.table.appendChild(rowElement);
    }
}
