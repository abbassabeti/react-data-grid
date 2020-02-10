import React from 'react';
import { IRowRendererProps } from './common/types';
export default class Row<R> extends React.Component<IRowRendererProps<R>> {
    static displayName: string;
    static defaultProps: {
        cellRenderer: <R_1>(props: import("./Cell").CellProps<R_1>) => JSX.Element;
    };
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    getCells(): JSX.Element[];
    getExpandableOptions(columnKey: keyof R): {
        canExpand: boolean;
        field: string;
        expanded: boolean;
        children: unknown[];
        treeDepth: number;
        subRowDetails: import("./common/types").SubRowDetails<unknown>;
    } | undefined;
    render(): JSX.Element;
}
