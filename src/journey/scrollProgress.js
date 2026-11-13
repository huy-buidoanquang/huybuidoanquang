/** @param {number} scrollY @param {number} scrollableHeight */
export function getScrollProgress(scrollY, scrollableHeight) {
    return scrollableHeight <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / scrollableHeight));
}
