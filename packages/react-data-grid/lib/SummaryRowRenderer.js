import React, { memo } from 'react';
import Row from './Row';
import { getScrollbarSize } from './utils';
var noop = function () { };
function RowRenderer(_a) {
    var cellMetaData = _a.cellMetaData, colOverscanEndIdx = _a.colOverscanEndIdx, colOverscanStartIdx = _a.colOverscanStartIdx, columnMetrics = _a.columnMetrics, idx = _a.idx, rowData = _a.rowData, rowHeight = _a.rowHeight, scrollLeft = _a.scrollLeft;
    return (React.createElement(Row, { idx: idx, row: rowData, width: columnMetrics.totalColumnWidth + getScrollbarSize(), height: rowHeight, columns: columnMetrics.columns, isRowSelected: false, onRowSelectionChange: noop, cellMetaData: cellMetaData, colOverscanStartIdx: colOverscanStartIdx, colOverscanEndIdx: colOverscanEndIdx, lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex, scrollLeft: scrollLeft, isSummaryRow: true }));
}
export default memo(RowRenderer);
//# sourceMappingURL=SummaryRowRenderer.js.map