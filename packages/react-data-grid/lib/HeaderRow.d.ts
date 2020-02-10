import React from 'react';
import { HeaderRowType, HeaderCellType } from './common/enums';
import { CalculatedColumn, AddFilterEvent } from './common/types';
import { HeaderProps } from './Header';
declare type SharedHeaderProps<R, K extends keyof R> = Pick<HeaderProps<R, K>, 'draggableHeaderCell' | 'onHeaderDrop' | 'allRowsSelected' | 'sortColumn' | 'sortDirection' | 'onSort' | 'getValidFilterValues'>;
export interface HeaderRowProps<R, K extends keyof R> extends SharedHeaderProps<R, K> {
    width: number;
    height: number;
    columns: CalculatedColumn<R>[];
    lastFrozenColumnIndex: number;
    onColumnResize(column: CalculatedColumn<R>, width: number): void;
    onAllRowsSelectionChange(checked: boolean): void;
    filterable?: boolean;
    onFilterChange?(args: AddFilterEvent<R>): void;
    rowType: HeaderRowType;
}
export default class HeaderRow<R, K extends keyof R> extends React.Component<HeaderRowProps<R, K>> {
    static displayName: string;
    private readonly cells;
    getHeaderCellType(column: CalculatedColumn<R>): HeaderCellType;
    getFilterableHeaderCell(column: CalculatedColumn<R>): JSX.Element;
    getSortableHeaderCell(column: CalculatedColumn<R>): JSX.Element;
    getHeaderRenderer(column: CalculatedColumn<R>): JSX.Element | React.ComponentClass<import("./common/types").HeaderRowProps<R>, any> | React.FunctionComponent<import("./common/types").HeaderRowProps<R>> | undefined;
    getCells(): JSX.Element[];
    setScrollLeft(scrollLeft: number): void;
    render(): JSX.Element;
}
export {};
