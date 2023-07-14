export function createDateEighteenYearsAgo(){
    let today = new Date()
    let year = today.getFullYear() - 18
    let month = today.getMonth()
    let day = today.getDate()
    return new Date(year, month, day)
}

export function isDifferenceGreaterThan18Years(date1, date2) {
    // Calculate difference in milliseconds
    const difference = date2 - date1
    // Convert difference in years
    const differenceInYears = difference / (1000 * 60 * 60 * 24 * 365.25)
    if (differenceInYears > 18) {
        return true
    } else {
        return false
    }
}