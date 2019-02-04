import Lang from '../../oop/lang';
import ButtonIcon from './button-icon.jsx';
import ButtonLinkEdit from './button-link-edit.jsx';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The LinkEditBrowse class provides functionality for creating and editing a link in a document,
 * and also allows to link to an existing file in DM.
 * Provides UI for creating, editing and removing a link.
 *
 * @class ButtonLinkEditBrowse
 */
class ButtonLinkEditBrowse extends React.Component {
	static propTypes = {
		/**
		 * The editor instance where the component is being used.
		 *
		 * @property {Object} editor
		 */
		editor: PropTypes.object.isRequired,
	};

	static key = 'linkEditBrowse';
	/**
	 *
	 * @inheritDoc
	 */
	constructor(props, context) {
		super(props, context);

		const link = new CKEDITOR.Link(
			this.props.editor.get('nativeEditor')
		).getFromSelection();

		const href = link ? link.getAttribute('href') : '';

		this.linkEditButtonRef = React.createRef();

		this.state = {
			element: link,
			linkHref: href,
		};
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<div className="ae-container-link-edit-browse">
				<ButtonLinkEdit ref={this.linkEditButtonRef} {...this.props} />
				<button
					aria-label="Browse"
					className="ae-button"
					onClick={this._browseClick}
					title="browse">
					<ButtonIcon editor={this.props.editor} symbol="folder" />
				</button>
			</div>
		);
	}

	/**
	 * Opens an item selector dialog.
	 *
	 * @protected
	 * @method _browseClick
	 */
	_browseClick = () => {
		const editor = this.props.editor.get('nativeEditor');
		const url = editor.config.documentBrowseLinkUrl;
		const browseLinkCallback = editor.config.documentBrowseLinkCallback;
		const linkTarget = this.linkEditButtonRef.current.state.linkTarget;
		const changeLinkCallback = selectedItem => {
			this._updateLink(selectedItem.value, linkTarget, selectedItem.href);
		};

		if (Lang.isFunction(browseLinkCallback)) {
			browseLinkCallback.apply(null, [editor, url, changeLinkCallback]);
		}
	};

	/**
	 * Updates the link in the editor element. If the element didn't exist previously, it will
	 * create a new <a> element with the href specified in the link input.
	 *
	 * @protected
	 * @method _updateLink
	 * @param {String} linkHref href value for the link
	 * @param {String} linkTarget target value for the link
	 * @param {String} linkTitle if the link is a title that points to a wiki page (only works for creole)
	 */
	_updateLink = (linkHref, linkTarget, linkTitle) => {
		const editor = this.props.editor.get('nativeEditor');
		const linkUtils = new CKEDITOR.Link(editor, {appendProtocol: false});
		const linkAttrs = {
			target: linkTarget,
		};
		const modifySelection = {advance: true};

		if (linkHref) {
			if (editor.plugins && editor.plugins.creole && !linkTitle) {
				linkHref = location.origin + linkHref;
			}

			if (this.state.element) {
				linkAttrs.href = linkHref;

				linkUtils.update(
					linkAttrs,
					this.state.element,
					modifySelection
				);
			} else {
				linkUtils.create(linkHref, linkAttrs, modifySelection);
			}

			editor.fire('actionPerformed', this);
		}
	}
}

export default ButtonLinkEditBrowse;
