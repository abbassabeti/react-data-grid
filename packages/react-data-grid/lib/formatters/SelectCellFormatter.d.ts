/// <reference types="react" />
export interface SelectCellFormatterProps {
    value: boolean;
    onChange(value: boolean, isShiftClick: boolean): void;
}
export declare function SelectCellFormatter({ value, onChange }: SelectCellFormatterProps): JSX.Element;
