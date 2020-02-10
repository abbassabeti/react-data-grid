import { __assign, __rest } from "tslib";
import React, { memo } from 'react';
import { isElement } from 'react-is';
import Row from './Row';
import RowGroup from './RowGroup';
function RowRenderer(_a) {
    var cellMetaData = _a.cellMetaData, colOverscanEndIdx = _a.colOverscanEndIdx, colOverscanStartIdx = _a.colOverscanStartIdx, columnMetrics = _a.columnMetrics, eventBus = _a.eventBus, getSubRowDetails = _a.getSubRowDetails, idx = _a.idx, onRowSelectionChange = _a.onRowSelectionChange, rowData = _a.rowData, rowGroupRenderer = _a.rowGroupRenderer, rowHeight = _a.rowHeight, rowKey = _a.rowKey, rowRenderer = _a.rowRenderer, scrollLeft = _a.scrollLeft, selectedRows = _a.selectedRows, setRowRef = _a.setRowRef;
    var __metaData = rowData.__metaData;
    var rendererProps = {
        ref: function (row) {
            setRowRef(row, idx);
        },
        idx: idx,
        row: rowData,
        width: columnMetrics.totalColumnWidth,
        height: rowHeight,
        columns: columnMetrics.columns,
        isRowSelected: selectedRows !== undefined && selectedRows.has(rowData[rowKey]),
        onRowSelectionChange: onRowSelectionChange,
        cellMetaData: cellMetaData,
        subRowDetails: getSubRowDetails ? getSubRowDetails(rowData) : undefined,
        colOverscanStartIdx: colOverscanStartIdx,
        colOverscanEndIdx: colOverscanEndIdx,
        lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
        scrollLeft: scrollLeft,
        isSummaryRow: false
    };
    function renderCustomRowRenderer() {
        var ref = rendererProps.ref, otherProps = __rest(rendererProps, ["ref"]);
        var CustomRowRenderer = rowRenderer;
        var customRowRendererProps = __assign(__assign({}, otherProps), { renderBaseRow: function (p) { return React.createElement(Row, __assign({ ref: ref }, p)); } });
        if (isElement(CustomRowRenderer)) {
            if (CustomRowRenderer.type === Row) {
                // In the case where Row is specified as the custom render, ensure the correct ref is passed
                return React.createElement(Row, __assign({}, rendererProps));
            }
            return React.cloneElement(CustomRowRenderer, customRowRendererProps);
        }
        return React.createElement(CustomRowRenderer, __assign({}, customRowRendererProps));
    }
    function renderGroupRow() {
        var ref = rendererProps.ref, columns = rendererProps.columns, rowGroupProps = __rest(rendererProps, ["ref", "columns"]);
        return (React.createElement(RowGroup, __assign({}, rowGroupProps, __metaData, { columns: columns, name: rowData.name, eventBus: eventBus, renderer: rowGroupRenderer, renderBaseRow: function (p) { return React.createElement(Row, __assign({ ref: ref }, p)); } })));
    }
    if (__metaData) {
        if (__metaData.getRowRenderer) {
            return __metaData.getRowRenderer(rendererProps, idx);
        }
        if (__metaData.isGroup) {
            return renderGroupRow();
        }
    }
    if (rowRenderer) {
        return renderCustomRowRenderer();
    }
    return React.createElement(Row, __assign({}, rendererProps));
}
export default memo(RowRenderer);
//# sourceMappingURL=RowRenderer.js.map