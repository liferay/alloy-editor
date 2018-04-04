import ButtonTargetList from './button-target-list.jsx';
import React from 'react';

/**
 * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
 * in the document.
 *
 * @class ButtonLinkTargetEdit
 */
class ButtonLinkTargetEdit extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonLinkTargetEdit
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var handleLinkTargetChange = this.props.handleLinkTargetChange;
        var allowedLinkTargets = this.props.allowedTargets;

        return (
            <div className="ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown" tabIndex="0">
                <button aria-expanded={this.props.expanded} aria-label={this.props.selectedTarget} className="ae-toolbar-element" onClick={this.props.toggleDropdown.bind(this)} role="combobox" tabIndex={this.props.tabIndex} title={this.props.selectedTarget}>
                    <div className="ae-container">
                        <span className="ae-container-dropdown-selected-item">{this.props.selectedTarget}</span>
                        <span className="ae-icon-arrow"></span>
                    </div>
                </button>
                {this.props.expanded && (
                    <ButtonTargetList editor={this.props.editor} onDismiss={this.props.toggleDropdown} allowedLinkTargets={allowedLinkTargets} handleLinkTargetChange={handleLinkTargetChange} selectedTarget={this.props.selectedTarget}/>
                )}
            </div>
        );
    }

    /**
     * Lifecycle. Invoked before rendering when new props or state are being received.
     * This method is not called for the initial render or when forceUpdate is used.
     *
     * @instance
     * @memberof ButtonLinkTargetEdit
     * @method  shouldComponentUpdate
     * @return {Boolean} Returns false when the transition to the new props and state will not
     * require a component update.
     */
    shouldComponentUpdate(nextProps) {
        return nextProps.expanded !== this.props.expanded || nextProps.selectedTarget !== this.props.selectedTarget;
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default linkTargetEdit
 * @memberof ButtonLinkTargetEdit
 * @property {String} key
 * @static
 */
ButtonLinkTargetEdit.key = 'linkTargetEdit';

export default ButtonLinkTargetEdit;
