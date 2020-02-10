/// <reference types="react" />
import { CellContentRendererProps } from '../common/types';
export default function CellContent<R>({ idx, rowIdx, column, rowData, cellMetaData, expandableOptions, isRowSelected, isSummaryRow, onRowSelectionChange }: CellContentRendererProps<R>): JSX.Element;
