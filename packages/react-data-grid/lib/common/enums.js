export var CellExpand;
(function (CellExpand) {
    CellExpand["DOWN_TRIANGLE"] = "\u25BC";
    CellExpand["RIGHT_TRIANGLE"] = "\u25B6";
})(CellExpand || (CellExpand = {}));
export var CellNavigationMode;
(function (CellNavigationMode) {
    CellNavigationMode["NONE"] = "none";
    CellNavigationMode["CHANGE_ROW"] = "changeRow";
    CellNavigationMode["LOOP_OVER_ROW"] = "loopOverRow";
})(CellNavigationMode || (CellNavigationMode = {}));
export var DragItemTypes;
(function (DragItemTypes) {
    DragItemTypes["Column"] = "column";
})(DragItemTypes || (DragItemTypes = {}));
export var EventTypes;
(function (EventTypes) {
    EventTypes["SELECT_CELL"] = "SELECT_CELL";
    EventTypes["SELECT_START"] = "SELECT_START";
    EventTypes["SELECT_UPDATE"] = "SELECT_UPDATE";
    EventTypes["SELECT_END"] = "SELECT_END";
    EventTypes["DRAG_ENTER"] = "DRAG_ENTER";
    EventTypes["SCROLL_TO_COLUMN"] = "SCROLL_TO_COLUMN";
})(EventTypes || (EventTypes = {}));
export var HeaderRowType;
(function (HeaderRowType) {
    HeaderRowType["HEADER"] = "header";
    HeaderRowType["FILTER"] = "filter";
})(HeaderRowType || (HeaderRowType = {}));
export var HeaderCellType;
(function (HeaderCellType) {
    HeaderCellType["SORTABLE"] = "SORTABLE";
    HeaderCellType["FILTERABLE"] = "FILTERABLE";
    HeaderCellType["NONE"] = "NONE";
    HeaderCellType["CHECKBOX"] = "CHECKBOX";
})(HeaderCellType || (HeaderCellType = {}));
export var UpdateActions;
(function (UpdateActions) {
    UpdateActions["CELL_UPDATE"] = "CELL_UPDATE";
    UpdateActions["COLUMN_FILL"] = "COLUMN_FILL";
    UpdateActions["COPY_PASTE"] = "COPY_PASTE";
    UpdateActions["CELL_DRAG"] = "CELL_DRAG";
})(UpdateActions || (UpdateActions = {}));
export var DEFINE_SORT;
(function (DEFINE_SORT) {
    DEFINE_SORT["ASC"] = "ASC";
    DEFINE_SORT["DESC"] = "DESC";
    DEFINE_SORT["NONE"] = "NONE";
})(DEFINE_SORT || (DEFINE_SORT = {}));
export var Z_INDEXES;
(function (Z_INDEXES) {
    /**
     * CellMasks should render in front of the cells.
     * Unfrozen cells do not have a z-index specifed.
     */
    Z_INDEXES[Z_INDEXES["CELL_MASK"] = 1] = "CELL_MASK";
    /**
     * EditorContainer is rendered ouside the grid and it should have a z-index
     * equal or greater than the z-index of the frozen cells.
     * Frozen cells have a zIndex value of 2.
     */
    Z_INDEXES[Z_INDEXES["EDITOR_CONTAINER"] = 2] = "EDITOR_CONTAINER";
    /** Frozen cells have a z-index value of 2 so FROZEN_CELL_MASK should have a greater z-index. */
    Z_INDEXES[Z_INDEXES["FROZEN_CELL_MASK"] = 3] = "FROZEN_CELL_MASK";
})(Z_INDEXES || (Z_INDEXES = {}));
//# sourceMappingURL=enums.js.map