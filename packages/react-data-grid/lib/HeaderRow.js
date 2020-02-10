import { __extends, __values } from "tslib";
import React from 'react';
import HeaderCell from './HeaderCell';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './common/cells/headerCells/FilterableHeaderCell';
import { isFrozen } from './utils/columnUtils';
import { isPositionStickySupported } from './utils';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
var HeaderRow = /** @class */ (function (_super) {
    __extends(HeaderRow, _super);
    function HeaderRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cells = new Map();
        return _this;
    }
    HeaderRow.prototype.getHeaderCellType = function (column) {
        if (column.filterable && this.props.filterable) {
            return HeaderCellType.FILTERABLE;
        }
        if (column.sortable && this.props.rowType !== HeaderRowType.FILTER) {
            return HeaderCellType.SORTABLE;
        }
        return HeaderCellType.NONE;
    };
    HeaderRow.prototype.getFilterableHeaderCell = function (column) {
        var FilterRenderer = column.filterRenderer || FilterableHeaderCell;
        return (React.createElement(FilterRenderer, { column: column, onChange: this.props.onFilterChange, getValidFilterValues: this.props.getValidFilterValues }));
    };
    HeaderRow.prototype.getSortableHeaderCell = function (column) {
        var sortDirection = this.props.sortColumn === column.key && this.props.sortDirection || DEFINE_SORT.NONE;
        var sortDescendingFirst = column.sortDescendingFirst || false;
        return (React.createElement(SortableHeaderCell, { column: column, rowType: this.props.rowType, onSort: this.props.onSort, sortDirection: sortDirection, sortDescendingFirst: sortDescendingFirst, allRowsSelected: this.props.allRowsSelected, onAllRowsSelectionChange: this.props.onAllRowsSelectionChange }));
    };
    HeaderRow.prototype.getHeaderRenderer = function (column) {
        if (column.headerRenderer && !column.sortable && !this.props.filterable) {
            return column.headerRenderer;
        }
        var headerCellType = this.getHeaderCellType(column);
        switch (headerCellType) {
            case HeaderCellType.SORTABLE:
                return this.getSortableHeaderCell(column);
            case HeaderCellType.FILTERABLE:
                return this.getFilterableHeaderCell(column);
            default:
                return undefined;
        }
    };
    HeaderRow.prototype.getCells = function () {
        var e_1, _a;
        var _this = this;
        var cellElements = [];
        var _b = this.props, columns = _b.columns, lastFrozenColumnIndex = _b.lastFrozenColumnIndex, rowType = _b.rowType;
        var setRef = !isPositionStickySupported();
        var _loop_1 = function (column) {
            var key = column.key;
            var renderer = key === 'select-row' && rowType === HeaderRowType.FILTER ? React.createElement("div", null) : this_1.getHeaderRenderer(column);
            cellElements.push(React.createElement(HeaderCell, { key: key, ref: setRef
                    ? function (node) { return node ? _this.cells.set(key, node) : _this.cells.delete(key); }
                    : undefined, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, rowType: rowType, height: this_1.props.height, renderer: renderer, onResize: this_1.props.onColumnResize, onHeaderDrop: this_1.props.onHeaderDrop, allRowsSelected: this_1.props.allRowsSelected, onAllRowsSelectionChange: this_1.props.onAllRowsSelectionChange, draggableHeaderCell: this_1.props.draggableHeaderCell }));
        };
        var this_1 = this;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                _loop_1(column);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cellElements;
    };
    HeaderRow.prototype.setScrollLeft = function (scrollLeft) {
        var _this = this;
        this.props.columns.forEach(function (column) {
            var key = column.key;
            if (!_this.cells.has(key))
                return;
            var cell = _this.cells.get(key);
            if (isFrozen(column)) {
                cell.setScrollLeft(scrollLeft);
            }
            else {
                cell.removeScroll();
            }
        });
    };
    HeaderRow.prototype.render = function () {
        return (React.createElement("div", { className: "rdg-header-row", style: { width: this.props.width, height: this.props.height, lineHeight: this.props.height + "px" } }, this.getCells()));
    };
    HeaderRow.displayName = 'HeaderRow';
    return HeaderRow;
}(React.Component));
export default HeaderRow;
//# sourceMappingURL=HeaderRow.js.map