import React from 'react';
import { CellNavigationMode, DEFINE_SORT } from './common/enums';
import { AddFilterEvent, CalculatedColumn, CellActionButton, CellCopyPasteEvent, CheckCellIsEditableEvent, Column, CellContentRenderer, GridRowsUpdatedEvent, Position, RowsContainerProps, RowExpandToggleEvent, RowGetter, SelectedRange, SubRowDetails, SubRowOptions, IRowRendererProps, ScrollPosition } from './common/types';
export interface DataGridProps<R, K extends keyof R> {
    /** An array of objects representing each column on the grid */
    columns: Column<R>[];
    /** The minimum width of the grid in pixels */
    minWidth?: number;
    /** The height of the header row in pixels */
    headerRowHeight?: number;
    /** The height of the header filter row in pixels */
    headerFiltersHeight?: number;
    /** Toggles whether filters row is displayed or not */
    enableHeaderFilters?: boolean;
    cellRangeSelection?: {
        onStart(selectedRange: SelectedRange): void;
        onUpdate?(selectedRange: SelectedRange): void;
        onComplete?(selectedRange: SelectedRange): void;
    };
    /** Minimum column width in pixels */
    minColumnWidth?: number;
    /** Function called whenever row is clicked */
    onRowClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
    /** Function called whenever row is double clicked */
    onRowDoubleClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
    onAddFilter?(event: AddFilterEvent<R>): void;
    /** Function called whenever grid is sorted*/
    onGridSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
    /** Function called whenever keyboard key is released */
    onGridKeyUp?(event: React.KeyboardEvent<HTMLDivElement>): void;
    /** Function called whenever keyboard key is pressed down */
    onGridKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
    selectedRows?: Set<R[K]>;
    /** Function called whenever row selection is changed */
    onSelectedRowsChange?(selectedRows: Set<R[K]>): void;
    /**
     * Callback called whenever row data is updated
     * When editing is enabled, this callback will be called for the following scenarios
     * 1. Using the supplied editor of the column. The default editor is the SimpleTextEditor.
     * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
     * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
     * 4. Update all cells under a given cell by double clicking the cell's fill handle.
     */
    onGridRowsUpdated?<E extends GridRowsUpdatedEvent<R>>(event: E): void;
    /** Called when a column is resized */
    onColumnResize?(idx: number, width: number): void;
    /** Grid Props */
    /** The primary key property of each row */
    rowKey?: K;
    /** The height of each row in pixels */
    rowHeight?: number;
    defaultCellContentRenderer?: CellContentRenderer<R>;
    rowRenderer?: React.ReactElement | React.ComponentType<IRowRendererProps<R>>;
    rowGroupRenderer?: React.ComponentType;
    /** A function called for each rendered row that should return a plain key/value pair object */
    rowGetter: RowGetter<R>;
    /** The number of rows to be rendered */
    rowsCount: number;
    /** The minimum height of the grid in pixels */
    minHeight?: number;
    /** When set, grid will scroll to this row index */
    scrollToRowIndex?: number;
    /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
    contextMenu?: React.ReactElement;
    /** Used to toggle whether cells can be selected or not */
    enableCellSelect?: boolean;
    /** Toggles whether cells should be autofocused */
    enableCellAutoFocus?: boolean;
    cellNavigationMode?: CellNavigationMode;
    /** The node where the editor portal should mount. */
    editorPortalTarget?: Element;
    /** The key of the column which is currently being sorted */
    sortColumn?: keyof R;
    /** The direction to sort the sortColumn*/
    sortDirection?: DEFINE_SORT;
    /** Called when the grid is scrolled */
    onScroll?(scrollPosition: ScrollPosition): void;
    /** Component used to render a draggable header cell */
    draggableHeaderCell?: React.ComponentType<{
        column: CalculatedColumn<R>;
        onHeaderDrop(): void;
    }>;
    getValidFilterValues?(columnKey: keyof R): unknown;
    RowsContainer?: React.ComponentType<RowsContainerProps>;
    emptyRowsView?: React.ComponentType<{}>;
    onHeaderDrop?(): void;
    getSubRowDetails?(row: R): SubRowDetails;
    /** CellMetaData */
    getCellActions?(column: CalculatedColumn<R>, rowData: R): CellActionButton[] | undefined;
    /** Called whenever a sub row is deleted from the grid */
    onDeleteSubRow?(options: SubRowOptions<R>): void;
    /** Called whenever a sub row is added to the grid */
    onAddSubRow?(): void;
    /** Function called whenever a cell has been expanded */
    onCellExpand?(options: SubRowOptions<R>): void;
    onRowExpandToggle?(event: RowExpandToggleEvent): void;
    /** InteractionMasksMetaData */
    /** Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead*/
    onCellCopyPaste?(event: CellCopyPasteEvent<R>): void;
    /** Function called whenever a cell is selected */
    onCellSelected?(position: Position): void;
    /** Function called whenever a cell is deselected */
    onCellDeSelected?(position: Position): void;
    /** called before cell is set active, returns a boolean to determine whether cell is editable */
    onCheckCellIsEditable?(event: CheckCellIsEditableEvent<R>): boolean;
    /**
     * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
     * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
     */
    summaryRows?: R[];
    /** Control how big render row batches will be. */
    renderBatchSize?: number;
}
export interface DataGridHandle {
    scrollToColumn(colIdx: number): void;
    selectCell(position: Position, openEditor?: boolean): void;
    openCellEditor(rowIdx: number, colIdx: number): void;
}
declare const _default: <R, K extends keyof R>(props: DataGridProps<R, K> & {
    ref?: ((instance: DataGridHandle | null) => void) | React.RefObject<DataGridHandle> | null | undefined;
}) => JSX.Element;
export default _default;
