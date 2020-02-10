import React, { createElement, cloneElement } from 'react';
import { isElement, isValidElementType } from 'react-is';
import CellActions from './CellActions';
import CellExpand from './CellExpander';
import { SimpleCellFormatter } from '../formatters';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
export default function CellContent(_a) {
    var idx = _a.idx, rowIdx = _a.rowIdx, column = _a.column, rowData = _a.rowData, cellMetaData = _a.cellMetaData, expandableOptions = _a.expandableOptions, isRowSelected = _a.isRowSelected, isSummaryRow = _a.isSummaryRow, onRowSelectionChange = _a.onRowSelectionChange;
    var isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
    var treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
    var style = expandableOptions && isExpandCell ? { marginLeft: expandableOptions.treeDepth * 30 } : undefined;
    function getFormatterDependencies(row) {
        // convention based method to get corresponding Id or Name of any Name or Id property
        var getRowMetaData = column.getRowMetaData;
        if (getRowMetaData) {
            if (process.env.NODE_ENV === 'development') {
                console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of react-data-grid. Instead access row prop of formatter');
            }
            return getRowMetaData(row, column);
        }
    }
    function getFormatterProps() {
        return {
            value: rowData[column.key],
            column: column,
            rowIdx: rowIdx,
            row: rowData,
            isRowSelected: isRowSelected,
            onRowSelectionChange: onRowSelectionChange,
            dependentValues: getFormatterDependencies(rowData),
            isSummaryRow: isSummaryRow
        };
    }
    function getFormattedValue(formatter) {
        if (formatter === undefined) {
            return React.createElement(SimpleCellFormatter, { value: rowData[column.key] });
        }
        if (isValidElementType(formatter)) {
            return createElement(formatter, getFormatterProps());
        }
        if (isElement(formatter)) {
            return cloneElement(formatter, getFormatterProps());
        }
        return null;
    }
    function handleDeleteSubRow() {
        if (cellMetaData.onDeleteSubRow) {
            cellMetaData.onDeleteSubRow({
                idx: idx,
                rowIdx: rowIdx,
                rowData: rowData,
                expandArgs: expandableOptions
            });
        }
    }
    function handleCellExpand() {
        if (cellMetaData.onCellExpand) {
            cellMetaData.onCellExpand({ rowIdx: rowIdx, idx: idx, rowData: rowData, expandArgs: expandableOptions });
        }
    }
    return (React.createElement(React.Fragment, null,
        cellMetaData.getCellActions && (React.createElement(CellActions, { column: column, rowData: rowData, getCellActions: cellMetaData.getCellActions })),
        expandableOptions && expandableOptions.canExpand && (React.createElement(CellExpand, { expanded: expandableOptions.expanded, onCellExpand: handleCellExpand })),
        React.createElement("div", { className: "rdg-cell-value" },
            expandableOptions && treeDepth > 0 && isExpandCell && (React.createElement(ChildRowDeleteButton, { treeDepth: treeDepth, onDeleteSubRow: handleDeleteSubRow, isDeleteSubRowEnabled: !!cellMetaData.onDeleteSubRow })),
            React.createElement("div", { style: style }, getFormattedValue(column.formatter)))));
}
//# sourceMappingURL=CellContent.js.map