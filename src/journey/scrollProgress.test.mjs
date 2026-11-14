import test from 'node:test';
import assert from 'node:assert/strict';
import { getScrollProgress, getNatureBlend } from './scrollProgress.js';

test('clamps camera travel to the scrollable page', () => {
    assert.equal(getScrollProgress(-20, 1000), 0);
    assert.equal(getScrollProgress(500, 1000), 0.5);
    assert.equal(getScrollProgress(1200, 1000), 1);
    assert.equal(getScrollProgress(300, 0), 0);
});

test('blends cosmos into nature across the fourth chapter entrance', () => {
    assert.equal(getNatureBlend(950, 1000), 0);
    assert.ok(Math.abs(getNatureBlend(450, 1000) - 0.5) < 1e-12);
    assert.equal(getNatureBlend(-50, 1000), 1);
    assert.equal(getNatureBlend(450, 0), 0);
});
