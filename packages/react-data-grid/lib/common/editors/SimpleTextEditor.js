import { __extends } from "tslib";
import React from 'react';
var SimpleTextEditor = /** @class */ (function (_super) {
    __extends(SimpleTextEditor, _super);
    function SimpleTextEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.input = React.createRef();
        return _this;
    }
    SimpleTextEditor.prototype.getInputNode = function () {
        return this.input.current;
    };
    SimpleTextEditor.prototype.getValue = function () {
        var _a;
        return _a = {},
            _a[this.props.column.key] = this.input.current.value,
            _a;
    };
    SimpleTextEditor.prototype.render = function () {
        return (React.createElement("input", { className: "rdg-text-editor", ref: this.input, defaultValue: this.props.value, onBlur: this.props.onBlur }));
    };
    return SimpleTextEditor;
}(React.Component));
export default SimpleTextEditor;
//# sourceMappingURL=SimpleTextEditor.js.map