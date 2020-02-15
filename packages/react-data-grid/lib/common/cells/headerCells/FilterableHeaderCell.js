import { __read } from "tslib";
import React, { useState } from 'react';
export default function FilterableHeaderCell(_a) {
    var column = _a.column, onChange = _a.onChange, onEnter = _a.onEnter;
    var _b = __read(useState(''), 2), filterTerm = _b[0], setFilterTerm = _b[1];
    function handleChange(event) {
        var value = event.target.value;
        setFilterTerm(value);
        if (onChange) {
            onChange({ filterTerm: value, column: column });
        }
    }
    function handleKeyUp(event) {
        if (event.keyCode == 13 || event.which == 13) {
            if (onEnter) {
                onEnter({ filterTerm: filterTerm, column: column });
            }
        }
    }
    return (React.createElement("div", { className: "rdg-filter-container" },
        React.createElement("input", { key: "header-filter-" + column.key, className: "rdg-filter", placeholder: "Search", value: filterTerm, onChange: handleChange, onKeyUp: handleKeyUp })));
}
//# sourceMappingURL=FilterableHeaderCell.js.map