if (!window.Utils) {
	window.Utils = {};
}

window.Utils.afterEach = function afterEach(done) {
	Utils.removeContainer.call(this);

	fixture.cleanup();

	if (done) {
		done();
	}
};

window.Utils.assertResult = function assertResult(fixtureBase) {
	var getFixture = Utils.getFixture(fixtureBase);

	return function(initialFixture, command, expectedFixture, message) {
		var initial = getFixture(initialFixture);
		var expected = getFixture(expectedFixture);

		bender.tools.selection.setWithHtml(this.nativeEditor, initial);

		command.call(this);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(data, expected, message);
	};
};

window.Utils.beforeEach = function beforeEach(done) {
	Utils.createContainer.call(this);

	// CKEDITOR in Firefox needs to have cursor and at least an empty string
	// before doing anything ;)
	bender.tools.selection.setWithHtml(this.nativeEditor, ' {}');

	if (done) {
		done();
	}
};

window.Utils.createCKEditor = function createCKEditor(
	done,
	config,
	attributes
) {
	var editable = document.createElement('div');

	editable.setAttribute('id', 'editable');
	editable.setAttribute('contenteditable', true);

	if (attributes) {
		for (var attribute in attributes) {
			if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
				editable.setAttribute(attribute, attributes[attribute]);
			}
		}
	}

	document.getElementsByTagName('body')[0].appendChild(editable);

	this._editable = editable;

	assert.ok(bender);
	assert.ok(CKEDITOR);

	this.nativeEditor = CKEDITOR.inline('editable', config);

	this.nativeEditor.on(
		'instanceReady',
		function() {
			this.nativeEditor.focus();

			done();
		}.bind(this)
	);
};

window.Utils.createContainer = function createContainer() {
	this.container = document.createElement('div');

	document.body.appendChild(this.container);
};

window.Utils.destroyCKEditor = function destroyCKEditor(done) {
	if (this.nativeEditor) {
		this.nativeEditor.destroy();
	}

	this._editable.parentNode.removeChild(this._editable);

	if (done) {
		done();
	}
};

window.Utils.focusEditor = function focusEditor(editor) {
	editor.focus();

	// Firefox needs a stronger focus simulation
	editor.editable().fire('focus', {$: {}});
};

window.Utils.getFixture = function getFixture(fixtureBase) {
	return function(fixtureFile) {
		fixture.setBase(fixtureBase);

		fixture.load(fixtureFile);

		return Utils._prepareFixtureForAssertion(fixture.el);
	};
};

window.Utils.removeContainer = function removeContainer() {
	this.container.parentNode.removeChild(this.container);
};

window.Utils._prepareFixtureForAssertion = function _prepareFixtureForAssertion(
	htmlFixture
) {
	var fixtureString;

	if (htmlFixture) {
		fixtureString = bender.tools.fixHtml(
			bender.tools.compatHtml(
				htmlFixture.innerHTML.replace(/\u00a0/g, '&nbsp;')
			)
		);
	}

	return fixtureString;
};
