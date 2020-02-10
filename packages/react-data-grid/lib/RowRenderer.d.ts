/// <reference types="react" />
import Row from './Row';
import { CanvasProps } from './Canvas';
declare type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>, 'cellMetaData' | 'columnMetrics' | 'eventBus' | 'getSubRowDetails' | 'onRowSelectionChange' | 'rowGroupRenderer' | 'rowHeight' | 'rowKey' | 'rowRenderer' | 'selectedRows'>;
export interface RowRendererProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
    idx: number;
    rowData: R;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    scrollLeft: number | undefined;
    setRowRef(row: Row<R> | null, idx: number): void;
}
declare const _default: <R, K extends keyof R>(props: RowRendererProps<R, K>) => JSX.Element;
export default _default;
