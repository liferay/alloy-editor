CKEDITOR.dialog.add( 'widgetfoundationAccordion', function( editor ) {
    return {
        title: 'Edit Accordion Box',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'name',
                        type: 'text',
                        label: 'Accordion machine name',
                        width: '200px',
                        setup: function( widget ) {
                            this.setValue( widget.data.name != undefined ? widget.data.name : 'accordion');
                        },
                        commit: function( widget ) {
                            widget.setData( 'name', this.getValue() );
                        }
                    },
                    {
                        id: 'count',
                        type: 'text',
                        label: 'Number of panels',
                        width: '50px',
                        setup: function( widget ) {
                            this.setValue( widget.data.count != undefined ? widget.data.count : 3);
                        },
                        commit: function( widget ) {
                            widget.setData( 'count', this.getValue() );
                        }
                    },
                    {
                        id: 'activePanel',
                        type: 'text',
                        width: '50px',
                        label: 'Active panel (leave blank for accordion to be initially collapsed, or enter the number of the panel you would like open, ex: 1)',
                        setup: function( widget ) {
                            this.setValue( widget.data.activePanel);
                        },
                        commit: function( widget ) {
                            widget.setData( 'activePanel', this.getValue() );
                        }
                    },
                    {
                        id: 'multiExpand',
                        type: 'checkbox',
                        label: 'Allow multiple accordion panels to be expanded at the same time',
                        setup: function( widget ) {
                            this.setValue( widget.data.multiExpand );
                        },
                        commit: function( widget ) {
                            widget.setData( 'multiExpand', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );