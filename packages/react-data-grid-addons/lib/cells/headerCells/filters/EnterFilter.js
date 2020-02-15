import { __extends } from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { isEmptyArray } from '../../../utils';
var EnterFilter = /** @class */ (function (_super) {
    __extends(EnterFilter, _super);
    function EnterFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.getOptions = _this.getOptions.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.filterValues = _this.filterValues.bind(_this);
        _this.state = { options: _this.getOptions(), rawValue: '', placeholder: 'Search' };
        return _this;
    }
    // FIXME
    // eslint-disable-next-line react/no-deprecated
    EnterFilter.prototype.componentWillReceiveProps = function (newProps) {
        this.setState({ options: this.getOptions(newProps) });
    };
    EnterFilter.prototype.getOptions = function (newProps) {
        var props = newProps || this.props;
        var options = props.getValidFilterValues(props.column.key);
        options = options.map(function (o) {
            if (typeof o === 'string') {
                return { value: o, label: o };
            }
            return o;
        });
        return options;
    };
    EnterFilter.prototype.columnValueContainsSearchTerms = function (columnValue, filterTermValue) {
        if (columnValue !== undefined && filterTermValue !== undefined) {
            var strColumnValue = columnValue.toString();
            var strFilterTermValue = filterTermValue.toString();
            var checkValueIndex = strColumnValue.trim().toLowerCase().indexOf(strFilterTermValue.trim().toLowerCase());
            return checkValueIndex !== -1 && (checkValueIndex !== 0 || strColumnValue === strFilterTermValue);
        }
        return false;
    };
    EnterFilter.prototype.filterValues = function (row, columnFilter, columnKey) {
        var _this = this;
        var include = true;
        if (columnFilter === null) {
            include = false;
        }
        else if (columnFilter.filterTerm && !isEmptyArray(columnFilter.filterTerm)) {
            if (columnFilter.filterTerm.length) {
                include = columnFilter.filterTerm.some(function (filterTerm) {
                    return _this.columnValueContainsSearchTerms(row[columnKey], filterTerm.value) === true;
                });
            }
            else {
                include = this.columnValueContainsSearchTerms(row[columnKey], columnFilter.filterTerm.value);
            }
        }
        return include;
    };
    EnterFilter.prototype.handleChange = function (value) {
        var filters = value;
        this.setState({ filters: filters });
        this.props.onChange({ filterTerm: filters, column: this.props.column, rawValue: value, filterValues: this.filterValues });
    };
    EnterFilter.prototype.render = function () {
        return (React.createElement(Select, { autosize: false, name: "filter-" + this.props.column.key, options: this.state.options, placeholder: this.state.placeholder, onChange: this.handleChange, onInputKeyDown: function (event) { console.log('event is', event); }, escapeClearsValue: true, multi: this.props.multiSelection !== undefined && this.props.multiSelection !== null ? this.props.multiSelection : true, value: this.state.filters }));
    };
    EnterFilter.propTypes = {
        onChange: PropTypes.func.isRequired,
        // column: PropTypes.shape(shapes.Column),
        getValidFilterValues: PropTypes.func,
        multiSelection: PropTypes.bool
    };
    return EnterFilter;
}(React.Component));
export default EnterFilter;
//# sourceMappingURL=EnterFilter.js.map