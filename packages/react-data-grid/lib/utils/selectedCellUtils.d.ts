/// <reference types="react" />
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn, Position, Range, Dimension, RowGetter } from '../common/types';
interface getSelectedDimensionsOpts<R> {
    selectedPosition: Position;
    columns: CalculatedColumn<R>[];
    rowHeight: number;
    scrollLeft: number;
}
export declare function getSelectedDimensions<R>({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: getSelectedDimensionsOpts<R>): Dimension;
interface getSelectedRangeDimensionsOpts<R> {
    selectedRange: Range;
    columns: CalculatedColumn<R>[];
    rowHeight: number;
}
export declare function getSelectedRangeDimensions<R>({ selectedRange: { topLeft, bottomRight }, columns, rowHeight }: getSelectedRangeDimensionsOpts<R>): Dimension;
interface getSelectedCellValueOpts<R> {
    selectedPosition: Position;
    columns: CalculatedColumn<R>[];
    rowGetter: RowGetter<R>;
}
export declare function getSelectedCellValue<R>({ selectedPosition, columns, rowGetter }: getSelectedCellValueOpts<R>): R[(keyof R & string) | (keyof R & number) | (keyof R & symbol)] | null;
interface isSelectedCellEditableOpts<R> {
    enableCellSelect: boolean;
    selectedPosition: Position;
    columns: CalculatedColumn<R>[];
    rowGetter: RowGetter<R>;
    onCheckCellIsEditable?(arg: {
        row: R;
        column: CalculatedColumn<R>;
    } & Position): boolean;
}
export declare function isSelectedCellEditable<R>({ enableCellSelect, selectedPosition, columns, rowGetter, onCheckCellIsEditable }: isSelectedCellEditableOpts<R>): boolean;
interface getNextSelectedCellPositionOpts<R> {
    cellNavigationMode: CellNavigationMode;
    columns: CalculatedColumn<R>[];
    rowsCount: number;
    nextPosition: Position;
}
export interface NextSelectedCellPosition extends Position {
    changeRowOrColumn: boolean;
}
export declare function getNextSelectedCellPosition<R>({ cellNavigationMode, columns, rowsCount, nextPosition }: getNextSelectedCellPositionOpts<R>): NextSelectedCellPosition;
interface canExitGridOpts<R> {
    cellNavigationMode: CellNavigationMode;
    columns: CalculatedColumn<R>[];
    rowsCount: number;
    selectedPosition: Position;
}
export declare function canExitGrid<R>(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: canExitGridOpts<R>): boolean;
export declare function selectedRangeIsSingleCell({ topLeft, bottomRight }: Range): boolean;
export {};
