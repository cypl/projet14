import { useState, useEffect } from 'react'
import { isDifferenceGreaterThan18Years } from './dates'



/**
 * Validates a select input based on the selected option's value.
 * Sets the selected option to a state and updates an error state based on validation.
 * 
 * @param {?string|number} option - The selected option's value from the select input. It can be a string, number, or null.
 * @param {function} setSelect - Function to set the selected option's value state.
 * @param {function} setIsError - Function to set the error state: true indicates an error (null or undefined value), false indicates a valid selection.
 *
 * @example
 * 
 * <select onChange={(value) => validateInputSelect(value, setSelectedOption, setSelectError)}>
 *   <option value="option1">Option 1</option>
 *   <option value="option2">Option 2</option>
 * </select>
 * 
 */
export const validateInputSelect = (option, setSelect, setIsError) => {
    setSelect(option)
    option === null || option === undefined ? setIsError(true) : setIsError(false)
}


/**
 * Custom hook for validating the difference between two dates (specifically for a date of birth and a start date).
 * Ensures that there is a difference of at least 18 years between the two provided dates.
 * 
 * @returns {Object} Object containing:
 * - dateOfBirth: The current state value for the date of birth.
 * - setDateOfBirth: Setter function for updating the date of birth.
 * - startDate: The current state value for the start date.
 * - setStartDate: Setter function for updating the start date.
 * - isDatesError: A boolean indicating if there's an error in the date difference (true when the difference is less than 18 years).
 * - setDatesError: Setter function for updating the dates error state.
 * - updateDate: A function to update either the date of birth or the start date based on a provided field parameter.
 * 
 * @example
 * const { dateOfBirth, setDateOfBirth, startDate, setStartDate, isDatesError, setDatesError, updateDate } = useDateValidation()
 * 
 * // Usage in a component
 * <DateInput value={dateOfBirth} onChange={(value) => updateDate(value, 'birth')} />
 * <DateInput value={startDate} onChange={(value) => updateDate(value, 'start')} />
 * {isDatesError && <p>Error: The difference between the two dates should be at least 18 years.</p>}
 * 
 */
export const useDateValidation = () => {
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

/**
 * A map containing error messages associated with validation cases.
 * 
 * @example
 * 
 * const errorMessage = errorMessages.get('inputTextOnly')
 * console.log(errorMessage) // Outputs: "Should not be empty or contain special characters or numbers."
 */
export const errorMessages = new Map([
    ["inputTextOnly", "Should not be empty or contain special characters or numbers."],
    ["inputTextNumbers", "Should not be empty or contain special characters."],
    ["inputTextSearch", "Should not contain special characters."],
    ["inputSelect", "Should not be empty."],
    ["inputZipCode", "Should be a valid US Zip code."],
    ["dateOfBirth", "Birth date should be sooner than 18 years before start date."],
    ["startDate", "Start date should be later than 18 years after birth date."]
])