import React from 'react';
export default function DragHandle(_a) {
    var onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, onDoubleClick = _a.onDoubleClick;
    return (React.createElement("div", { className: "drag-handle", draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, onDoubleClick: onDoubleClick }));
}
//# sourceMappingURL=DragHandle.js.map