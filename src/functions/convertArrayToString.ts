type ConvertArrayOptions = {
  unique?: boolean;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  separator?: string;
};

function convertArrayToString(
  arr: string[] | null | undefined,
  options: ConvertArrayOptions = {}
): string {
  if (!Array.isArray(arr) || arr.length === 0) return "";

  const {
    unique = false,
    toLowerCase = false,
    toUpperCase = false,
    separator = ", "
  } = options;

  let result = arr.map((item) => {
    const index = item.indexOf("/");

    if (index !== -1) {
      let type = item.slice(index + 1);
      if (type === "svg+xml") type = "svg";

      return type;
    }

    return item;
  });

  if (toLowerCase) {
    result = result.map((s) => s.toLowerCase());
  } else if (toUpperCase) {
    result = result.map((s) => s.toUpperCase());
  }

  if (unique) {
    result = [...new Set(result)];
  }

  return result.join(separator);
}

export default convertArrayToString;