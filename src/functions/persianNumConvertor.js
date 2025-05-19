function convertToPersianNum(num) {
    var persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    var persianNum = num.toString().split('').map(function (char) {
        return persianDigits[char];
    }).join('');
    return persianNum;
}

export default convertToPersianNum;