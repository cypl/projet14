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
    setSelect()
    option === null || option === undefined ? setIsError(true) : setIsError(false)
}
export const errorMessageInputSelect = "Should not be empty."


export const validateInputNumber = (value, setNumber, setIsError) => {
    setNumber(value)
    const regexOnlyNumbers = /^[0-9]+$/
    regexOnlyNumbers.test(value) && value > 0 ? setIsError(false) : setIsError(true)
}
export const errorMessageInputNumber = "Should not be empty and should only contain positive numbers."