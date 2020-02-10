/// <reference types="react" />
import { CellMetaData, CellContentRendererProps } from '../common/types';
declare type CellActionsProps<R> = Pick<CellContentRendererProps<R>, 'column' | 'rowData'> & Pick<Required<CellMetaData<R>>, 'getCellActions'>;
export default function CellActions<R>({ getCellActions, column, rowData }: CellActionsProps<R>): JSX.Element | null;
export {};
