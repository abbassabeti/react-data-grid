import { __read } from "tslib";
import React, { useState } from 'react';
export default function FilterableHeaderCell(_a) {
    var column = _a.column, onChange = _a.onChange;
    var _b = __read(useState(''), 2), filterTerm = _b[0], setFilterTerm = _b[1];
    function handleChange(event) {
        var value = event.target.value;
        setFilterTerm(value);
        if (onChange) {
            onChange({ filterTerm: value, column: column });
        }
    }
    return (React.createElement("div", { className: "rdg-filter-container" },
        React.createElement("input", { key: "header-filter-" + column.key, className: "rdg-filter", placeholder: "Search", value: filterTerm, onChange: handleChange })));
}
//# sourceMappingURL=FilterableHeaderCell.js.map