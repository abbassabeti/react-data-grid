import React from 'react';
import { RemoveCircle } from '@material-ui/icons';
export default function ChildRowDeleteButton(_a) {
    var treeDepth = _a.treeDepth, onDeleteSubRow = _a.onDeleteSubRow, isDeleteSubRowEnabled = _a.isDeleteSubRowEnabled;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rdg-child-row-action-cross" }),
        isDeleteSubRowEnabled && (React.createElement("div", { className: "rdg-child-row-btn", style: { left: treeDepth * 15 }, onClick: onDeleteSubRow },
            React.createElement(RemoveCircle, null)))));
}
//# sourceMappingURL=ChildRowDeleteButton.js.map