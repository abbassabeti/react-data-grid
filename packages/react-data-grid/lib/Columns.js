import React from 'react';
import { SelectCellFormatter } from './formatters';
// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var SelectColumn = {
    key: 'select-row',
    name: '',
    width: 60,
    filterable: false,
    frozen: true,
    headerRenderer: function (props) {
        return (React.createElement(SelectCellFormatter, { value: props.allRowsSelected, onChange: props.onAllRowsSelectionChange }));
    },
    cellContentRenderer: function (props) {
        return props.isSummaryRow ? null : (React.createElement(SelectCellFormatter, { value: props.isRowSelected, onChange: function (value, isShiftClick) { return props.onRowSelectionChange(props.rowIdx, props.rowData, value, isShiftClick); } }));
    }
};
//# sourceMappingURL=Columns.js.map