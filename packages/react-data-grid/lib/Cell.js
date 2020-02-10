import { __assign } from "tslib";
import React, { memo } from 'react';
import classNames from 'classnames';
import { isFrozen } from './utils/columnUtils';
function Cell(_a) {
    var cellMetaData = _a.cellMetaData, children = _a.children, className = _a.className, column = _a.column, expandableOptions = _a.expandableOptions, idx = _a.idx, isRowSelected = _a.isRowSelected, isSummaryRow = _a.isSummaryRow, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, onRowSelectionChange = _a.onRowSelectionChange, rowData = _a.rowData, rowIdx = _a.rowIdx, scrollLeft = _a.scrollLeft;
    function handleCellClick() {
        cellMetaData.onCellClick({ idx: idx, rowIdx: rowIdx });
    }
    function handleCellMouseDown() {
        if (cellMetaData.onCellMouseDown) {
            cellMetaData.onCellMouseDown({ idx: idx, rowIdx: rowIdx });
        }
    }
    function handleCellMouseEnter() {
        if (cellMetaData.onCellMouseEnter) {
            cellMetaData.onCellMouseEnter({ idx: idx, rowIdx: rowIdx });
        }
    }
    function handleCellContextMenu() {
        cellMetaData.onCellContextMenu({ idx: idx, rowIdx: rowIdx });
    }
    function handleCellDoubleClick(e) {
        e.stopPropagation();
        cellMetaData.onCellDoubleClick({ idx: idx, rowIdx: rowIdx });
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    function getEvents() {
        if (isSummaryRow)
            return null;
        var columnEvents = column.events;
        var allEvents = {
            onClick: handleCellClick,
            onMouseDown: handleCellMouseDown,
            onMouseEnter: handleCellMouseEnter,
            onDoubleClick: handleCellDoubleClick,
            onContextMenu: handleCellContextMenu,
            onDragOver: handleDragOver
        };
        if (!columnEvents) {
            return allEvents;
        }
        var eventInfo = {
            idx: idx,
            rowIdx: rowIdx,
            column: column,
            rowId: rowData[cellMetaData.rowKey]
        };
        var _loop_1 = function (event_1) {
            var columnEventHandler = columnEvents[event_1];
            if (columnEventHandler) {
                if (allEvents.hasOwnProperty(event_1)) {
                    var existingEvent_1 = allEvents[event_1];
                    allEvents[event_1] = function (e) {
                        existingEvent_1(e);
                        columnEventHandler(e, eventInfo);
                    };
                }
                else {
                    allEvents[event_1] = function (e) {
                        columnEventHandler(e, eventInfo);
                    };
                }
            }
        };
        for (var event_1 in columnEvents) {
            _loop_1(event_1);
        }
        return allEvents;
    }
    var colIsFrozen = isFrozen(column);
    className = classNames(column.cellClass, 'rdg-cell', className, {
        'rdg-cell-frozen': colIsFrozen,
        'rdg-cell-frozen-last': colIsFrozen && column.idx === lastFrozenColumnIndex,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
    });
    var style = {
        width: column.width,
        left: column.left
    };
    if (scrollLeft !== undefined) {
        style.transform = "translateX(" + scrollLeft + "px)";
    }
    return (React.createElement("div", __assign({ className: className, style: style }, getEvents()), children || column.cellContentRenderer({
        idx: idx,
        rowIdx: rowIdx,
        rowData: rowData,
        column: column,
        cellMetaData: cellMetaData,
        expandableOptions: expandableOptions,
        isRowSelected: isRowSelected,
        onRowSelectionChange: onRowSelectionChange,
        isSummaryRow: isSummaryRow
    })));
}
export default memo(Cell);
//# sourceMappingURL=Cell.js.map