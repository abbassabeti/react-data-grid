import React from 'react';
import { CellExpand } from '../common/enums';
export default function CellExpander(_a) {
    var expanded = _a.expanded, onCellExpand = _a.onCellExpand;
    function handleCellExpand(e) {
        e.stopPropagation();
        onCellExpand();
    }
    return (React.createElement("div", { className: "rdg-cell-expand" },
        React.createElement("span", { onClick: handleCellExpand }, expanded ? CellExpand.DOWN_TRIANGLE : CellExpand.RIGHT_TRIANGLE)));
}
//# sourceMappingURL=CellExpander.js.map