/**
 * ButtonCfgProps is a mixin that provides a style prop and some methods to apply the resulting
 * style and checking if it is present in a given path or selection.
 *
 * @class ButtonCfgProps
 */
export default WrappedComponent =>
	class extends WrappedComponent {
		/**
		 * Merges the properties, passed to the current component with user's configuration
		 * via `buttonCfg` property.
		 *
		 * @instance
		 * @memberof ButtonCfgProps
		 * @method mergeButtonCfgProps
		 * @param {Object} props The properties to be merged with the provided configuration for this
		 * button. If not passed, the user configuration will be merged with `this.props`
		 * @return {Object} The merged properties
		 */
		mergeButtonCfgProps(props) {
			props = props || this.props;

			var nativeEditor = this.props.editor.get('nativeEditor');
			var buttonCfg = nativeEditor.config.buttonCfg || {};
			var result = CKEDITOR.tools.merge(props, buttonCfg['linkEdit']);

			return result;
		}
	};
