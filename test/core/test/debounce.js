const assert = chai.assert;

import debounce from '../../../src/core/debounce';

describe('Debounce', () => {
	let clock;

	beforeEach(() => {
		clock = sinon.useFakeTimers();
	});

	afterEach(() => {
		clock.restore();
	});

	it('debounces function execution', () => {
		const listener = sinon.stub();
		const fn = debounce(listener, 0);

		fn();
		fn();
		fn();

		clock.tick(10);
		assert.ok(listener.calledOnce);
	});

	it('calls debounced function with additional alguments', () => {
		const listener = sinon.stub();
		const fn = debounce(listener, 0);

		fn('param1');

		clock.tick(10);
		assert.ok(listener.calledWith('param1'));
	});

	it('debounces function execution with context and params', () => {
		const ctx = {};
		const listener = sinon.stub();
		const args = ['param1', 'param2'];
		const fn = debounce(listener, 0, ctx, args);

		fn();
		fn();
		fn();

		clock.tick(10);
		assert.ok(listener.calledOnce);
		assert.ok(listener.calledOn(ctx));
		assert.ok(listener.calledWith('param1', 'param2'));
	});

	it('detaches a debounced function execution', () => {
		const listener = sinon.stub();
		const fn = debounce(listener, 100);

		fn();

		fn.detach();

		clock.tick(10);
		assert.notOk(listener.calledOnce);
	});

	it('debounces function execution for the specified delay', () => {
		const listener = sinon.stub();
		const fn = debounce(listener, 20);

		fn();
		clock.tick(10);
		fn();
		clock.tick(10);
		assert.notOk(listener.calledOnce);

		fn();
		clock.tick(40);
		assert.ok(listener.calledOnce);
	});
});
