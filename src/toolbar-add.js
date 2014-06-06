YUI.add('toolbar-add', function (Y) {

    var ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.WidgetPosition], {
        initializer: function() {
            
        },

        destructor: function() {

        }
    });

    Y.ToolbarAdd = ToolbarAdd;
},'0.1', {
    requires: ['array-extras', 'button', 'widget', 'widget-position']
});
