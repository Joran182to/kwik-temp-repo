export const roundTo = (number, decimalPlaces) => {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

export const roundToExactly = (number, decimalPlaces) => {
    return roundTo(number, decimalPlaces).toFixed(decimalPlaces);
};