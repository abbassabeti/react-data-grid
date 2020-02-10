import React from 'react';
import { CellMetaData, ColumnMetrics, InteractionMasksMetaData, ScrollPosition } from './common/types';
import EventBus from './EventBus';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>, 'rowGetter' | 'rowsCount' | 'rowRenderer' | 'rowGroupRenderer' | 'scrollToRowIndex' | 'contextMenu' | 'RowsContainer' | 'getSubRowDetails' | 'selectedRows' | 'summaryRows'> & Required<Pick<DataGridProps<R, K>, 'rowKey' | 'enableCellSelect' | 'rowHeight' | 'cellNavigationMode' | 'enableCellAutoFocus' | 'editorPortalTarget' | 'renderBatchSize'>>;
export interface CanvasProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
    columnMetrics: ColumnMetrics<R>;
    cellMetaData: CellMetaData<R>;
    height: number;
    eventBus: EventBus;
    interactionMasksMetaData: InteractionMasksMetaData<R>;
    onScroll(position: ScrollPosition): void;
    onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
    onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
    onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
}
export default function Canvas<R, K extends keyof R>({ cellMetaData, cellNavigationMode, columnMetrics, contextMenu, editorPortalTarget, enableCellAutoFocus, enableCellSelect, eventBus, getSubRowDetails, height, interactionMasksMetaData, onCanvasKeydown, onCanvasKeyup, onRowSelectionChange, onScroll, renderBatchSize, rowGetter, rowGroupRenderer, rowHeight, rowKey, rowRenderer, RowsContainer, rowsCount, scrollToRowIndex, selectedRows, summaryRows }: CanvasProps<R, K>): JSX.Element;
export {};
