type FormatPriceOptions = {
    thousandSeparator?: string;
    decimalSeparator?: string;
    decimalPlaces?: number;
    showDecimalIfZero?: boolean;
};

function formatPrice(
    price: number | string | null | undefined,
    options: FormatPriceOptions = {}
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

    let [integerPart, decimalPart] = fixedNum.split(".");

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    if (decimalPlaces > 0 && (showDecimalIfZero || decimalPart !== "0".repeat(decimalPlaces))) {
        return `${integerPart}${decimalSeparator}${decimalPart}`;
    }

    return integerPart;
}

export default formatPrice;
