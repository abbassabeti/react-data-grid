import React from 'react';
export function SelectCellFormatter(_a) {
    var value = _a.value, onChange = _a.onChange;
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (React.createElement("label", { className: "rdg-checkbox-label" },
        React.createElement("input", { type: "checkbox", className: "rdg-checkbox-input", onChange: handleChange, checked: value }),
        React.createElement("div", { className: "rdg-checkbox" })));
}
//# sourceMappingURL=SelectCellFormatter.js.map