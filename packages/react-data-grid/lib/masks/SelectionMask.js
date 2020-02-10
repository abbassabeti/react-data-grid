import { __assign } from "tslib";
import React, { forwardRef } from 'react';
import CellMask from './CellMask';
export default forwardRef(function SelectionMask(props, ref) {
    return (React.createElement(CellMask, __assign({}, props, { className: "rdg-selected", ref: ref, tabIndex: 0 })));
});
//# sourceMappingURL=SelectionMask.js.map