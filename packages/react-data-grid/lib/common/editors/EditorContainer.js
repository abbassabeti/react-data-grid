import { __assign, __extends } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';
import { Clear } from '@material-ui/icons';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
var EditorContainer = /** @class */ (function (_super) {
    __extends(EditorContainer, _super);
    function EditorContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeCommitted = false;
        _this.changeCanceled = false;
        _this.editor = React.createRef();
        _this.state = { isInvalid: false };
        _this.onKeyDown = function (e) {
            switch (e.key) {
                case 'Enter':
                    _this.onPressEnter();
                    break;
                case 'Tab':
                    _this.onPressTab();
                    break;
                case 'Escape':
                    _this.onPressEscape(e);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    _this.onPressArrowUpOrDown(e);
                    break;
                case 'ArrowLeft':
                    _this.onPressArrowLeft(e);
                    break;
                case 'ArrowRight':
                    _this.onPressArrowRight(e);
                    break;
                default:
                    break;
            }
            if (_this.props.onGridKeyDown) {
                _this.props.onGridKeyDown(e);
            }
        };
        _this.onPressEnter = function () {
            _this.commit({ key: 'Enter' });
        };
        _this.onPressTab = function () {
            _this.commit({ key: 'Tab' });
        };
        _this.onPressEscape = function (e) {
            if (!_this.editorIsSelectOpen()) {
                _this.commitCancel();
            }
            else {
                // prevent event from bubbling if editor has results to select
                e.stopPropagation();
            }
        };
        _this.onPressArrowUpOrDown = function (e) {
            if (_this.editorHasResults()) {
                // dont want to propogate as that then moves us round the grid
                e.stopPropagation();
            }
            else {
                _this.commit(e);
            }
        };
        _this.onPressArrowLeft = function (e) {
            // prevent event propogation. this disables left cell navigation
            if (!_this.isCaretAtBeginningOfInput()) {
                e.stopPropagation();
            }
            else {
                _this.commit(e);
            }
        };
        _this.onPressArrowRight = function (e) {
            // prevent event propogation. this disables right cell navigation
            if (!_this.isCaretAtEndOfInput()) {
                e.stopPropagation();
            }
            else {
                _this.commit(e);
            }
        };
        _this.editorHasResults = function () {
            var hasResults = _this.getEditor().hasResults;
            return hasResults ? hasResults() : false;
        };
        _this.editorIsSelectOpen = function () {
            var isSelectOpen = _this.getEditor().isSelectOpen;
            return isSelectOpen ? isSelectOpen() : false;
        };
        _this.getEditor = function () {
            return _this.editor.current;
        };
        _this.getInputNode = function () {
            return _this.getEditor().getInputNode();
        };
        _this.commit = function (args) {
            if (args === void 0) { args = {}; }
            var onCommit = _this.props.onCommit;
            var updated = _this.getEditor().getValue();
            if (_this.isNewValueValid(updated)) {
                _this.changeCommitted = true;
                var cellKey = _this.props.column.key;
                onCommit({ cellKey: cellKey, rowIdx: _this.props.rowIdx, updated: updated, key: args.key });
            }
        };
        _this.commitCancel = function () {
            _this.changeCanceled = true;
            _this.props.onCommitCancel();
        };
        _this.isNewValueValid = function (value) {
            var editor = _this.getEditor();
            if (editor.validate) {
                var isValid = editor.validate(value);
                _this.setState({ isInvalid: !isValid });
                return isValid;
            }
            return true;
        };
        _this.isCaretAtBeginningOfInput = function () {
            var inputNode = _this.getInputNode();
            return inputNode instanceof HTMLInputElement
                && inputNode.selectionEnd === 0;
        };
        _this.isCaretAtEndOfInput = function () {
            var inputNode = _this.getInputNode();
            return inputNode instanceof HTMLInputElement
                && inputNode.selectionStart === inputNode.value.length;
        };
        _this.handleRightClick = function (e) {
            e.stopPropagation();
        };
        return _this;
    }
    EditorContainer.prototype.componentDidMount = function () {
        var inputNode = this.getInputNode();
        if (inputNode instanceof HTMLElement) {
            inputNode.focus();
        }
        if (inputNode instanceof HTMLInputElement) {
            inputNode.select();
        }
    };
    EditorContainer.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.scrollLeft !== this.props.scrollLeft || prevProps.scrollTop !== this.props.scrollTop) {
            this.commitCancel();
        }
    };
    EditorContainer.prototype.componentWillUnmount = function () {
        if (!this.changeCommitted && !this.changeCanceled) {
            this.commit({ key: 'Enter' });
        }
    };
    EditorContainer.prototype.createEditor = function () {
        var editorProps = {
            ref: this.editor,
            column: this.props.column,
            value: this.getInitialValue(),
            rowMetaData: this.getRowMetaData(),
            rowData: this.props.rowData,
            height: this.props.height,
            onCommit: this.commit,
            onCommitCancel: this.commitCancel,
            onBlur: this.commit,
            onOverrideKeyDown: this.onKeyDown
        };
        var CustomEditor = this.props.column.editor;
        // return custom column editor or SimpleEditor if none specified
        if (isElement(CustomEditor)) {
            return React.cloneElement(CustomEditor, editorProps);
        }
        if (isValidElementType(CustomEditor)) {
            return React.createElement(CustomEditor, __assign({}, editorProps));
        }
        return (React.createElement(SimpleTextEditor, { ref: this.editor, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit }));
    };
    EditorContainer.prototype.getRowMetaData = function () {
        // clone row data so editor cannot actually change this
        // convention based method to get corresponding Id or Name of any Name or Id property
        if (this.props.column.getRowMetaData) {
            return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
        }
    };
    EditorContainer.prototype.getInitialValue = function () {
        var _a = this.props, key = _a.firstEditorKeyPress, value = _a.value;
        if (key === 'Delete' || key === 'Backspace') {
            return '';
        }
        if (key === 'Enter') {
            return value;
        }
        return key || value;
    };
    EditorContainer.prototype.renderStatusIcon = function () {
        return this.state.isInvalid
            && React.createElement(Clear, { className: "form-control-feedback" });
    };
    EditorContainer.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, left = _a.left, top = _a.top;
        var className = classNames('rdg-editor-container', {
            'has-error': this.state.isInvalid
        });
        return (React.createElement(ClickOutside, { onClickOutside: this.commit },
            React.createElement("div", { className: className, style: { height: height, width: width, left: left, top: top }, onKeyDown: this.onKeyDown, onContextMenu: this.handleRightClick },
                this.createEditor(),
                this.renderStatusIcon())));
    };
    EditorContainer.displayName = 'EditorContainer';
    return EditorContainer;
}(React.Component));
export default EditorContainer;
//# sourceMappingURL=EditorContainer.js.map