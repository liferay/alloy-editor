(function() {
	'use strict';

	if (CKEDITOR.plugins.get('ae_autolist')) {
		return;
	}

	var KEY_BACK = 8;

	var KEY_SPACE = 32;

	var DEFAULT_CONFIG = [
		{
			regex: /^\*$/,
			type: 'bulletedlist'
		},
		{
			regex: /^1\.$/,
			type: 'numberedlist'
		}
	];

	/**
     * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like list.
     *
     * @class CKEDITOR.plugins.ae_autolist
     * @constructor
     */
	CKEDITOR.plugins.add(
		'ae_autolist', {

			/**
			* Initialization of the plugin, part of CKeditor plugin lifecycle.
			* The function registers the `keydown` event on the edition area.
			*
			* @method init
			* @param {Object} editor The current editor instance
			*/
			init: function(editor) {
				editor.once('contentDom', function() {
					var editable = editor.editable();

					editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
						editor: editor
					});

				}.bind(this));
			},

			/**
			* Create list with different types: bulletedlist or numberedlist
			*
			* @protectec
			* @method _createList
			* @param {Object} listConfig Object that contains bullet, text and type for creating the list
			*/
			_createList: function(listConfig) {
				var editor = listConfig.editor;

				var range = editor.getSelection().getRanges()[0];

				range.endContainer.setText(listConfig.text);
				editor.execCommand(listConfig.type);

				this._subscribeToKeyDownEvent(editor, listConfig.bullet);
			},

			/**
             * Listens to the `Space` key events to check if the last word
             * introduced by the user should be replaced by a list (OL or UL)
             *
             * @protected
             * @method _onKeyPress
             * @param {Event} event Eventobject
             */
            _onKeyDown: function(event) {
            	var nativeEvent = event.data.$;

				if (nativeEvent.keyCode === KEY_SPACE) {
                    var listConfig = this._shouldAutolist(event.listenerData.editor);

					if (listConfig) {
						event.data.preventDefault();
						this._createList(listConfig);
					}
				}
            },

            /**
            * Listens to the 'Key Back', to check if after list is created, key back is clicked
        	* to undo the list
        	*
        	* @protected
        	* @method _onKeyDownCheckToDelete
        	* @param {Event} event Eventobject
            */
            _onKeyDownCheckToDelete: function(event) {
				var editor = event.listenerData.editor;

                var nativeEvent = event.data.$;

                var editable = editor.editable();

                editable.removeListener('keydown', this._onKeyDownCheckToDelete);

                if (nativeEvent.keyCode === KEY_BACK) {
					editor.execCommand('undo');
					editor.insertHtml(event.listenerData.bullet + '&nbsp;');
					event.data.preventDefault();
				}
            },

            /**
            * Check current line to find match with MATCHES object to create OL or UL
            *
            * @protected
            * @method _checkLine
            * @param {editor} Editor object
            */
            _shouldAutolist: function(editor) {
                var configRegex = editor.config.autolist || DEFAULT_CONFIG;

                var range = editor.getSelection().getRanges()[0];

                var textContainer = range.endContainer.getText();

                var bullet = textContainer.substring(0, range.startOffset);

                var text = textContainer.substring(range.startOffset, textContainer.length);

                var index = 0;

                var regexLen = configRegex.length;

                var autolistCfg = null;

                while (!autolistCfg && regexLen > index) {
                    var regexItem = configRegex[index];

                    if (regexItem.regex.test(bullet)) {
                        autolistCfg = {
                            bullet: bullet,
                            editor: editor,
                            text: text,
                            type: regexItem.type
                        };
                    }

                    index++;
                }

                return autolistCfg;
            },

            /**
            * Add attachlistener after autolist is created.
            *
            * @protected
            * @method _subscribeToKeyDownEvent
            * @param {Editor} editor Editor object
            * @param {String} bullet Bullet to add at beginning of container when key back is clicked
            */
            _subscribeToKeyDownEvent: function(editor, bullet) {
				var editable = editor.editable();

				editable.attachListener(editable, 'keydown', this._onKeyDownCheckToDelete, this, {
					editor: editor,
					bullet: bullet
				}, 1);
			}
        }
	);
}());