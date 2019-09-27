import ToolbarAdd from '../../../src/components/toolbars/toolbar-add.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ToolbarAdd', function() {
	describe('test configuration', function() {
		beforeEach(Utils.createAlloyEditor);
		afterEach(Utils.destroyAlloyEditor);

		it("should propagate user's configuration to a button", function() {
			var tableAttrs = {
				border: 1,
				cellPadding: 0,
				cellSpacing: 0,
				className: 'rte-table',
			};

			var toolbarAddConfig = {
				buttons: [
					{
						name: 'table',
						cfg: {
							tableAttributes: tableAttrs,
						},
					},
				],
				tabIndex: 2,
			};

			var toolbarAdd = this.render(
				<ToolbarAdd config={toolbarAddConfig} />,
				this.container
			);

			var buttons = toolbarAdd.getToolbarButtons(
				toolbarAddConfig.buttons
			);

			assert.deepEqual(tableAttrs, buttons[0].props.tableAttributes);
		});
	});

	describe('test rendering', function() {
		var editorConfig = {
			eventsDelay: 0,
			toolbars: {
				add: {
					position: ToolbarAdd.right,
				},
			},
			uicore: {
				timeout: 0,
			},
		};

		beforeEach(function(done) {
			Utils.createAlloyEditor.call(this, done, editorConfig);
		});

		afterEach(Utils.destroyAlloyEditor);

		it('renders the toolbar on the right', function(done) {
			// Test passes on IE11 and Windows 7 locally, fails when executed by
			// Travis on SauceLabs, so it will be disabled
			if (CKEDITOR.env.ie && CKEDITOR.env.version === 11) {
				return;
			}

			var editable = this.nativeEditor.editable();

			happen.mousedown(editable);

			// DOM node may be in wrong position if we read its position
			// immediately (for example, if the editor had previously been drawn
			// on the screen with different config). Reading after a minimum
			// delay allows it to be drawn in the right position.
			setTimeout(() => {
				var domNode = ReactDOM.findDOMNode(
					this.editor._mainUI
				).querySelector('.ae-toolbar-add');
				assert.isTrue(domNode.offsetLeft > editable.$.offsetLeft);
				done();
			}, 0);
		});
	});

	describe('test focusing', function() {
		var editorConfig = {
			eventsDelay: 0,
			toolbars: {
				add: {},
			},
			uicore: {
				timeout: 0,
			},
		};

		beforeEach(function(done) {
			Utils.createAlloyEditor.call(this, done, editorConfig);
		});

		afterEach(Utils.destroyAlloyEditor);

		it('should not render when user interacts with a non-editable node', function() {
			var editorEvent = {
				data: {
					nativeEvent: {
						target: {
							isContentEditable: false,
						},
					},
				},
			};

			this.render(
				<ToolbarAdd editorEvent={editorEvent} />,
				this.container
			);

			assert.isNull(this.container.firstChild);
		});

		it('should render in the focused editor', function(done) {
			// Test passes on IE11 and Windows 7 locally, fails when executed by
			// Travis on SauceLabs, so it will be disabled
			if (CKEDITOR.env.ie && CKEDITOR.env.version === 11) {
				done();
				return;
			}

			var blurDelay = CKEDITOR.focusManager._.blurDelay;

			CKEDITOR.focusManager._.blurDelay = false;

			var empty = document.createElement('div');

			var editable2 = document.createElement('div');

			document.getElementsByTagName('body')[0].appendChild(editable2);

			document.getElementsByTagName('body')[0].appendChild(empty);

			var editor2 = AlloyEditor.editable(editable2, editorConfig);
			var nativeEditor2 = editor2.get('nativeEditor');

			nativeEditor2.on(
				'instanceReady',
				function() {
					var buttons;

					// Editor1 is focused and should show the add toolbar. Editor2 should not.
					buttons = TestUtils.scryRenderedDOMComponentsWithClass(
						this.editor._mainUI,
						'ae-button-add'
					);

					assert.equal(
						buttons.length,
						1,
						'Editor1 is focused. It should show the add toolbar'
					);

					buttons = TestUtils.scryRenderedDOMComponentsWithClass(
						editor2._mainUI,
						'ae-button-add'
					);

					assert.equal(
						buttons.length,
						0,
						'Editor2 is not focused. It should not show the add toolbar'
					);

					happen.mousedown(editable2);
					Utils.focusEditor(nativeEditor2);

					// Editor2 is focused and should show the add toolbar. Editor1 should not.
					setTimeout(
						function() {
							buttons = TestUtils.scryRenderedDOMComponentsWithClass(
								this.editor._mainUI,
								'ae-button-add'
							);

							assert.equal(
								buttons.length,
								0,
								'Editor1 is not focused. It should not show the add toolbar'
							);

							buttons = TestUtils.scryRenderedDOMComponentsWithClass(
								editor2._mainUI,
								'ae-button-add'
							);

							assert.equal(
								buttons.length,
								1,
								'Editor2 is focused. It should show the add toolbar'
							);

							happen.mousedown(empty);

							// None of the editors is focused. None of them should show the add toolbar.
							buttons = TestUtils.scryRenderedDOMComponentsWithClass(
								this.editor._mainUI,
								'ae-button-add'
							);

							assert.equal(
								buttons.length,
								0,
								'Editor1 is not focused. It should not show the add toolbar'
							);

							buttons = TestUtils.scryRenderedDOMComponentsWithClass(
								editor2._mainUI,
								'ae-button-add'
							);

							assert.equal(
								buttons.length,
								0,
								'Editor1 is not focused. It should not show the add toolbar'
							);

							CKEDITOR.focusManager._.blurDelay = blurDelay;

							done();
						}.bind(this),
						0
					);
				}.bind(this)
			);
		});
	});
});
