import test from 'node:test';
import assert from 'node:assert/strict';
import {
    detectPreferredLang,
    getLangFromPath,
    localizePath,
    stripEntryLang,
    stripViPrefix,
} from './ui.js';

test('maps English and Vietnamese routes symmetrically', () => {
    assert.equal(getLangFromPath('/'), 'en');
    assert.equal(getLangFromPath('/places/nhon-hai/'), 'en');
    assert.equal(getLangFromPath('/vi/'), 'vi');
    assert.equal(getLangFromPath('/vi/places/nhon-hai/'), 'vi');

    assert.equal(localizePath('/', 'vi'), '/vi/');
    assert.equal(localizePath('/#projects', 'vi'), '/vi/#projects');
    assert.equal(localizePath('/places/nhon-hai/', 'vi'), '/vi/places/nhon-hai/');
    assert.equal(localizePath('/vi/places/nhon-hai/', 'en'), '/places/nhon-hai/');
    assert.equal(stripViPrefix('/vi/journal/graduation-2023/'), '/journal/graduation-2023/');
    assert.equal(stripEntryLang('vi/nhon-hai'), 'nhon-hai');
    assert.equal(stripEntryLang('nhon-hai'), 'nhon-hai');
});

test('detects browser language while respecting explicit saved override', () => {
    assert.equal(detectPreferredLang(null, ['vi-VN', 'en-US']), 'vi');
    assert.equal(detectPreferredLang(null, ['en-US', 'vi-VN']), 'en');
    assert.equal(detectPreferredLang(null, ['fr-FR', 'vi']), 'vi');
    assert.equal(detectPreferredLang(null, ['ja-JP']), 'en');
    assert.equal(detectPreferredLang('en', ['vi-VN']), 'en');
    assert.equal(detectPreferredLang('vi', ['en-US']), 'vi');
});
