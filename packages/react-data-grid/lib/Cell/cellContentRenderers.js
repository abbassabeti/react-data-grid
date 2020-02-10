import React from 'react';
import CellContent from './CellContent';
export function legacyCellContentRenderer(props) {
    return React.createElement(CellContent, props);
}
export function valueCellContentRenderer(props) {
    return props.rowData[props.column.key];
}
//# sourceMappingURL=cellContentRenderers.js.map