import { __assign, __read } from "tslib";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EventTypes } from './common/enums';
import InteractionMasks from './masks/InteractionMasks';
import RowRenderer from './RowRenderer';
import SummaryRowRenderer from './SummaryRowRenderer';
import { getColumnScrollPosition, getScrollbarSize, isPositionStickySupported } from './utils';
import { getHorizontalRangeToRender, getVerticalRangeToRender } from './utils/viewportUtils';
export default function Canvas(_a) {
    var cellMetaData = _a.cellMetaData, cellNavigationMode = _a.cellNavigationMode, columnMetrics = _a.columnMetrics, contextMenu = _a.contextMenu, editorPortalTarget = _a.editorPortalTarget, enableCellAutoFocus = _a.enableCellAutoFocus, enableCellSelect = _a.enableCellSelect, eventBus = _a.eventBus, getSubRowDetails = _a.getSubRowDetails, height = _a.height, interactionMasksMetaData = _a.interactionMasksMetaData, onCanvasKeydown = _a.onCanvasKeydown, onCanvasKeyup = _a.onCanvasKeyup, onRowSelectionChange = _a.onRowSelectionChange, onScroll = _a.onScroll, renderBatchSize = _a.renderBatchSize, rowGetter = _a.rowGetter, rowGroupRenderer = _a.rowGroupRenderer, rowHeight = _a.rowHeight, rowKey = _a.rowKey, rowRenderer = _a.rowRenderer, RowsContainer = _a.RowsContainer, rowsCount = _a.rowsCount, scrollToRowIndex = _a.scrollToRowIndex, selectedRows = _a.selectedRows, summaryRows = _a.summaryRows;
    var _b = __read(useState(0), 2), scrollTop = _b[0], setScrollTop = _b[1];
    var _c = __read(useState(0), 2), scrollLeft = _c[0], setScrollLeft = _c[1];
    var canvas = useRef(null);
    var summaryRef = useRef(null);
    var prevScrollToRowIndex = useRef();
    var _d = __read(useState(function () { return new Map(); }), 1), rowRefs = _d[0];
    var clientHeight = getClientHeight();
    var nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;
    var _e = __read(getVerticalRangeToRender(clientHeight, rowHeight, scrollTop, rowsCount, renderBatchSize), 2), rowOverscanStartIdx = _e[0], rowOverscanEndIdx = _e[1];
    var _f = useMemo(function () {
        return getHorizontalRangeToRender({
            columnMetrics: columnMetrics,
            scrollLeft: scrollLeft
        });
    }, [columnMetrics, scrollLeft]), colOverscanStartIdx = _f.colOverscanStartIdx, colOverscanEndIdx = _f.colOverscanEndIdx, colVisibleStartIdx = _f.colVisibleStartIdx, colVisibleEndIdx = _f.colVisibleEndIdx;
    useEffect(function () {
        return eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, function (idx) { return scrollToColumn(idx, columnMetrics.columns); });
    }, [columnMetrics.columns, eventBus]);
    useEffect(function () {
        if (prevScrollToRowIndex.current === scrollToRowIndex)
            return;
        prevScrollToRowIndex.current = scrollToRowIndex;
        var current = canvas.current;
        if (typeof scrollToRowIndex === 'number' && current) {
            current.scrollTop = scrollToRowIndex * rowHeight;
        }
    }, [rowHeight, scrollToRowIndex]);
    function handleScroll(e) {
        var _a = e.currentTarget, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
        setScrollLeft(scrollLeft);
        setScrollTop(scrollTop);
        onScroll({ scrollLeft: scrollLeft, scrollTop: scrollTop });
        if (summaryRef.current) {
            summaryRef.current.scrollLeft = scrollLeft;
        }
    }
    function getClientHeight() {
        if (canvas.current)
            return canvas.current.clientHeight;
        var scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
        return height - scrollbarSize;
    }
    function onHitBottomCanvas(_a) {
        var rowIdx = _a.rowIdx;
        var current = canvas.current;
        if (current) {
            // We do not need to check for the index being in range, as the scrollTop setter will adequately clamp the value.
            current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
        }
    }
    function onHitTopCanvas(_a) {
        var rowIdx = _a.rowIdx;
        var current = canvas.current;
        if (current) {
            current.scrollTop = rowIdx * rowHeight;
        }
    }
    function handleHitColummBoundary(_a) {
        var idx = _a.idx;
        scrollToColumn(idx, columnMetrics.columns);
    }
    function getRowColumns(rowIdx) {
        var row = rowRefs.get(rowIdx);
        return row && row.props ? row.props.columns : columnMetrics.columns;
    }
    function scrollToColumn(idx, columns) {
        var current = canvas.current;
        if (!current)
            return;
        var scrollLeft = current.scrollLeft, clientWidth = current.clientWidth;
        var newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
        if (newScrollLeft !== 0) {
            current.scrollLeft = scrollLeft + newScrollLeft;
        }
    }
    var setRowRef = useCallback(function (row, idx) {
        if (row === null) {
            rowRefs.delete(idx);
        }
        else {
            rowRefs.set(idx, row);
        }
    }, [rowRefs]);
    function getViewportRows() {
        var rowElements = [];
        for (var idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
            var rowData = rowGetter(idx);
            rowElements.push(React.createElement(RowRenderer, { key: idx, idx: idx, rowData: rowData, setRowRef: setRowRef, cellMetaData: cellMetaData, colOverscanEndIdx: colOverscanEndIdx, colOverscanStartIdx: colOverscanStartIdx, columnMetrics: columnMetrics, eventBus: eventBus, getSubRowDetails: getSubRowDetails, onRowSelectionChange: onRowSelectionChange, rowGroupRenderer: rowGroupRenderer, rowHeight: rowHeight, rowKey: rowKey, rowRenderer: rowRenderer, scrollLeft: nonStickyScrollLeft, selectedRows: selectedRows }));
        }
        return rowElements;
    }
    var grid = (React.createElement("div", { className: "rdg-grid", style: {
            width: columnMetrics.totalColumnWidth,
            paddingTop: rowOverscanStartIdx * rowHeight,
            paddingBottom: (rowsCount - 1 - rowOverscanEndIdx) * rowHeight
        } }, getViewportRows()));
    if (RowsContainer !== undefined) {
        grid = React.createElement(RowsContainer, { id: contextMenu ? contextMenu.props.id : 'rowsContainer' }, grid);
    }
    var summary = summaryRows && summaryRows.length > 0 && (React.createElement("div", { ref: summaryRef, className: "rdg-summary" }, summaryRows.map(function (rowData, idx) { return (React.createElement(SummaryRowRenderer, { key: idx, idx: idx, rowData: rowData, cellMetaData: cellMetaData, colOverscanEndIdx: colOverscanEndIdx, colOverscanStartIdx: colOverscanStartIdx, columnMetrics: columnMetrics, rowHeight: rowHeight, scrollLeft: nonStickyScrollLeft })); })));
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rdg-viewport", style: { height: height - 2 - (summaryRows ? summaryRows.length * rowHeight + 2 : 0) }, ref: canvas, onScroll: handleScroll, onKeyDown: onCanvasKeydown, onKeyUp: onCanvasKeyup },
            React.createElement(InteractionMasks, __assign({ rowGetter: rowGetter, rowsCount: rowsCount, rowHeight: rowHeight, columns: columnMetrics.columns, height: clientHeight, colVisibleStartIdx: colVisibleStartIdx, colVisibleEndIdx: colVisibleEndIdx, enableCellSelect: enableCellSelect, enableCellAutoFocus: enableCellAutoFocus, cellNavigationMode: cellNavigationMode, eventBus: eventBus, contextMenu: contextMenu, onHitBottomBoundary: onHitBottomCanvas, onHitTopBoundary: onHitTopCanvas, onHitLeftBoundary: handleHitColummBoundary, onHitRightBoundary: handleHitColummBoundary, scrollLeft: scrollLeft, scrollTop: scrollTop, getRowColumns: getRowColumns, editorPortalTarget: editorPortalTarget }, interactionMasksMetaData)),
            grid),
        summary));
}
//# sourceMappingURL=Canvas.js.map