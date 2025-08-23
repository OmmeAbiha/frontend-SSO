type priceFormatOptions = {
    thousandSeparator?: string;
    decimalSeparator?: string;
    decimalPlaces?: number;
    showDecimalIfZero?: boolean;
};

function priceFormat(
    price: number | string | null | undefined,
    options: priceFormatOptions = {}
): string {
    const {
        thousandSeparator = ",",
        decimalSeparator = ".",
        decimalPlaces = 0,
        showDecimalIfZero = false,
    } = options;

    if (price === null || price === undefined) return "";

    const num = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(num)) return "";

    const fixedNum = num.toFixed(decimalPlaces);

    const [rawInteger, decimalPart] = fixedNum.split(".");
    let integerPart = rawInteger;

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    if (
        decimalPlaces > 0 &&
        decimalPart !== undefined &&
        (showDecimalIfZero || decimalPart !== "0".repeat(decimalPlaces))
    ) {
        return `${integerPart}${decimalSeparator}${decimalPart}`;
    }

    return integerPart;
}

export default priceFormat;