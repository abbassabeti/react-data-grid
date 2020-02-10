import { Column, CalculatedColumn, ColumnMetrics, CellContentRenderer } from '../common/types';
interface Metrics<R> {
    columns: Column<R>[];
    columnWidths: Map<keyof R, number>;
    minColumnWidth: number;
    viewportWidth: number;
    defaultCellContentRenderer: CellContentRenderer<R>;
}
export declare function getColumnMetrics<R>(metrics: Metrics<R>): ColumnMetrics<R>;
export declare function canEdit<R>(column: CalculatedColumn<R>, rowData: R, enableCellSelect?: boolean): boolean;
export declare function isFrozen<R>(column: Column<R> | CalculatedColumn<R>): boolean;
export declare function getColumnScrollPosition<R>(columns: CalculatedColumn<R>[], idx: number, currentScrollLeft: number, currentClientWidth: number): number;
export {};
