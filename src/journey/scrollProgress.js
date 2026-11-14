/** @param {number} scrollY @param {number} scrollableHeight */
export function getScrollProgress(scrollY, scrollableHeight) {
    return scrollableHeight <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / scrollableHeight));
}

/** @param {number} chapterTop @param {number} viewportHeight */
export function getNatureBlend(chapterTop, viewportHeight) {
    if (viewportHeight <= 0) return 0;
    const t = Math.max(0, Math.min(1, 0.95 - chapterTop / viewportHeight));
    return t * t * (3 - 2 * t);
}
