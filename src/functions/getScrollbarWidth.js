const getScrollbarWidth = () => {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        return 0;
    }

    const div = document.createElement("div");
    div.style.visibility = "hidden";
    div.style.overflow = "scroll";
    div.style.position = "absolute";
    div.style.top = "-9999px";
    div.style.width = "50px";
    div.style.height = "50px";
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
};

export default getScrollbarWidth;