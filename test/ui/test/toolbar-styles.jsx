(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ToolbarStyles', function() {
        this.timeout(35000);

        var cleanUpEditor = function() {
            if (this.alloyEditor) {
                this.alloyEditor.destroy();
                this.alloyEditor = null;
            }

            document.body.removeChild(this.el);
            document.body.removeChild(this.container);
        };

        var initEditor = function(done, config) {
            this.el = document.createElement('div');
            this.el.setAttribute('id', 'editable');
            document.body.appendChild(this.el);

            this.container = document.createElement('div');
            document.body.appendChild(this.container);

            this.alloyEditor = AlloyEditor.editable('editable', config);
            this.nativeEditor = this.alloyEditor.get('nativeEditor');

            this.nativeEditor.once('instanceReady', function() {
                done();
            });
        };

        describe('with buttonCfg object', function() {
            beforeEach(function(done) {
                initEditor.call(this, done, {
                    buttonCfg: {
                        'bold': {
                            label: 'btn-bold',
                            tabIndex: 1024
                        },
                        'italic': {
                            label: 'btn-italic',
                            tabIndex: 2048
                        }
                    }
                });
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should render buttons with properties from buttonCfg', function() {
                var toolbarStyles = ReactDOM.render(<AlloyEditor.ToolbarStyles editor={this.alloyEditor}/>, this.container);

                var buttons = toolbarStyles.getToolbarButtons(
                    ['bold', 'italic'],
                    {
                        manualSelection: null,
                        selectionType: 'text'
                    }
                );

                assert.strictEqual(2, buttons.length);

                var buttonBold = buttons[0];
                assert.strictEqual('bold', buttonBold.key);
                assert.strictEqual('btn-bold', buttonBold.props.label);
                assert.strictEqual(1024, buttonBold.props.tabIndex);

                var buttonItalic = buttons[1];
                assert.strictEqual('italic', buttonItalic.key);
                assert.strictEqual('btn-italic', buttonItalic.props.label);
                assert.strictEqual(2048, buttonItalic.props.tabIndex);
            });
        });

        describe('with default editor configuration', function() {
            before(Utils.createAlloyEditor);

            after(Utils.destroyAlloyEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should constrain the toolbar\'s position', function() {
                var toolbarStyles = ReactDOM.render(<AlloyEditor.ToolbarStyles editor={this.editor}/>, this.container);

                var res = toolbarStyles.getConstrainedPosition({
                    height: 50,
                    left: 0,
                    top: -20,
                    width: 300
                }, {
                    width: 200
                });

                assert.strictEqual(-100, res.x);
                assert.strictEqual(0, res.y);

                res = toolbarStyles.getConstrainedPosition({
                    height: 50,
                    left: 0,
                    top: -20,
                    width: 300
                });

                assert.strictEqual(0, res.y);
            });
        });
    });
}());
