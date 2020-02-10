import { __read } from "tslib";
import React, { useState } from 'react';
import classNames from 'classnames';
export default function CellAction(_a) {
    var icon = _a.icon, actions = _a.actions, callback = _a.callback, isFirst = _a.isFirst;
    var _b = __read(useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var cellActionClasses = classNames('rdg-cell-action', {
        'rdg-cell-action-last': isFirst
    });
    var actionButtonClasses = classNames('rdg-cell-action-button', {
        'rdg-cell-action-button-toggled': isOpen
    });
    function onActionIconClick() {
        if (typeof callback === 'function') {
            callback();
        }
        if (actions && actions.length > 0) {
            setIsOpen(!isOpen);
        }
    }
    return (React.createElement("div", { className: cellActionClasses, onMouseLeave: function () { return setIsOpen(false); } },
        React.createElement("div", { className: actionButtonClasses, onClick: onActionIconClick }, icon),
        isOpen && actions && actions.length && (React.createElement("div", { className: "rdg-cell-action-menu" }, actions.map(function (action, index) { return React.createElement("span", { key: index, onClick: action.callback }, action.text); })))));
}
//# sourceMappingURL=CellAction.js.map