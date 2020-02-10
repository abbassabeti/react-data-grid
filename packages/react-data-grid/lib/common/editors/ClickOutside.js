import React, { useRef, useEffect } from 'react';
export default function ClickOutside(_a) {
    var onClickOutside = _a.onClickOutside, children = _a.children;
    var isClickedInside = useRef(false);
    useEffect(function () {
        function handleDocumentClick() {
            if (isClickedInside.current) {
                isClickedInside.current = false;
            }
            else {
                onClickOutside();
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return function () {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [onClickOutside]);
    return React.cloneElement(React.Children.only(children), {
        onClickCapture: function () {
            isClickedInside.current = true;
        }
    });
}
//# sourceMappingURL=ClickOutside.js.map