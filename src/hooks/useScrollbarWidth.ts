import { useEffect, useState } from "react";

type TargetType = React.RefObject<HTMLElement> | HTMLElement | null | undefined;

const getScrollbarWidthFromElement = (element: HTMLElement): number => {
    return element.offsetWidth - element.clientWidth;
};

const getScrollbarWidthFromDocument = (): number => {
    return document.documentElement.offsetWidth - document.documentElement.clientWidth;
};

const resolveElement = (target?: TargetType): HTMLElement | null => {
    if (!target) return null;
    if ("current" in target) return target.current;
    return target;
};

const useScrollbarWidth = (target?: TargetType): number => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;

        const element = resolveElement(target) || document.documentElement;

        const updateWidth = () => {
            const newWidth = element === document.documentElement
                ? getScrollbarWidthFromDocument()
                : getScrollbarWidthFromElement(element);
            setWidth(newWidth);
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [target]);

    return width;
};

export default useScrollbarWidth;