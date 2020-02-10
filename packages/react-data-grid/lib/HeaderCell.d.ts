import React from 'react';
import { HeaderRowType } from './common/enums';
import { CalculatedColumn, HeaderRowProps } from './common/types';
export interface HeaderCellProps<R> {
    renderer?: React.ReactElement | React.ComponentType<HeaderRowProps<R>>;
    column: CalculatedColumn<R>;
    lastFrozenColumnIndex: number;
    rowType: HeaderRowType;
    height: number;
    onResize(column: CalculatedColumn<R>, width: number): void;
    onHeaderDrop?(): void;
    allRowsSelected: boolean;
    onAllRowsSelectionChange(checked: boolean): void;
    draggableHeaderCell?: React.ComponentType<{
        column: CalculatedColumn<R>;
        onHeaderDrop(): void;
    }>;
    className?: string;
}
export default class HeaderCell<R> extends React.Component<HeaderCellProps<R>> {
    private readonly cell;
    private onMouseDown;
    private onTouchStart;
    private onResize;
    private getWidthFromMouseEvent;
    getCell(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    setScrollLeft(scrollLeft: number): void;
    removeScroll(): void;
    render(): JSX.Element;
}
