export function createDateEighteenYearsAgo(){
    let today = new Date()
    let year = today.getFullYear() - 18
    let month = today.getMonth()
    let day = today.getDate()
    return new Date(year, month, day)
}

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