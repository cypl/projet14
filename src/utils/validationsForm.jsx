import { useState, useEffect } from 'react'
import { isDifferenceGreaterThan18Years } from './dates'

export const validateInputText = (event, match, setText, setIsError) => {
    let content = event.currentTarget.value
    setText(content)
    const regexText = /[^a-zA-ZÀ-ÿ\- ']/g // used to allow only letters, accented characters and -
    const regexTextAndNumbers = /[^a-zA-ZÀ-ÿ\-0-9 ']/g // used to allow only letters, accented characters, numbers and -
    let regex
    if(match === "text-and-numbers"){
        regex = regexTextAndNumbers
        content.match(regex) || content.length === 0 ? setIsError(true) : setIsError(false)
    } else if(match === "text-only"){
        regex = regexText
        content.match(regex) || content.length === 0 ? setIsError(true) : setIsError(false)
    } else if(match === "search"){
        regex = regexTextAndNumbers
        content.match(regex) ? setIsError(true) : setIsError(false)
    } else {
        console.log("validateInputText() needs a correct 'match' parameter, it could be 'text-and-numbers', 'text-only' or 'search'.")
    }
}


export const validateInputSelect = (option, setSelect, setIsError) => {
    setSelect(option)
    option === null || option === undefined ? setIsError(true) : setIsError(false)
}


export const validateInputZipCode = (event, setNumber, setIsError) => {
    let content = event.currentTarget.value
    setNumber(content)
    const regexZipCode = /^[0-9]{5}(?:-[0-9]{4})?$/
    regexZipCode.test(content) ? setIsError(false) : setIsError(true)
}


const useDateValidation = () => {
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [isDatesError, setDatesError] = useState(false)

    useEffect(() => {
        if (dateOfBirth && startDate) {
            setDatesError(!isDifferenceGreaterThan18Years(dateOfBirth, startDate))
        }
    }, [dateOfBirth, startDate])

    const updateDate = (value, field) => {
        if (field === "birth") {
            setDateOfBirth(value)
        } else {
            setStartDate(value)
        }
    }

    return { dateOfBirth, setDateOfBirth, startDate, setStartDate, isDatesError, setDatesError, updateDate }
}

export default useDateValidation


export const errorMessages = new Map([
    ["inputTextOnly", "Should not be empty or contain special characters or numbers."],
    ["inputTextNumbers", "Should not be empty or contain special characters."],
    ["inputTextSearch", "Should not contain special characters."],
    ["inputSelect", "Should not be empty."],
    ["inputZipCode", "Should be a valid US Zip code."],
    ["dateOfBirth", "Birth date should be sooner than 18 years before start date."],
    ["startDate", "Start date should be later than 18 years after birth date."]
])