/// <reference types="react" />
export interface CellExpanderProps {
    expanded: boolean;
    onCellExpand(): void;
}
export default function CellExpander({ expanded, onCellExpand }: CellExpanderProps): JSX.Element;
