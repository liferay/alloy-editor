(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonOrderedList
     */
    var ButtonOrderedList = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default ol
             */
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'numberedlist',
                style: {
                    element: 'ol'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.numberedlist} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-ol" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.numberedlist}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill:currentColor; " width="17" height="17"><path d="M5.495 142.993c0-6.444 3.401-9.847 9.847-9.847h17.365V79.798c0-4.834.179-9.847.179-9.847h-.359s-1.79 3.939-3.938 5.729l-1.611 1.432c-4.655 4.298-9.489 4.117-13.786-.537l-4.654-5.013c-4.475-4.654-4.297-9.486.358-13.962l22.2-20.767C34.854 33.432 38.256 32 43.268 32h10.205c6.444 0 9.846 3.4 9.846 9.846v91.301h17.544c6.444 0 9.847 3.402 9.847 9.847v7.162c0 6.443-3.402 9.846-9.847 9.846H15.341c-6.445 0-9.847-3.402-9.847-9.846v-7.163zm-1.776 163.45c0-46.482 54.405-54.757 54.405-72.891 0-8.803-7.044-12.501-13.558-12.501-5.634 0-10.387 2.993-13.381 6.163-4.402 4.225-8.98 5.986-13.733 2.112l-6.866-5.458c-4.93-3.874-6.163-8.275-2.465-13.029C14.284 202.74 26.432 192 47.384 192c20.599 0 42.96 11.796 42.96 38.559 0 39.263-50.883 46.834-52.467 63.031h44.72c6.339 0 9.684 3.346 9.684 9.684v7.044c0 6.337-3.345 9.683-9.684 9.683H14.108c-5.986 0-10.388-3.346-10.388-9.683v-3.875zm2.875 149.436l4.754-7.747c3.345-5.457 7.746-5.81 13.204-2.464 4.754 2.64 10.917 5.281 17.959 5.281 11.445 0 17.959-5.634 17.959-12.501 0-9.859-9.86-13.909-23.417-13.909h-.704c-5.634 0-8.451-1.761-10.916-6.691l-.881-1.761c-2.112-4.049-1.233-8.451 2.289-12.5l11.445-13.91c5.986-7.219 10.917-11.797 10.917-11.797v-.352s-4.049.88-11.973.88H16.805c-6.338 0-9.683-3.344-9.683-9.683v-7.043c0-6.339 3.345-9.683 9.683-9.683h60.039c6.338 0 9.684 3.344 9.684 9.507v2.817c0 4.93-1.233 8.276-4.402 11.973l-21.128 24.298c18.663 4.049 30.459 18.838 30.459 36.445C91.458 458.52 76.316 480 44.8 480c-17.078 0-29.051-5.986-36.094-10.739-4.93-3.522-5.281-8.276-2.112-13.382zM512 108V84a6 6 0 0 0-6-6H134a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6zm0 160v-24a6 6 0 0 0-6-6H134a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6zm0 160v-24a6 6 0 0 0-6-6H134a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6z"/></svg></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
}());