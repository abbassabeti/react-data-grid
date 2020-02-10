import { __assign, __extends } from "tslib";
import classNames from 'classnames';
import React from 'react';
import Cell from './Cell';
import { isFrozen } from './utils/columnUtils';
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDragEnter = function (e) {
            // Prevent default to allow drop
            e.preventDefault();
            var _a = _this.props, idx = _a.idx, cellMetaData = _a.cellMetaData;
            cellMetaData.onDragEnter(idx);
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };
        _this.handleDrop = function (e) {
            // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
            // To bypass this, we need to capture and prevent the drop event.
            e.preventDefault();
        };
        return _this;
    }
    Row.prototype.getCells = function () {
        var _a = this.props, cellMetaData = _a.cellMetaData, colOverscanEndIdx = _a.colOverscanEndIdx, colOverscanStartIdx = _a.colOverscanStartIdx, columns = _a.columns, idx = _a.idx, isRowSelected = _a.isRowSelected, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, onRowSelectionChange = _a.onRowSelectionChange, row = _a.row, scrollLeft = _a.scrollLeft, isSummaryRow = _a.isSummaryRow;
        var Renderer = this.props.cellRenderer;
        var cellElements = [];
        for (var colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
            var column = columns[colIdx];
            var colIsFrozen = isFrozen(column);
            if (colIdx < colOverscanStartIdx && !colIsFrozen)
                continue;
            var key = column.key;
            cellElements.push(React.createElement(Renderer, { key: key, idx: colIdx, rowIdx: idx, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, cellMetaData: cellMetaData, rowData: row, expandableOptions: this.getExpandableOptions(key), scrollLeft: colIsFrozen && typeof scrollLeft === 'number' ? scrollLeft : undefined, isRowSelected: isRowSelected, onRowSelectionChange: onRowSelectionChange, isSummaryRow: isSummaryRow }));
        }
        return cellElements;
    };
    Row.prototype.getExpandableOptions = function (columnKey) {
        var subRowDetails = this.props.subRowDetails;
        if (!subRowDetails)
            return;
        var field = subRowDetails.field, expanded = subRowDetails.expanded, children = subRowDetails.children, treeDepth = subRowDetails.treeDepth;
        return {
            canExpand: field === columnKey && ((children && children.length > 0) || subRowDetails.group === true),
            field: field,
            expanded: expanded,
            children: children,
            treeDepth: treeDepth,
            subRowDetails: subRowDetails
        };
    };
    Row.prototype.render = function () {
        var _a = this.props, idx = _a.idx, isRowSelected = _a.isRowSelected, extraClasses = _a.extraClasses, isSummaryRow = _a.isSummaryRow;
        var className = classNames('rdg-row', "rdg-row-" + (idx % 2 === 0 ? 'even' : 'odd'), { 'rdg-row-selected': isRowSelected }, extraClasses);
        var events = !isSummaryRow && {
            onDragEnter: this.handleDragEnter,
            onDragOver: this.handleDragOver,
            onDrop: this.handleDrop
        };
        return (React.createElement("div", __assign({ className: className, style: { width: this.props.width, height: this.props.height } }, events), this.getCells()));
    };
    Row.displayName = 'Row';
    Row.defaultProps = {
        cellRenderer: Cell
    };
    return Row;
}(React.Component));
export default Row;
//# sourceMappingURL=Row.js.map