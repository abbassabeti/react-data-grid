import React from 'react';
import { CellMetaData, IRowRendererProps, CalculatedColumn } from './common/types';
import EventBus from './EventBus';
interface Props<R> {
    height: number;
    columns: CalculatedColumn<R>[];
    row: unknown;
    cellRenderer?(): void;
    cellMetaData: CellMetaData<R>;
    isSelected?: boolean;
    idx: number;
    extraClasses?: string;
    forceUpdate?: boolean;
    subRowDetails?: unknown;
    isRowHovered?: boolean;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    columnGroupDisplayName: string;
    columnGroupName: string;
    isExpanded: boolean;
    treeDepth?: number;
    name: string;
    renderer?: React.ComponentType;
    eventBus: EventBus;
    renderBaseRow(p: IRowRendererProps<R>): React.ReactElement;
}
declare const _default: React.ForwardRefExoticComponent<Props<any> & React.RefAttributes<HTMLDivElement>>;
export default _default;
