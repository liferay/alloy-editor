YUI.add('lreditor', function (Y) {
    Y.LREditor = Y.Base.create('lreditor', Y.Base, [], {
        initializer: function() {

        },

        destructor: function() {

        }
    },
    {
        ATTRS: {
            srcNode: {
                setter: Y.one
            }
        }
    });

}, '0.1', {
    requires: []
});