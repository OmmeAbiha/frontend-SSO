type ShortTextOptions = {
    maxLength?: number;
    ellipsis?: boolean;
    trimEnd?: boolean;
    direction?: "end" | "start";
};

function shortText(
    input: string | number | null | undefined,
    options: ShortTextOptions = {}
): string {
    const {
        maxLength = 30,
        ellipsis = true,
        trimEnd = true,
        direction = "end",
    } = options;

    const text = String(input ?? "");

    if (text.length <= maxLength) {
        return text;
    }

    const suffix = ellipsis ? "..." : "";
    const trimLength = maxLength - (ellipsis ? suffix.length : 0);

    let result =
        direction === "end"
            ? text.slice(0, trimLength)
            : text.slice(text.length - trimLength);

    if (trimEnd) {
        result = result.trimEnd();
    }

    return direction === "start" ? `${suffix}${result}` : `${result}${suffix}`;
}

export default shortText;