import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCoordinates, projectVietnam, resolvePinCollisions, VIETNAM_BOUNDS } from './geo.js';

test('parses English and Vietnamese DMS coordinates accurately', () => {
    const en = parseCoordinates('23°21′N 105°19′E');
    const vi = parseCoordinates('23°21′B 105°19′Đ');
    assert.deepEqual(en, vi);
    assert.ok(en);
    assert.ok(Math.abs(en.lat - 23.35) < 0.001);
    assert.ok(Math.abs(en.lon - 105.3167) < 0.001);
    assert.equal(parseCoordinates('invalid'), null);
});

test('projects northern points higher and eastern points further right', () => {
    const haGiang = projectVietnam(23.35, 105.32);
    const nhonHai = projectVietnam(13.77, 109.23);
    assert.ok(haGiang.y < nhonHai.y, 'Ha Giang should appear north (smaller y) of Nhon Hai');
    assert.ok(haGiang.x < nhonHai.x, 'Nhon Hai should appear east (larger x) of Ha Giang');
    assert.ok(haGiang.x >= VIETNAM_BOUNDS.padX && haGiang.x <= VIETNAM_BOUNDS.width - VIETNAM_BOUNDS.padX);
});

test('separates overlapping pins beyond minimum distance', () => {
    const spread = resolvePinCollisions([
        { id: 'ta-xua', x: 140, y: 120 },
        { id: 'ta-xua-2025', x: 140, y: 120 },
        { id: 'phu-sa-phin', x: 138, y: 118 },
    ], 18);

    for (let i = 0; i < spread.length; i++) {
        for (let j = i + 1; j < spread.length; j++) {
            const d = Math.hypot(spread[i].px - spread[j].px, spread[i].py - spread[j].py);
            assert.ok(d >= 17.5, `Expected pins ${spread[i].id} and ${spread[j].id} to be separated, got ${d}`);
        }
    }
});
