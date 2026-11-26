import test from 'node:test';
import assert from 'node:assert/strict';
import { getNatureBlend } from './scrollProgress.js';

test('blends cosmos into nature across the fourth chapter entrance', () => {
    assert.equal(getNatureBlend(950, 1000), 0);
    assert.ok(Math.abs(getNatureBlend(450, 1000) - 0.5) < 1e-12);
    assert.equal(getNatureBlend(-50, 1000), 1);
    assert.equal(getNatureBlend(450, 0), 0);
});

test('clamps out-of-range scroll positions and negative viewports', () => {
    assert.equal(getNatureBlend(2000, 1000), 0);
    assert.equal(getNatureBlend(-500, 1000), 1);
    assert.equal(getNatureBlend(300, -100), 0);
    const early = getNatureBlend(700, 1000);
    const late = getNatureBlend(200, 1000);
    assert.ok(early > 0 && early < 0.5);
    assert.ok(Math.abs(early + late - 1) < 1e-12);
});
