import moment from "jalali-moment";

/**
 * Ensures the input date is in ISO format.
 * @param {Date | string} date Input date
 * @returns {string} ISO formatted date
 */
const ensureISODate = (date) => (typeof date === "string" ? new Date(date).toISOString() : date.toISOString());

/**
 * Converts an array of strings to numbers.
 * @param {string[]} arr Array of numeric strings
 * @returns {number[]} Array of numbers
 */
const convertToNumbers = (arr) => arr.map(Number);

/**
 * Converts a Persian date string to an English date string.
 * @param {string} str Persian date string
 * @returns {string} English date string
 */
const convertPersianToEnglish = (str) => {
    const persianNums = "۰۱۲۳۴۵۶۷۸۹";
    return str
        .split("")
        .map((char) => (persianNums.includes(char) ? persianNums.indexOf(char) : char))
        .join("");
};

/**
 * Converts a Gregorian date to Jalali date.
 * @param {Date | string} d Gregorian date
 * @returns {any} Jalali date information
 */
const convertToJalali = (d) => {
    const inputDate = ensureISODate(d);
    const date = moment(inputDate).locale("fa");

    const jalaliY = date.format("jYYYY");
    const jalaliM = date.format("jMMMM");
    const monthNum = date.format("jMM");
    const jalaliD = date.format("jD");
    const jalaliTime = date.format("HH:mm");

    return {
        time: jalaliTime,
        only: {
            Year: Number(jalaliY),
            Month: Number(monthNum),
            Day: Number(jalaliD),
        },
        onlyArray: convertToNumbers([jalaliY, monthNum, jalaliD]),
        monthName: jalaliM,
        date: date.format("YYYY/MM/DD").toString(),
        dateString: `${jalaliD} ${jalaliM} ${jalaliY}`,
    };
};

/**
 * Converts a Jalali date to Gregorian date.
 * @param {string} d Jalali date in "YYYY/MM/DD" format
 * @returns {any} Gregorian date information
 */
const convertToMiladi = (d) => {
    const englishDate = convertPersianToEnglish(d);
    const date = moment(englishDate, "jYYYY/jMM/jDD");

    const miladiY = date.format("YYYY");
    const miladiM = date.format("MMMM");
    const monthNum = date.format("MM");
    const miladiD = date.format("D");
    const miladiTime = date.format("HH:mm");

    return {
        time: miladiTime,
        only: {
            Year: Number(miladiY),
            Month: Number(monthNum),
            Day: Number(miladiD),
        },
        onlyArray: convertToNumbers([miladiY, monthNum, miladiD]),
        monthName: miladiM,
        date: new Date(miladiY, monthNum - 1, miladiD),
        dateString: `${miladiD} ${miladiM} ${miladiY}`,
    };
};

/**
 * Converts a Jalali date to Gregorian date using a calendar object.
 * @param {string} d Jalali date in "YYYY/MM/DD" format
 * @returns {any} Gregorian date information
 */
const convertToMiladiObjectCalender = (d) => convertToMiladi(d.toString());

export { convertToJalali, convertToMiladi, convertToMiladiObjectCalender };