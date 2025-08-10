type ConvertToPersianNumOptions = {
  preserveSymbols?: boolean;
  reverse?: boolean;
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ENGLISH_DIGITS = "0123456789";

function convertToPersianNum(
  input: string | number | null | undefined,
  options: ConvertToPersianNumOptions = {}
): string {
  const { preserveSymbols = true, reverse = false } = options;

  if (input === null || input === undefined) return "";

  const str = String(input);

  return str
    .split("")
    .map((char) => {
      if (reverse) {
        const index = PERSIAN_DIGITS.indexOf(char);
        return index >= 0 ? ENGLISH_DIGITS[index] : char;
      }

      const index = ENGLISH_DIGITS.indexOf(char);
      if (index >= 0) return PERSIAN_DIGITS[index];

      if (preserveSymbols && /[.,+\-]/.test(char)) return char;

      return "";
    })
    .join("");
}

export default convertToPersianNum;