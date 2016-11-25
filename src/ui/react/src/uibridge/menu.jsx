(function() {
    'use strict';

    /* istanbul ignore if */
    if(CKEDITOR.plugins.get('ae_menubridge')) {
        return;
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor Menu plugin. It takes over the
     * responsibility of adding, removing and retrieving menu groups and items
     * - editor.addMenuGroup(name, order)
     * - editor.addMenuItem(name, definition)
     * - editor.addMenuItems(definitions)
     * - editor.getMenuItem(name)
     * - editor.removeMenuItem(name)
     *
     * @class CKEDITOR.plugins.ae_menubridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_menubridge', {
        /**
         * Set the add handler for UI_BUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        init: function(editor) {
        	// Do nothing if the real menu plugin is present
        	if (CKEDITOR.plugins.get('menu')) {
        		return;
        	}

			var groups = [];
			var groupsOrder = editor._.menuGroups = {};
			var menuItems = editor._.menuItems = {};

			for (var i = 0; i < groups.length; i++) {
				groupsOrder[groups[i]] = i + 1;
			}

			/**
			 * Registers an item group to the editor context menu in order to make it
			 * possible to associate it with menu items later.
			 *
			 * @param {String} name Specify a group name.
			 * @param {Number} [order=100] Define the display sequence of this group
			 * inside the menu. A smaller value gets displayed first.
			 * @member CKEDITOR.editor
			 */
			editor.addMenuGroup = function(name, order) {
				groupsOrder[name] = order || 100;
			};

			/**
			 * Adds an item from the specified definition to the editor context menu.
			 *
			 * @method
			 * @param {String} name The menu item name.
			 * @param {Object} definition The menu item definition.
			 * @member CKEDITOR.editor
			 */
			editor.addMenuItem = function(name, definition) {
				if (groupsOrder[definition.group]) {
					menuItems[name] = {
						name: name,
						definition: definition
					};
				}
			};

			/**
			 * Adds one or more items from the specified definition object to the editor context menu.
			 *
			 * @method
			 * @param {Object} definitions Object where keys are used as itemName and corresponding values as definition for a {@link #addMenuItem} call.
			 * @member CKEDITOR.editor
			 */
			editor.addMenuItems = function(definitions) {
				for (var itemName in definitions) {
					this.addMenuItem(itemName, definitions[itemName]);
				}
			};

			/**
			 * Retrieves a particular menu item definition from the editor context menu.
			 *
			 * @method
			 * @param {String} name The name of the desired menu item.
			 * @returns {Object}
			 * @member CKEDITOR.editor
			 */
			editor.getMenuItem = function(name) {
				return menuItems[name];
			};

			/**
			 * Removes a particular menu item added before from the editor context menu.
			 *
			 * @method
			 * @param {String} name The name of the desired menu item.
			 * @member CKEDITOR.editor
			 */
			editor.removeMenuItem = function(name) {
				delete menuItems[name];
			};
        }
    });
}());