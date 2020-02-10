import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import HeaderRow from './HeaderRow';
import { getScrollbarSize, isPositionStickySupported } from './utils';
export default forwardRef(function Header(props, ref) {
    var headerRef = useRef(null);
    var rowRef = useRef(null);
    var filterRowRef = useRef(null);
    useImperativeHandle(ref, function () { return ({
        setScrollLeft: function (scrollLeft) {
            headerRef.current.scrollLeft = scrollLeft;
            if (isPositionStickySupported())
                return;
            rowRef.current.setScrollLeft(scrollLeft);
            if (filterRowRef.current) {
                filterRowRef.current.setScrollLeft(scrollLeft);
            }
        }
    }); }, []);
    function handleAllRowsSelectionChange(checked) {
        if (!props.onSelectedRowsChange)
            return;
        var newSelectedRows = new Set();
        if (checked) {
            for (var i = 0; i < props.rowsCount; i++) {
                newSelectedRows.add(props.rowGetter(i)[props.rowKey]);
            }
        }
        props.onSelectedRowsChange(newSelectedRows);
    }
    function getHeaderRow(row, ref) {
        return (React.createElement(HeaderRow, { key: row.rowType, ref: ref, rowType: row.rowType, onColumnResize: props.onColumnResize, width: props.columnMetrics.totalColumnWidth + getScrollbarSize(), height: row.height, columns: props.columnMetrics.columns, lastFrozenColumnIndex: props.columnMetrics.lastFrozenColumnIndex, draggableHeaderCell: props.draggableHeaderCell, filterable: row.filterable, onFilterChange: row.onFilterChange, onHeaderDrop: props.onHeaderDrop, allRowsSelected: props.allRowsSelected, onAllRowsSelectionChange: handleAllRowsSelectionChange, sortColumn: props.sortColumn, sortDirection: props.sortDirection, onSort: props.onSort, getValidFilterValues: props.getValidFilterValues }));
    }
    function getHeaderRows() {
        var setRef = !isPositionStickySupported();
        var headerRows = props.headerRows;
        var rows = [getHeaderRow(headerRows[0], setRef ? rowRef : undefined)];
        if (headerRows[1]) {
            rows.push(getHeaderRow(headerRows[1], setRef ? filterRowRef : undefined));
        }
        return rows;
    }
    // Set the cell selection to -1 x -1 when clicking on the header
    function onHeaderClick() {
        props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
    }
    return (React.createElement("div", { ref: headerRef, className: "rdg-header", onClick: onHeaderClick }, getHeaderRows()));
});
//# sourceMappingURL=Header.js.map