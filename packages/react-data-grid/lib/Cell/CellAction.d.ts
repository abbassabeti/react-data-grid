/// <reference types="react" />
import { CellActionButton } from '../common/types';
export interface CellActionProps extends CellActionButton {
    isFirst: boolean;
}
export default function CellAction({ icon, actions, callback, isFirst }: CellActionProps): JSX.Element;
