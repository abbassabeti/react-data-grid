var size;
export function getScrollbarSize() {
    if (size === undefined) {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        document.body.appendChild(scrollDiv);
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
    }
    return size;
}
var positionSticky;
export function isPositionStickySupported() {
    if (positionSticky === undefined) {
        var el = document.createElement('a');
        var style = el.style;
        style.cssText = 'position:-webkit-sticky;position:sticky';
        positionSticky = style.position ? style.position.includes('sticky') : false;
    }
    return positionSticky;
}
//# sourceMappingURL=domUtils.js.map