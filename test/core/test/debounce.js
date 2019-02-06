const assert = chai.assert;

describe('Debounce', () => {
	let clock;

	beforeEach(() => {
		clock = sinon.useFakeTimers();
	});

	afterEach(() => {
		clock.restore();
	});

	it('should debounce function execution', () => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn();
		fn();
		fn();

		clock.tick(10);
		assert.ok(listener.calledOnce);
	});

	it('should call debounced function with additional alguments', () => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn('param1');

		clock.tick(10);
		assert.ok(listener.calledWith('param1'));
	});

	it('should debounce function execution with context and params', () => {
		const ctx = {};
		const listener = sinon.stub();
		const args = ['param1', 'param2'];
		const fn = CKEDITOR.tools.debounce(listener, 0, ctx, args);

		fn();
		fn();
		fn();

		clock.tick(10);
		assert.ok(listener.calledOnce);
		assert.ok(listener.calledOn(ctx));
		assert.ok(listener.calledWith('param1', 'param2'));
	});

	it('should detach a debounced function execution', () => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 100);

		fn();

		fn.detach();

		clock.tick(10);
		assert.notOk(listener.calledOnce);
	});

	it('should debounce function execution for the specified delay', () => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 20);

		fn();
		clock.tick(10);
		fn();
		clock.tick(10);
		fn();
		clock.tick(40);

		assert.ok(listener.calledOnce);
	});
});
