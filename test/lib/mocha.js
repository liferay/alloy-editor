/**
 * Global "beforeEach" hook.
 */
beforeEach(() => {
	// Nothing here, yet.
});

/**
 * Global "afterEach" hook.
 */
afterEach(() => {
	/**
	 * As of Sinon v5, "sinon" is a default sandbox, which means we can
	 * clean up all stubs transparently with a single call.
	 *
	 * See: https://sinonjs.org/releases/latest/sandbox/
	 */
	sinon.restore();
});
