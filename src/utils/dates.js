/**
 * Creates a date object representing a date 18 years prior to the current date.
 * @returns {Date} - A date object set 18 years in the past.
 */
export function createDateEighteenYearsAgo(){
    let today = new Date()
    let year = today.getFullYear() - 18
    let month = today.getMonth()
    let day = today.getDate()
    return new Date(year, month, day)
}

/**
 * Checks if the difference between two dates is at least 18 years.
 * Both dates are normalized to start at 00:00:00.000 for accurate comparison.
 *
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {boolean} - Returns true if date2 is at least 18 years later than date1.
 */
export function isDifferenceGreaterThan18Years(date1, date2) {
    // Normalize dates to ignore hours, minutes, seconds and milliseconds
    date1.setHours(0, 0, 0, 0)
    date2.setHours(0, 0, 0, 0)
    // Create a new date based on date1, but 18 years later
    const date1Plus18 = new Date(date1)
    date1Plus18.setFullYear(date1Plus18.getFullYear() + 18)
    // Compare this new date with date2
    return date2 >= date1Plus18
}

/**
 * Transforms a string date into a sortable format.
 * Converts a date string in the format MM-DD-YYYY to a format YYYYMMDD.
 * 
 * @param {string} stringDate - The date string in the format MM-DD-YYYY.
 * @returns {string} - The date string in a sortable format YYYYMMDD.
 */
export function makeDateStringSortable(stringDate){
    const arrayDate = stringDate.split("-")
    const year = parseInt(arrayDate[2], 10)
    const month = parseInt(arrayDate[0], 10) - 1 // -1 because months are indexed from 0
    const day = parseInt(arrayDate[1], 10)
    return new Date(year, month, day)
}

/**
 * Formats a Date object into a string in the format MM-DD-YYYY.
 * 
 * @param {Date} dateObject - The Date object to be formatted. Can be null or undefined.
 * @returns {string} - The formatted date string in the format MM-DD-YYYY, or an empty string if the input is null or undefined.
 */
export function formatDateString(dateObject){
    if(dateObject != null){
        const month = ('0' + (dateObject.getMonth() + 1)).slice(-2) // +1 because month start from 0
        const day = ('0' + dateObject.getDate()).slice(-2)
        const year = dateObject.getFullYear()
        return month + '-' + day + '-' + year
    } else {
        return ""
    }
}