if (!window.Utils) {
	const Utils = {
		assertDropdownCommandButtonResult(config) {
			const assertResult = Utils.assertResult('test/ui/test/fixtures');

			const TestUtils = ReactTestUtils;
			const Simulate = TestUtils.Simulate;

			const command = function() {
				const dropdown = TestUtils.findAllInRenderedTree(
					config.buttonDropdown,
					function(component) {
						return TestUtils.isCompositeComponentWithType(
							component,
							config.buttonCommandsList
						);
					}
				);

				assert.ok(dropdown);
				assert.equal(1, dropdown.length);

				const commandButtons = TestUtils.findAllInRenderedTree(
					dropdown[0],
					function(component) {
						return (
							!TestUtils.isDOMComponent(component) &&
							component.props.command === config.buttonCommand
						);
					}
				);

				assert.ok(commandButtons.length);

				if (config.selectionFn) {
					config.selectionFn.call(this);
				}

				Simulate.click(ReactDOM.findDOMNode(commandButtons[0]));
			};

			assertResult.call(
				this,
				config.initialFixture,
				command,
				config.expectedFixture,
				config.errorMessage
			);
		},

		createAlloyEditor(done, config) {
			assert.ok(done);
			assert.ok(bender);
			assert.ok(CKEDITOR);
			assert.ok(AlloyEditor);

			Utils.createContainer.call(this);

			const editable = document.createElement('div');

			editable.setAttribute('id', 'editable');
			editable.setAttribute('contenteditable', true);

			document.getElementsByTagName('body')[0].appendChild(editable);

			this._editable = editable;

			config = CKEDITOR.tools.merge(
				{
					toolbars: {},
				},
				config
			);

			this.editor = AlloyEditor.editable('editable', config);

			this.nativeEditor = this.editor.get('nativeEditor');

			this.nativeEditor.on(
				'instanceReady',
				function() {
					Utils.focusEditor(this.nativeEditor);
					done();
				}.bind(this)
			);

			this.render = function(component, container) {
				const ref = React.createRef();

				ReactDOM.render(
					React.createElement(
						EditorContext.Provider,
						{value: {editor: this.editor}},
						React.cloneElement(component, {ref})
					),
					container
				);

				return ref.current;
			}.bind(this);
		},

		destroyAlloyEditor(done) {
			if (this.editor) {
				this.editor.destroy();
				this.editor = null;
			}

			this._editable.parentNode.removeChild(this._editable);
			this._editable = null;
			Utils.removeContainer.call(this);
			fixture.cleanup();

			if (done) {
				done();
			}
		},

		assertResult(fixtureBase) {
			const getFixture = Utils.getFixture(fixtureBase);

			return function(initialFixture, command, expectedFixture, message) {
				const initial = getFixture(initialFixture);
				const expected = getFixture(expectedFixture);

				bender.tools.selection.setWithHtml(this.nativeEditor, initial);

				command.call(this);

				const data = bender.tools.getData(this.nativeEditor, {
					fixHtml: true,
					compatHtml: true,
				});

				assert.strictEqual(data, expected, message);
			};
		},

		createCKEditor(done, config, attributes) {
			assert.ok(done);
			assert.ok(bender);
			assert.ok(CKEDITOR);

			Utils.createContainer.call(this);

			const editable = document.createElement('div');

			editable.setAttribute('id', 'editable');
			editable.setAttribute('contenteditable', true);

			if (attributes) {
				for (let attribute in attributes) {
					if (
						Object.prototype.hasOwnProperty.call(
							attributes,
							attribute
						)
					) {
						editable.setAttribute(attribute, attributes[attribute]);
					}
				}
			}

			const cruft = document.querySelectorAll('#editable');
			if (cruft.length) {
				console.warn('Pre-existing #editable element found in DOM!');
				for (let i = 0; i < cruft.length; i++) {
					cruft[i].parentNode.removeChild(cruft[i]);
				}
			}

			const body = document.getElementsByTagName('body')[0];
			body.appendChild(editable);

			this._editable = editable;

			this.nativeEditor = CKEDITOR.inline('editable', config);

			this.nativeEditor.on(
				'instanceReady',
				function() {
					this.nativeEditor.focus();
					done();
				}.bind(this)
			);
		},

		createContainer() {
			this.container = document.createElement('div');

			document.body.appendChild(this.container);
		},

		destroyCKEditor(done) {
			if (this.nativeEditor) {
				this.nativeEditor.destroy();
				this.nativeEditor = null;
			}

			if (this._editable) {
				this._editable.parentNode.removeChild(this._editable);
				this._editable = null;
			}

			Utils.removeContainer.call(this);
			fixture.cleanup();

			if (done) {
				done();
			}
		},

		focusEditor(editor) {
			editor.focus();

			// Firefox needs a stronger focus simulation
			editor.editable().fire('focus', {$: {}});
		},

		getFixture(fixtureBase) {
			return function(fixtureFile) {
				fixture.setBase(fixtureBase);

				fixture.load(fixtureFile);

				return Utils._prepareFixtureForAssertion(fixture.el);
			};
		},

		removeContainer() {
			if (this.container) {
				this.container.parentNode.removeChild(this.container);
				this.container = null;
			}
		},

		_prepareFixtureForAssertion(htmlFixture) {
			let fixtureString;

			if (htmlFixture) {
				fixtureString = bender.tools.fixHtml(
					bender.tools.compatHtml(
						htmlFixture.innerHTML.replace(/\u00a0/g, '&nbsp;')
					)
				);
			}

			return fixtureString;
		},
	};

	window.Utils = Utils;
}
