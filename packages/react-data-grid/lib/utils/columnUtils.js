import { __assign, __values } from "tslib";
import { getScrollbarSize } from './domUtils';
export function getColumnMetrics(metrics) {
    var e_1, _a;
    var left = 0;
    var totalWidth = 0;
    var allocatedWidths = 0;
    var unassignedColumnsCount = 0;
    var lastFrozenColumnIndex = -1;
    var columns = [];
    try {
        for (var _b = __values(metrics.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
            var metricsColumn = _c.value;
            var width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth, metrics.minColumnWidth);
            var column = __assign(__assign({}, metricsColumn), { width: width });
            if (width === undefined) {
                unassignedColumnsCount++;
            }
            else {
                allocatedWidths += width;
            }
            if (isFrozen(column)) {
                lastFrozenColumnIndex++;
                columns.splice(lastFrozenColumnIndex, 0, column);
            }
            else {
                columns.push(column);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var unallocatedWidth = metrics.viewportWidth - allocatedWidths - getScrollbarSize();
    var unallocatedColumnWidth = Math.max(Math.floor(unallocatedWidth / unassignedColumnsCount), metrics.minColumnWidth);
    var calculatedColumns = columns.map(function (column, idx) {
        // Every column should have a valid width as this stage
        var width = column.width === undefined ? unallocatedColumnWidth : column.width;
        var newColumn = __assign(__assign({}, column), { idx: idx,
            width: width,
            left: left, cellContentRenderer: column.cellContentRenderer || metrics.defaultCellContentRenderer });
        totalWidth += width;
        left += width;
        return newColumn;
    });
    return {
        columns: calculatedColumns,
        lastFrozenColumnIndex: lastFrozenColumnIndex,
        totalColumnWidth: totalWidth,
        viewportWidth: metrics.viewportWidth
    };
}
function getSpecifiedWidth(column, columnWidths, viewportWidth, minColumnWidth) {
    if (columnWidths.has(column.key)) {
        // Use the resized width if available
        return columnWidths.get(column.key);
    }
    if (typeof column.width === 'number') {
        // TODO: allow width to be less than minWidth?
        return Math.max(column.width, minColumnWidth);
    }
    if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
        return Math.max(Math.floor(viewportWidth * parseInt(column.width, 10) / 100), minColumnWidth);
    }
}
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
export function canEdit(column, rowData, enableCellSelect) {
    if (typeof column.editable === 'function') {
        return enableCellSelect === true && column.editable(rowData);
    }
    return enableCellSelect === true && (!!column.editor || !!column.editable);
}
export function isFrozen(column) {
    return column.frozen === true;
}
export function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
    var left = 0;
    var frozen = 0;
    for (var i = 0; i < idx; i++) {
        var column = columns[i];
        if (column) {
            if (column.width) {
                left += column.width;
            }
            if (isFrozen(column)) {
                frozen += column.width;
            }
        }
    }
    var selectedColumn = columns[idx];
    if (selectedColumn) {
        var scrollLeft = left - frozen - currentScrollLeft;
        var scrollRight = left + selectedColumn.width - currentScrollLeft;
        if (scrollLeft < 0) {
            return scrollLeft;
        }
        if (scrollRight > currentClientWidth) {
            return scrollRight - currentClientWidth;
        }
    }
    return 0;
}
//# sourceMappingURL=columnUtils.js.map