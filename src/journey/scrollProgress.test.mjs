import test from 'node:test';
import assert from 'node:assert/strict';
import { getNatureBlend } from './scrollProgress.js';

test('blends cosmos into nature across the fourth chapter entrance', () => {
    assert.equal(getNatureBlend(950, 1000), 0);
    assert.ok(Math.abs(getNatureBlend(450, 1000) - 0.5) < 1e-12);
    assert.equal(getNatureBlend(-50, 1000), 1);
    assert.equal(getNatureBlend(450, 0), 0);
});
