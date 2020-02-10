/// <reference types="react" />
import { HeaderRowType, DEFINE_SORT } from '../../enums';
import { CalculatedColumn } from '../../types';
export interface Props<R> {
    column: CalculatedColumn<R>;
    rowType: HeaderRowType;
    onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
    sortDirection: DEFINE_SORT;
    sortDescendingFirst: boolean;
    allRowsSelected: boolean;
    onAllRowsSelectionChange(checked: boolean): void;
}
export default function SortableHeaderCell<R>(props: Props<R>): JSX.Element;
