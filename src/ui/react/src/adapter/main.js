(function() {
    'use strict';

    /**
     * AlloyEditor static object.
     *
     * @class AlloyEditor
     * @type {Object}
     */
    window.AlloyEditor = {
        /**
         * Creates an instance of AlloyEditor.
         *
         * @method editable
         * @static
         * @param {String|Node} node The Node ID or HTMl node, which AlloyEditor should use as an editable area.
         * @param {Object} config Configuration attributes for the current instance of AlloyEditor.
         * @return {Object} An instance of {{#crossLink "Core"}}{{/crossLink}}
         */
        editable: function(node, config) {
            config = config || {};

            config.srcNode = node;

            return new AlloyEditor.Core(config);
        },

        /**
         * Detects and load the corresponding language file if AlloyEditor language strings are not already present.
         * The function fires a {{#crossLink "AlloyEditor/languageResourcesLoaded:event"}}{{/crossLink}} event
         *
         * @method loadLanguageResources
         * @static
         * @param {Function} callback Optional callback to be called when AlloyEditor loads the language resource.
         */
        loadLanguageResources: function(callback) {
            if (AlloyEditor.Lang.isFunction(callback)) {
                if (AlloyEditor.Strings) {
                    setTimeout(callback, 0);
                } else {
                    AlloyEditor.once('languageResourcesLoaded', callback);
                }
            }

            if (!AlloyEditor._langResourceRequested) {
                AlloyEditor._langResourceRequested = true;

                var languages = ['af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-au', 'en-ca', 'en-gb', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca', 'fr', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'km', 'ko', 'ku', 'lt', 'lv', 'mk', 'mn', 'ms', 'nb', 'nl', 'no', 'pl', 'pt-br', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr-latn', 'sr', 'sv', 'th', 'tr', 'tt', 'ug', 'uk', 'vi', 'zh-cn', 'zh'];

                var userLanguage = navigator.language || navigator.userLanguage || 'en';

                var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
                var lang = parts[1];
                var locale = parts[2];

                if (languages[lang + '-' + locale]) {
                    lang = lang + '-' + locale;
                } else if (!languages.indexOf(lang)) {
                    lang = 'en';
                }

                CKEDITOR.scriptLoader.load(CKEDITOR.getUrl('lang/alloy-editor/' + lang + '.js'), function(loaded) {
                    if (loaded) {
                        AlloyEditor.fire('languageResourcesLoaded');
                    }
                }, this);
            }
        },

        /**
         * And object, containing all currently registered buttons in AlloyEditor.
         *
         * @property Buttons
         * @type {Object}
         * @static
         */
        Buttons: {},

        /**
         * And object, containing all currently registered toolbars in AlloyEditor.
         *
         * @property Toolbars
         * @type {Object}
         * @static
         */
        Toolbars: {}

        /**
         * Fired when AlloyEditor detects the browser language and loads the corresponding language file. Once this event
         * is fired, AlloyEditor.Strings will be populated with data.
         *
         * @event languageResourcesLoaded
         */
    };

    CKEDITOR.event.implementOn(AlloyEditor);
}());