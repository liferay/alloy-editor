(function() {
    'use strict';

    /**
     * Wraps each of the plugin lifecycle methods in a closure that will
     * set up the editor.__processingPlugin__ variable so it can be globally
     * accessed exposing the plugin being processed and the lifecycle phase
     * in which it is happening
     *
     * @private
     * @method wrapPluginLifecycle
     * @param {Object} plugin The plugin to wrap lifecycle methods
     */
    var wrapPluginLifecycle = function(plugin) {
        var methods = ['beforeInit', 'init', 'afterInit'];

        methods.forEach(function(methodName) {
            if (plugin[methodName]) {
                plugin[methodName] = CKEDITOR.tools.override(plugin[methodName], function(originalPluginMethod) {
                    var payload = {
                        phase: methodName,
                        plugin: plugin
                    };

                    return function(editor) {
                        editor.__processingPlugin__ = payload;

                        originalPluginMethod.call(this, editor);

                        delete editor.__processingPlugin__;
                    };
                });
            }
        });
    };

    /**
     * Overrides CKEDITOR.plugins.load method so we can extend the lifecycle methods of
     * the loaded plugins to add some metainformation about the plugin being processed
     *
     * @static
     * @method load
	 * @param {String/Array} names The name of the resource to load. It may be a
	 * string with a single resource name, or an array with several names.
	 * @param {Function} callback A function to be called when all resources
	 * are loaded. The callback will receive an array containing all loaded names.
	 * @param {Object} [scope] The scope object to be used for the callback call.
     */
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(pluginsLoad){
        // Wrap original load function so we can transform the plugin input parameter
        // before passing it down to the original callback
        return function(names, callback, scope) {
            pluginsLoad.call(this, names, function(plugins) {
                if (callback) {
                    // Iterate over plugins in the same way the callback will do, for consistency,
                    // and wrap all plugins lifecycles
                    for (var pluginName in plugins) {
                        wrapPluginLifecycle(plugins[pluginName]);
                    }

                    callback.call(scope, plugins);
                }
            });
        };
    });
}());