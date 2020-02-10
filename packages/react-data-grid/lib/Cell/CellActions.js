import { __assign } from "tslib";
import React from 'react';
import CellAction from './CellAction';
export default function CellActions(_a) {
    var getCellActions = _a.getCellActions, column = _a.column, rowData = _a.rowData;
    var cellActionButtons = getCellActions(column, rowData);
    if (cellActionButtons && cellActionButtons.length > 0) {
        var actionButtons = cellActionButtons.map(function (action, index) {
            return React.createElement(CellAction, __assign({ key: index, isFirst: index === 0 }, action));
        });
        return React.createElement(React.Fragment, null, actionButtons);
    }
    return null;
}
//# sourceMappingURL=CellActions.js.map