import { Position } from './common/types';
interface EventMap {
    SELECT_CELL(cell: Position, openEditor?: boolean): void;
    SELECT_START(selectedPosition: Position): void;
    SELECT_UPDATE(cellPosition: Position, isFromKeyboard?: boolean, callback?: () => void): void;
    SELECT_END(): void;
    DRAG_ENTER(overRowIdx: number): void;
    SCROLL_TO_COLUMN(idx: number): void;
}
declare type EventName = keyof EventMap;
export default class EventBus {
    readonly subscribers: Map<"SELECT_CELL" | "SELECT_START" | "SELECT_UPDATE" | "SELECT_END" | "DRAG_ENTER" | "SCROLL_TO_COLUMN", Set<((cell: Position, openEditor?: boolean | undefined) => void) | ((selectedPosition: Position) => void) | ((cellPosition: Position, isFromKeyboard?: boolean | undefined, callback?: (() => void) | undefined) => void) | (() => void) | ((overRowIdx: number) => void) | ((idx: number) => void)>>;
    subscribe<T extends EventName>(type: T, handler: EventMap[T]): () => void;
    dispatch<T extends EventName>(type: T, ...args: Parameters<EventMap[T]>): void;
}
export {};
