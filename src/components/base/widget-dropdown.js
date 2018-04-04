import ReactDOM from 'react-dom';
import Lang from '../../oop/lang.js';

/**
 * Provides functionality for managing different dropdowns inside a widget.
 *
 * @class WidgetDropdown
 */
export default WrappedComponent => class extends WrappedComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            dropdownTrigger: null,
            itemDropdown: null
        }
    }

    /**
     * Lifecycle. Invoked when a component is receiving new props.
     * This method is not called for the initial render.
     *
     * @instance
     * @memberof WidgetDropdown
     * @method componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {
        if (Lang.isFunction(super.componentWillReceiveProps)) {
            super.componentWillReceiveProps();
        }

        this.setState({
            dropdownTrigger: null,
            itemDropdown: null
        });
    }

    /**
     * Merges the provided object with two more properties:
     * - expanded - boolean flag which indicates if an widget should be rendered exclusively.
     * - toggleDropdown - function, which can be used by an widget in order to obtain exclusive state.
     *
     * @instance
     * @memberof WidgetDropdown
     * @method mergeDropdownProps
     * @param {Object} obj The properties container which should be merged with the properties, related
     *    to dropdown state.
     * @param {Object} itemKey They key of an React Widget which contains the dropdown.
     * @return {Object} The merged object.
     */
    mergeDropdownProps(obj, itemKey) {
        return CKEDITOR.tools.merge(obj, {
            expanded: this.state.itemDropdown === itemKey ? true : false,
            tabIndex: this.state.dropdownTrigger === itemKey ? 0 : -1,
            toggleDropdown: this.toggleDropdown.bind(this, itemKey)
        });
    }

    /**
     * Sets the active dropdown of the widget or discards the toggled item from the state.
     *
     * @instance
     * @memberof WidgetDropdown
     * @method toggleDropdown
     * @param {Object} itemDropdown The widget which requests to toggle its dropdown.
     * @param {Number} toggleDirection User movement direction when toggled via keyboard.
     */
    toggleDropdown(itemDropdown, toggleDirection) {
        this.setState({
            dropdownTrigger: itemDropdown,
            itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
        }, function() {
            if (!this.state.itemDropdown) {
                if (this.moveFocus) {
                    this.moveFocus(toggleDirection);
                } else {
                    ReactDOM.findDOMNode(this).focus();
                }
            }
        });
    }
};