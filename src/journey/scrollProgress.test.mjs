import test from 'node:test';
import assert from 'node:assert/strict';
import { getScrollProgress } from './scrollProgress.js';

test('clamps camera travel to the scrollable page', () => {
    assert.equal(getScrollProgress(-20, 1000), 0);
    assert.equal(getScrollProgress(500, 1000), 0.5);
    assert.equal(getScrollProgress(1200, 1000), 1);
    assert.equal(getScrollProgress(300, 0), 0);
});
