/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonIcon from './button-icon.jsx';

const MAX_TWEET_LENGTH = 280;

/**
 * The ButtonTwitter class provides functionality for creating a link which
 * allows people to tweet part of the content in the editor.
 *
 * @class ButtonTwitter
 * @uses ButtonStateClasses
 */
class ButtonTwitter extends React.Component {
	static contextType = EditorContext;

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default twitter
	 * @memberof ButtonTwitter
	 * @property {String} key
	 * @static
	 */
	static key = 'twitter';

	/**
	 * Creates or removes the twitter link on the selection.
	 *
	 * @instance
	 * @memberof ButtonTwitter
	 * @method handleClick
	 */
	handleClick = () => {
		const editor = this.context.editor.get('nativeEditor');

		const linkUtils = new CKEDITOR.Link(editor);

		if (this.isActive()) {
			linkUtils.remove(linkUtils.getFromSelection());
		} else {
			linkUtils.create(this._getHref(), {
				class: 'ae-twitter-link',
				target: '_blank',
			});
		}

		editor.fire('actionPerformed', this);
	};

	/**
	 * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
	 *
	 * @instance
	 * @memberof ButtonTwitter
	 * @method isActive
	 * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
	 */
	isActive() {
		const link = new CKEDITOR.Link(
			this.context.editor.get('nativeEditor')
		).getFromSelection();

		return (
			link &&
			link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1
		);
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTwitter
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.twitter}
				className={cssClass}
				data-type="button-twitter"
				onClick={this.handleClick}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.twitter}>
				<ButtonIcon symbol="twitter" />
			</button>
		);
	}

	/**
	 * Generates the appropriate twitter url based on the selected text and the configuration
	 * options received via props.
	 *
	 * @instance
	 * @memberof ButtonTwitter
	 * @method _getHref
	 * @protected
	 * @return {String} A valid twitter url with the selected text and given configuration.
	 */
	_getHref() {
		const nativeEditor = this.context.editor.get('nativeEditor');
		const selectedText = nativeEditor
			.getSelection()
			.getSelectedText()
			.substring(0, MAX_TWEET_LENGTH);
		const url = this.props.url;
		const via = this.props.via;
		let twitterHref =
			'https://twitter.com/intent/tweet?text=' + selectedText;

		if (url) {
			twitterHref += '&url=' + url;
		}

		if (via) {
			twitterHref += '&via=' + via;
		}

		return twitterHref;
	}
}

export default ButtonStateClasses(ButtonTwitter);
