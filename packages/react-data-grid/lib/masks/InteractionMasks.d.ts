import React from 'react';
import { DraggedPosition } from './DragMask';
import { NextSelectedCellPosition } from '../utils/selectedCellUtils';
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn, Position, SelectedRange, Dimension, InteractionMasksMetaData, CommitEvent, ColumnMetrics } from '../common/types';
import { CanvasProps } from '../Canvas';
export declare enum KeyCodes {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Escape = 27,
    Delete = 46,
    c = 67,
    v = 86
}
interface NavAction {
    getNext(current: Position): Position;
    isCellAtBoundary(cell: Position): boolean;
    onHitBoundary(next: Position): void;
}
declare type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>, 'rowGetter' | 'rowsCount' | 'rowHeight' | 'enableCellSelect' | 'enableCellAutoFocus' | 'cellNavigationMode' | 'eventBus' | 'contextMenu' | 'editorPortalTarget'> & Pick<ColumnMetrics<R>, 'columns'>;
export interface InteractionMasksProps<R, K extends keyof R> extends SharedCanvasProps<R, K>, InteractionMasksMetaData<R> {
    onHitTopBoundary(position: Position): void;
    onHitBottomBoundary(position: Position): void;
    onHitLeftBoundary(position: Position): void;
    onHitRightBoundary(position: Position): void;
    height: number;
    scrollLeft: number;
    scrollTop: number;
    getRowColumns(rowIdx: number): CalculatedColumn<R>[];
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
}
export interface InteractionMasksState {
    selectedPosition: Position;
    selectedRange: SelectedRange;
    copiedPosition: Position & {
        value: unknown;
    } | null;
    draggedPosition: DraggedPosition | null;
    editorPosition: {
        top: number;
        left: number;
    } | null;
    isEditorEnabled: boolean;
    firstEditorKeyPress: string | null;
}
export default class InteractionMasks<R, K extends keyof R> extends React.Component<InteractionMasksProps<R, K>, InteractionMasksState> {
    static displayName: string;
    readonly state: Readonly<InteractionMasksState>;
    private readonly selectionMask;
    private unsubscribeEventHandlers;
    componentDidUpdate(prevProps: InteractionMasksProps<R, K>, prevState: InteractionMasksState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getEditorPosition(): {
        left: number;
        top: number;
    } | null;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    isSelectedCellEditable(): boolean;
    openEditor: (event?: React.KeyboardEvent<HTMLDivElement> | undefined) => void;
    closeEditor(): void;
    onPressKeyWithCtrl({ keyCode }: React.KeyboardEvent<HTMLDivElement>): void;
    onFocus: () => void;
    onPressTab(e: React.KeyboardEvent<HTMLDivElement>): void;
    onPressEscape(): void;
    copyPasteEnabled(): boolean;
    handleCopy(value: unknown): void;
    handleCancelCopy(): void;
    handlePaste(): void;
    isKeyboardNavigationEvent(e: React.KeyboardEvent<HTMLDivElement>): boolean;
    getKeyNavActionFromEvent(e: React.KeyboardEvent<HTMLDivElement>): NavAction | null;
    changeCellFromEvent(e: React.KeyboardEvent<HTMLDivElement>): void;
    changeCellFromKeyAction(e: React.KeyboardEvent<HTMLDivElement>, cellNavigationMode: CellNavigationMode): void;
    changeSelectedRangeFromArrowKeyAction(e: React.KeyboardEvent<HTMLDivElement>): void;
    getNextSelectedCellPositionForKeyNavAction(keyNavAction: NavAction, currentPosition: Position, cellNavigationMode: CellNavigationMode): NextSelectedCellPosition;
    checkIsAtGridBoundary(keyNavAction: NavAction, next: NextSelectedCellPosition): void;
    isCellWithinBounds({ idx, rowIdx }: Position): boolean;
    isGridSelected(): boolean;
    isFocused(): boolean;
    isFocusedOnBody(): boolean;
    focus: () => void;
    selectFirstCell(): void;
    selectCell: (cell: Position, openEditor?: boolean | undefined) => void;
    createSingleCellSelectedRange(cellPosition: Position, isDragging: boolean): SelectedRange;
    onSelectCellRangeStarted: (selectedPosition: Position) => void;
    onSelectCellRangeUpdated: (cellPosition: Position, isFromKeyboard?: boolean | undefined, callback?: (() => void) | undefined) => void;
    onSelectCellRangeEnded: () => void;
    isDragEnabled(): boolean;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragEnter: (overRowIdx: number) => void;
    handleDragEnd: () => void;
    onDragHandleDoubleClick: () => void;
    onCommit: (args: CommitEvent<R, never>) => void;
    onCommitCancel: () => void;
    getRowTop(rowIdx: number): number;
    getSelectedDimensions: (selectedPosition: Position, useGridColumns?: boolean) => Dimension;
    renderSingleCellSelectView(): false | JSX.Element;
    renderCellRangeSelectView(): JSX.Element;
    render(): JSX.Element;
}
export {};
