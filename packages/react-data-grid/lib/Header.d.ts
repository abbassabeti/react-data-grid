import React from 'react';
import { CalculatedColumn, HeaderRowData, ColumnMetrics, CellMetaData } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>, 'draggableHeaderCell' | 'getValidFilterValues' | 'rowGetter' | 'rowsCount' | 'onHeaderDrop' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection'> & Required<Pick<DataGridProps<R, K>, 'rowKey'>>;
export interface HeaderProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
    allRowsSelected: boolean;
    columnMetrics: ColumnMetrics<R>;
    headerRows: [HeaderRowData<R>, HeaderRowData<R> | undefined];
    cellMetaData: CellMetaData<R>;
    onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
    onColumnResize(column: CalculatedColumn<R>, width: number): void;
}
export interface HeaderHandle {
    setScrollLeft(scrollLeft: number): void;
}
declare const _default: <R, K extends keyof R>(props: HeaderProps<R, K> & {
    ref?: ((instance: HeaderHandle | null) => void) | React.RefObject<HeaderHandle> | null | undefined;
}) => JSX.Element;
export default _default;
