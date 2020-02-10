import React from 'react';
import { CellRendererProps } from './common/types';
export interface CellProps<R> extends CellRendererProps<R> {
    children?: React.ReactNode;
    className?: string;
}
declare const _default: <R>(props: CellProps<R>) => JSX.Element;
export default _default;
