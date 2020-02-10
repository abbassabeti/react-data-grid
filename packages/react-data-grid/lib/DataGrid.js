import { __read, __rest } from "tslib";
import React, { forwardRef, useState, useRef, useEffect, useLayoutEffect, useMemo, useImperativeHandle, createElement } from 'react';
import { isValidElementType } from 'react-is';
import Header from './Header';
import Canvas from './Canvas';
import { legacyCellContentRenderer } from './Cell/cellContentRenderers';
import { getColumnMetrics } from './utils/columnUtils';
import EventBus from './EventBus';
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType } from './common/enums';
/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={3} />
*/
function DataGrid(_a, ref) {
    var _b = _a.rowKey, rowKey = _b === void 0 ? 'id' : _b, _c = _a.rowHeight, rowHeight = _c === void 0 ? 35 : _c, _d = _a.headerFiltersHeight, headerFiltersHeight = _d === void 0 ? 45 : _d, _e = _a.minColumnWidth, minColumnWidth = _e === void 0 ? 80 : _e, _f = _a.minHeight, minHeight = _f === void 0 ? 350 : _f, width = _a.minWidth, _g = _a.enableCellSelect, enableCellSelect = _g === void 0 ? false : _g, _h = _a.enableCellAutoFocus, enableCellAutoFocus = _h === void 0 ? true : _h, _j = _a.cellNavigationMode, cellNavigationMode = _j === void 0 ? CellNavigationMode.NONE : _j, _k = _a.editorPortalTarget, editorPortalTarget = _k === void 0 ? document.body : _k, _l = _a.renderBatchSize, renderBatchSize = _l === void 0 ? 8 : _l, _m = _a.defaultCellContentRenderer, defaultCellContentRenderer = _m === void 0 ? legacyCellContentRenderer : _m, columns = _a.columns, rowsCount = _a.rowsCount, rowGetter = _a.rowGetter, cellRangeSelection = _a.cellRangeSelection, selectedRows = _a.selectedRows, onSelectedRowsChange = _a.onSelectedRowsChange, props = __rest(_a, ["rowKey", "rowHeight", "headerFiltersHeight", "minColumnWidth", "minHeight", "minWidth", "enableCellSelect", "enableCellAutoFocus", "cellNavigationMode", "editorPortalTarget", "renderBatchSize", "defaultCellContentRenderer", "columns", "rowsCount", "rowGetter", "cellRangeSelection", "selectedRows", "onSelectedRowsChange"]);
    var _o = __read(useState(function () { return new Map(); }), 2), columnWidths = _o[0], setColumnWidths = _o[1];
    var _p = __read(useState(function () { return new EventBus(); }), 1), eventBus = _p[0];
    var _q = __read(useState(0), 2), gridWidth = _q[0], setGridWidth = _q[1];
    var gridRef = useRef(null);
    var headerRef = useRef(null);
    var lastSelectedRowIdx = useRef(-1);
    var viewportWidth = (width || gridWidth) - 2; // 2 for border width;
    var scrollLeft = useRef(0);
    var columnMetrics = useMemo(function () {
        if (viewportWidth <= 0)
            return null;
        return getColumnMetrics({
            columns: columns,
            minColumnWidth: minColumnWidth,
            viewportWidth: viewportWidth,
            columnWidths: columnWidths,
            defaultCellContentRenderer: defaultCellContentRenderer
        });
    }, [columnWidths, columns, defaultCellContentRenderer, minColumnWidth, viewportWidth]);
    useLayoutEffect(function () {
        // Do not calculate the width if minWidth is provided
        if (width)
            return;
        function onResize() {
            // Immediately re-render when the component is mounted to get valid columnMetrics.
            setGridWidth(gridRef.current.getBoundingClientRect().width);
        }
        onResize();
        window.addEventListener('resize', onResize);
        return function () {
            window.removeEventListener('resize', onResize);
        };
    }, [width]);
    useEffect(function () {
        if (!cellRangeSelection)
            return;
        function handleWindowMouseUp() {
            eventBus.dispatch(EventTypes.SELECT_END);
        }
        window.addEventListener('mouseup', handleWindowMouseUp);
        return function () {
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [eventBus, cellRangeSelection]);
    function selectCell(_a, openEditor) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx: rowIdx, idx: idx }, openEditor);
    }
    function getColumn(idx) {
        return columnMetrics.columns[idx];
    }
    function handleColumnResize(column, width) {
        var newColumnWidths = new Map(columnWidths);
        width = Math.max(width, minColumnWidth);
        newColumnWidths.set(column.key, width);
        setColumnWidths(newColumnWidths);
        if (props.onColumnResize) {
            props.onColumnResize(column.idx, width);
        }
    }
    function handleScroll(scrollPosition) {
        if (headerRef.current && scrollLeft.current !== scrollPosition.scrollLeft) {
            scrollLeft.current = scrollPosition.scrollLeft;
            headerRef.current.setScrollLeft(scrollPosition.scrollLeft);
        }
        if (props.onScroll) {
            props.onScroll(scrollPosition);
        }
    }
    function handleDragEnter(overRowIdx) {
        eventBus.dispatch(EventTypes.DRAG_ENTER, overRowIdx);
    }
    function handleCellClick(_a) {
        var rowIdx = _a.rowIdx, idx = _a.idx;
        var onRowClick = props.onRowClick;
        selectCell({ rowIdx: rowIdx, idx: idx });
        if (onRowClick) {
            onRowClick(rowIdx, rowGetter(rowIdx), getColumn(idx));
        }
    }
    function handleCellMouseDown(position) {
        eventBus.dispatch(EventTypes.SELECT_START, position);
    }
    function handleCellMouseEnter(position) {
        eventBus.dispatch(EventTypes.SELECT_UPDATE, position);
    }
    function handleCellContextMenu(position) {
        selectCell(position);
    }
    function handleCellDoubleClick(_a) {
        var rowIdx = _a.rowIdx, idx = _a.idx;
        var onRowDoubleClick = props.onRowDoubleClick;
        if (onRowDoubleClick) {
            onRowDoubleClick(rowIdx, rowGetter(rowIdx), getColumn(idx));
        }
        openCellEditor(rowIdx, idx);
    }
    var handleDragHandleDoubleClick = function (e) {
        var _a;
        var cellKey = getColumn(e.idx).key;
        handleGridRowsUpdated(cellKey, e.rowIdx, rowsCount - 1, (_a = {}, _a[cellKey] = e.rowData[cellKey], _a), UpdateActions.COLUMN_FILL);
    };
    var handleGridRowsUpdated = function (cellKey, fromRow, toRow, updated, action, originRow) {
        var onGridRowsUpdated = props.onGridRowsUpdated;
        if (!onGridRowsUpdated) {
            return;
        }
        var rowIds = [];
        var start = Math.min(fromRow, toRow);
        var end = Math.max(fromRow, toRow);
        for (var i = start; i <= end; i++) {
            rowIds.push(rowGetter(i)[rowKey]);
        }
        var fromRowData = rowGetter(action === UpdateActions.COPY_PASTE ? originRow : fromRow);
        var fromRowId = fromRowData[rowKey];
        var toRowId = rowGetter(toRow)[rowKey];
        onGridRowsUpdated({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, fromRowId: fromRowId, toRowId: toRowId, rowIds: rowIds, updated: updated, action: action, fromRowData: fromRowData });
    };
    function handleCommit(commit) {
        var targetRow = commit.rowIdx;
        handleGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, UpdateActions.CELL_UPDATE);
    }
    function getHeaderRows() {
        var headerRowHeight = props.headerRowHeight, onAddFilter = props.onAddFilter;
        return [
            { height: headerRowHeight || rowHeight, rowType: HeaderRowType.HEADER },
            props.enableHeaderFilters ? {
                rowType: HeaderRowType.FILTER,
                filterable: true,
                onFilterChange: onAddFilter,
                height: headerFiltersHeight || headerRowHeight || rowHeight
            } : undefined
        ];
    }
    function openCellEditor(rowIdx, idx) {
        selectCell({ rowIdx: rowIdx, idx: idx }, true);
    }
    function scrollToColumn(colIdx) {
        eventBus.dispatch(EventTypes.SCROLL_TO_COLUMN, colIdx);
    }
    function handleRowSelectionChange(rowIdx, row, checked, isShiftClick) {
        if (!onSelectedRowsChange)
            return;
        var newSelectedRows = new Set(selectedRows);
        if (checked) {
            newSelectedRows.add(row[rowKey]);
            var previousRowIdx = lastSelectedRowIdx.current;
            lastSelectedRowIdx.current = rowIdx;
            if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
                var step = Math.sign(rowIdx - previousRowIdx);
                for (var i = previousRowIdx + step; i !== rowIdx; i += step) {
                    newSelectedRows.add(rowGetter(i)[rowKey]);
                }
            }
        }
        else {
            newSelectedRows.delete(row[rowKey]);
            lastSelectedRowIdx.current = -1;
        }
        onSelectedRowsChange(newSelectedRows);
    }
    useImperativeHandle(ref, function () { return ({
        scrollToColumn: scrollToColumn,
        selectCell: selectCell,
        openCellEditor: openCellEditor
    }); });
    var cellMetaData = {
        rowKey: rowKey,
        onCellClick: handleCellClick,
        onCellContextMenu: handleCellContextMenu,
        onCellDoubleClick: handleCellDoubleClick,
        onCellExpand: props.onCellExpand,
        onRowExpandToggle: props.onRowExpandToggle,
        getCellActions: props.getCellActions,
        onDeleteSubRow: props.onDeleteSubRow,
        onAddSubRow: props.onAddSubRow,
        onDragEnter: handleDragEnter
    };
    if (cellRangeSelection) {
        cellMetaData.onCellMouseDown = handleCellMouseDown;
        cellMetaData.onCellMouseEnter = handleCellMouseEnter;
    }
    var interactionMasksMetaData = {
        onCheckCellIsEditable: props.onCheckCellIsEditable,
        onCellCopyPaste: props.onCellCopyPaste,
        onGridRowsUpdated: handleGridRowsUpdated,
        onDragHandleDoubleClick: handleDragHandleDoubleClick,
        onCellSelected: props.onCellSelected,
        onCellDeSelected: props.onCellDeSelected,
        onCellRangeSelectionStarted: cellRangeSelection && cellRangeSelection.onStart,
        onCellRangeSelectionUpdated: cellRangeSelection && cellRangeSelection.onUpdate,
        onCellRangeSelectionCompleted: cellRangeSelection && cellRangeSelection.onComplete,
        onCommit: handleCommit
    };
    var headerRows = getHeaderRows();
    var rowOffsetHeight = headerRows[0].height + (headerRows[1] ? headerRows[1].height : 0);
    return (React.createElement("div", { className: "rdg-root", style: { width: width, lineHeight: rowHeight + "px" }, ref: gridRef }, columnMetrics && (React.createElement(React.Fragment, null,
        React.createElement(Header, { ref: headerRef, rowKey: rowKey, rowsCount: rowsCount, rowGetter: rowGetter, columnMetrics: columnMetrics, onColumnResize: handleColumnResize, headerRows: headerRows, sortColumn: props.sortColumn, sortDirection: props.sortDirection, draggableHeaderCell: props.draggableHeaderCell, onSort: props.onGridSort, onHeaderDrop: props.onHeaderDrop, allRowsSelected: selectedRows !== undefined && selectedRows.size === rowsCount, onSelectedRowsChange: onSelectedRowsChange, getValidFilterValues: props.getValidFilterValues, cellMetaData: cellMetaData }),
        rowsCount === 0 && isValidElementType(props.emptyRowsView) ? createElement(props.emptyRowsView) : (React.createElement(Canvas, { rowKey: rowKey, rowHeight: rowHeight, rowRenderer: props.rowRenderer, rowGetter: rowGetter, rowsCount: rowsCount, selectedRows: selectedRows, onRowSelectionChange: handleRowSelectionChange, columnMetrics: columnMetrics, onScroll: handleScroll, cellMetaData: cellMetaData, height: minHeight - rowOffsetHeight, scrollToRowIndex: props.scrollToRowIndex, contextMenu: props.contextMenu, getSubRowDetails: props.getSubRowDetails, rowGroupRenderer: props.rowGroupRenderer, enableCellSelect: enableCellSelect, enableCellAutoFocus: enableCellAutoFocus, cellNavigationMode: cellNavigationMode, eventBus: eventBus, interactionMasksMetaData: interactionMasksMetaData, RowsContainer: props.RowsContainer, editorPortalTarget: editorPortalTarget, onCanvasKeydown: props.onGridKeyDown, onCanvasKeyup: props.onGridKeyUp, renderBatchSize: renderBatchSize, summaryRows: props.summaryRows }))))));
}
export default forwardRef(DataGrid);
//# sourceMappingURL=DataGrid.js.map