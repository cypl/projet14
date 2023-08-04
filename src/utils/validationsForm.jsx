import { useState, useEffect } from 'react'
import { isDifferenceGreaterThan18Years } from './dates'

export const validateInputText = (event, match, setText, setIsError) => {
    let content = event.currentTarget.value
    setText(content)
    const regexText = /[^a-zA-ZÀ-ÿ\- ']/g // used to allow only letters, accented characters and -
    const regexTextAndNumbers = /[^a-zA-ZÀ-ÿ\-0-9 ']/g // used to allow only letters, accented characters, numbers and -
    let regex
    match === "text-and-numbers" ? regex = regexTextAndNumbers : regex = regexText
    content.match(regex) || content.length === 0 ? setIsError(true) : setIsError(false)
}
export const errorMessageInputText = "Should not be empty or contain special characters."


export const validateInputSelect = (option, setSelect, setIsError) => {
    setSelect(option)
    option === null || option === undefined ? setIsError(true) : setIsError(false)
}
export const errorMessageInputSelect = "Should not be empty."


export const validateInputNumber = (value, setNumber, setIsError) => {
    setNumber(value)
    const regexOnlyNumbers = /^[0-9]+$/
    regexOnlyNumbers.test(value) && value > 0 ? setIsError(false) : setIsError(true)
}
export const errorMessageInputNumber = "Should not be empty and should only contain positive numbers."


export const validateInputSearch = (event, setText, setIsError) => {
    let content = event.currentTarget.value
    setText(content)
    const regexTextAndNumbers = /[^a-zA-ZÀ-ÿ\-0-9 ']/g // used to allow only letters, accented characters, numbers and -
    content.match(regexTextAndNumbers) ? setIsError(true) : setIsError(false)
}
export const errorMessageInputSearch = "Should not contain special characters."


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