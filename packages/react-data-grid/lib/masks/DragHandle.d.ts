import React from 'react';
interface Props {
    onDragStart: React.DragEventHandler<HTMLDivElement>;
    onDragEnd: React.DragEventHandler<HTMLDivElement>;
    onDoubleClick: React.MouseEventHandler<HTMLDivElement>;
}
export default function DragHandle({ onDragStart, onDragEnd, onDoubleClick }: Props): JSX.Element;
export {};
