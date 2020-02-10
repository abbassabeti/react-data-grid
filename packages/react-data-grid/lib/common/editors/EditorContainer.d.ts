import React, { KeyboardEvent } from 'react';
import { CalculatedColumn, Editor, CommitEvent, Dimension, Omit } from '../types';
import { InteractionMasksProps, InteractionMasksState } from '../../masks/InteractionMasks';
declare type SharedInteractionMasksProps<R, K extends keyof R> = Pick<InteractionMasksProps<R, K>, 'scrollLeft' | 'scrollTop'>;
declare type SharedInteractionMasksState = Pick<InteractionMasksState, 'firstEditorKeyPress'>;
declare type ValueType<R> = R[keyof R];
export interface Props<R, K extends keyof R> extends SharedInteractionMasksProps<R, K>, SharedInteractionMasksState, Omit<Dimension, 'zIndex'> {
    rowIdx: number;
    rowData: R;
    value: ValueType<R>;
    column: CalculatedColumn<R>;
    onGridKeyDown?(e: KeyboardEvent): void;
    onCommit(e: CommitEvent<R>): void;
    onCommitCancel(): void;
}
interface State {
    isInvalid: boolean;
}
export default class EditorContainer<R, K extends keyof R> extends React.Component<Props<R, K>, State> {
    static displayName: string;
    changeCommitted: boolean;
    changeCanceled: boolean;
    private readonly editor;
    readonly state: Readonly<State>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props<R, K>): void;
    componentWillUnmount(): void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    createEditor(): JSX.Element;
    onPressEnter: () => void;
    onPressTab: () => void;
    onPressEscape: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowUpOrDown: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowLeft: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowRight: (e: React.KeyboardEvent<Element>) => void;
    editorHasResults: () => boolean;
    editorIsSelectOpen: () => boolean;
    getRowMetaData(): unknown;
    getEditor: () => Editor<never>;
    getInputNode: () => Element | Text | null | undefined;
    getInitialValue(): ValueType<R> | string;
    commit: (args?: {
        key?: string | undefined;
    }) => void;
    commitCancel: () => void;
    isNewValueValid: (value: unknown) => boolean;
    isCaretAtBeginningOfInput: () => boolean;
    isCaretAtEndOfInput: () => boolean;
    handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    renderStatusIcon(): false | JSX.Element;
    render(): JSX.Element;
}
export {};
