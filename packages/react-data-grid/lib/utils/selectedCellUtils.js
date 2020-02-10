import { __assign } from "tslib";
import { CellNavigationMode, Z_INDEXES } from '../common/enums';
import { isFrozen, canEdit } from './columnUtils';
var getRowTop = function (rowIdx, rowHeight) { return rowIdx * rowHeight; };
export function getSelectedDimensions(_a) {
    var _b = _a.selectedPosition, idx = _b.idx, rowIdx = _b.rowIdx, columns = _a.columns, rowHeight = _a.rowHeight, scrollLeft = _a.scrollLeft;
    if (idx < 0) {
        return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
    }
    var column = columns[idx];
    var frozen = isFrozen(column);
    var width = column.width;
    var left = frozen ? column.left + scrollLeft : column.left;
    var top = getRowTop(rowIdx, rowHeight);
    var zIndex = frozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;
    return { width: width, left: left, top: top, height: rowHeight, zIndex: zIndex };
}
export function getSelectedRangeDimensions(_a) {
    var _b = _a.selectedRange, topLeft = _b.topLeft, bottomRight = _b.bottomRight, columns = _a.columns, rowHeight = _a.rowHeight;
    if (topLeft.idx < 0) {
        return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: Z_INDEXES.CELL_MASK };
    }
    var width = 0;
    var anyColFrozen = false;
    for (var i = topLeft.idx; i <= bottomRight.idx; i++) {
        var column = columns[i];
        width += column.width;
        anyColFrozen = anyColFrozen || isFrozen(column);
    }
    var left = columns[topLeft.idx].left;
    var top = getRowTop(topLeft.rowIdx, rowHeight);
    var height = (bottomRight.rowIdx - topLeft.rowIdx + 1) * rowHeight;
    var zIndex = anyColFrozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;
    return { width: width, left: left, top: top, height: height, zIndex: zIndex };
}
export function getSelectedCellValue(_a) {
    var selectedPosition = _a.selectedPosition, columns = _a.columns, rowGetter = _a.rowGetter;
    var column = columns[selectedPosition.idx];
    var row = rowGetter(selectedPosition.rowIdx);
    return row && column ? row[column.key] : null;
}
export function isSelectedCellEditable(_a) {
    var enableCellSelect = _a.enableCellSelect, selectedPosition = _a.selectedPosition, columns = _a.columns, rowGetter = _a.rowGetter, onCheckCellIsEditable = _a.onCheckCellIsEditable;
    var column = columns[selectedPosition.idx];
    var row = rowGetter(selectedPosition.rowIdx);
    var isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable(__assign({ row: row, column: column }, selectedPosition)) : true;
    return isCellEditable && canEdit(column, row, enableCellSelect);
}
export function getNextSelectedCellPosition(_a) {
    var cellNavigationMode = _a.cellNavigationMode, columns = _a.columns, rowsCount = _a.rowsCount, nextPosition = _a.nextPosition;
    if (cellNavigationMode !== CellNavigationMode.NONE) {
        var idx = nextPosition.idx, rowIdx = nextPosition.rowIdx;
        var columnsCount = columns.length;
        var isAfterLastColumn = idx === columnsCount;
        var isBeforeFirstColumn = idx === -1;
        if (isAfterLastColumn) {
            if (cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
                var isLastRow = rowIdx === rowsCount - 1;
                if (!isLastRow) {
                    return {
                        idx: 0,
                        rowIdx: rowIdx + 1,
                        changeRowOrColumn: true
                    };
                }
            }
            else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
                return {
                    rowIdx: rowIdx,
                    idx: 0,
                    changeRowOrColumn: true
                };
            }
        }
        else if (isBeforeFirstColumn) {
            if (cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
                var isFirstRow = rowIdx === 0;
                if (!isFirstRow) {
                    return {
                        rowIdx: rowIdx - 1,
                        idx: columnsCount - 1,
                        changeRowOrColumn: true
                    };
                }
            }
            else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
                return {
                    rowIdx: rowIdx,
                    idx: columnsCount - 1,
                    changeRowOrColumn: true
                };
            }
        }
    }
    return __assign(__assign({}, nextPosition), { changeRowOrColumn: false });
}
export function canExitGrid(event, _a) {
    var cellNavigationMode = _a.cellNavigationMode, columns = _a.columns, rowsCount = _a.rowsCount, _b = _a.selectedPosition, rowIdx = _b.rowIdx, idx = _b.idx;
    // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
    // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
    if (cellNavigationMode === CellNavigationMode.NONE || cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
        var atLastCellInRow = idx === columns.length - 1;
        var atFirstCellInRow = idx === 0;
        var atLastRow = rowIdx === rowsCount - 1;
        var atFirstRow = rowIdx === 0;
        var shift = event.shiftKey === true;
        return shift ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
    }
    return false;
}
export function selectedRangeIsSingleCell(_a) {
    var topLeft = _a.topLeft, bottomRight = _a.bottomRight;
    return topLeft.idx === bottomRight.idx && topLeft.rowIdx === bottomRight.rowIdx;
}
//# sourceMappingURL=selectedCellUtils.js.map