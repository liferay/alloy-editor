(function() {
    'use strict';

    var WidgetExclusive = {
        cancelExclusive: function(itemExclusive) {
            if (this.state.itemExclusive === itemExclusive) {
                this.setState({
                    itemExclusive: null
                });
            }
        },

        filterExclusive: function(items) {
            return items.filter(function(item) {
                if (this.state.itemExclusive) {
                    if (this.state.itemExclusive === item.key) {
                        return item;
                    }
                } else {
                    return item;
                }
            }.bind(this));
        },

        mergeExclusiveProps: function(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                cancelExclusive: this.cancelExclusive.bind(this, itemKey),
                renderExclusive: (this.state.itemExclusive === itemKey),
                requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
        },

        requestExclusive: function(itemExclusive) {
            this.setState({
                itemExclusive: itemExclusive
            });
        }
    };

    global.WidgetExclusive = WidgetExclusive;
}());