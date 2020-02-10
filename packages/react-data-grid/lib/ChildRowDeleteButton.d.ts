/// <reference types="react" />
export interface ChildRowDeleteButtonProps {
    treeDepth: number;
    onDeleteSubRow(): void;
    isDeleteSubRowEnabled: boolean;
}
export default function ChildRowDeleteButton({ treeDepth, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps): JSX.Element;
