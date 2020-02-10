import React from 'react';
import { CellContentRendererProps } from '../common/types';
export declare function legacyCellContentRenderer<R>(props: CellContentRendererProps<R>): React.FunctionComponentElement<Pick<import("../common/types").CellRendererProps<R>, "column" | "idx" | "rowIdx" | "rowData" | "cellMetaData" | "expandableOptions" | "isRowSelected" | "onRowSelectionChange" | "isSummaryRow">>;
export declare function valueCellContentRenderer<R>(props: CellContentRendererProps<R>): R[(keyof R & string) | (keyof R & number) | (keyof R & symbol)];
