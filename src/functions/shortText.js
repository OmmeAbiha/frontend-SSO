const shortText = (text, value) => {
    if (String(text) && String(text).length > value) {
        return `${String(text).slice(0, value - 1) + " ..."}`;
    } else {
        return String(text);
    }
};

export default shortText;