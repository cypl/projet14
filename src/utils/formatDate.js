export function formatDateString(dateObject){
    if(dateObject != null){
        var month = ('0' + (dateObject.getMonth() + 1)).slice(-2) // +1 because month start from 0
        var day = ('0' + dateObject.getDate()).slice(-2)
        var year = dateObject.getFullYear()
        return month + '-' + day + '-' + year
    } else {
        return ""
    }
}