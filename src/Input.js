import React, { Component } from "react";
import PropTypes from "prop-types";
import { Demon } from "react-form-mobx";

class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        display: PropTypes.oneOf(["inline-block", "block"])
    };

    static defaultProps = {
        display: "block"
    };

    render() {
        const { errorText } = this.props;
        return (
            <Demon forwardedProps={this.props}>
                {({ display, label, ...other }, { isTouched, isInvalid, errorMessage }) => (
                    <div className="input" style={{ display }}>
                        <label>
                            <span className="label">{label}</span>
                            <input {...other} />
                            {isTouched && isInvalid && (
                                <span style={{ color: "red" }}>{errorText || errorMessage}</span>
                            )}
                        </label>
                    </div>
                )}
            </Demon>
        );
    }
}

Input.propTypes = {
    /*
     * Field name
     */
    name: PropTypes.string.isRequired,
    /*
     * Default value when value is empty
     */
    defaultValue: PropTypes.any,
    /*
     * Default checked, only work in checkable components (eg: Checkbox, Radio)
     */
    defaultChecked: PropTypes.any,
    /*
     * Error message if fail
     */
    errorText: PropTypes.string
    /*
     * Data format
     */,
    format: PropTypes.string,
    /*
     * Indicates whether field is required
     */
    required: PropTypes.bool,
    /*
     * Validate a value from a list of possible values
     */
    enum: PropTypes.array,
    /*
     * Validate from a regular expression
     */
    pattern: PropTypes.instanceOf(RegExp),
    /*
     * Validate a max length of the field
     */
    maxLength: PropTypes.number,
    /*
     * Validate a min length of the field
     */
    minLength: PropTypes.number,
    /*
     * Validate if the field is less than or exactly equal to "maximum"
     */
    maximum: PropTypes.number,
    /*
     * Validate if the field is less than (not equal to) "exclusiveMaximum"
     */
    exclusiveMaximum: PropTypes.number,
    /*
     * Validate if the field is greater than or exactly equal to "minimum"
     */
    minimum: PropTypes.number,
    /*
     * Validate if the field is greater than or exactly equal to "exclusiveMinimum"
     */
    exclusiveMinimum: PropTypes.number,
    /*
     * Defines a validator function, should throw error if invalid
     */
    validation: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.func), PropTypes.func]),
    /*
     * Defines a filter function will be called when providing a new value to form
     */
    inputFilter: PropTypes.func,
    /*
     * Defines a filter function will be called when getting output value from form
     */
    outputFilter: PropTypes.func,
    /*
     * Indicates whether submit empty value or not
     */
    withEmpty: PropTypes.oneOf(["auto", true, false]) // name: PropTypes.string.isRequired,
};

export default Input;
