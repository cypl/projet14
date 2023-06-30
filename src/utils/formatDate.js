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

export function formatDateObject(dateString){
    const dateParts = dateString.split("-") 
    const year = parseInt(dateParts[2]) // retrieves the year as a number
    const month = parseInt(dateParts[0]) - 1 // retrieves the month as a number, +1 because month start from 0
    const day = parseInt(dateParts[1]) // retrieves the day as a number
    return new Date(year, month, day)
}