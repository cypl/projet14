import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { TextInput, Select, NumberInput, Modal } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import { useDisclosure } from '@mantine/hooks'
import styled from 'styled-components'
import { colors } from "../utils/colors"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { formatDateString } from "../utils/formatDate"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"

const FillForm = styled.span`
    position:absolute;
    top:10px;
    right:0;
    font-size: 12px;
    line-height:1.25;
    text-transform: uppercase;
    padding: 8px 12px;
    border: 1px solid ${colors.light1};
    color:${colors.primary};
    border-radius:4px;
    cursor:pointer;
    transition:0.1s background-color ease-in-out;
    &:hover{
        background-color:${colors.light1};
        transition:0.1s background-color ease-in-out;
    }
    & svg{
        height: 14px;
        margin-right: 7px;
        vertical-align: -3px;
        fill:${colors.primary1};
    }
`
const InputsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    & .inputs-col{
        width:calc(50% - 20px);
    }
    & .input-col-address{
        padding-top:22px;
    }
`
const InputsAddress = styled.div`
    background-color:${colors.light1};
    padding:20px;
    border-radius:4px;
    & h2{
        font-size:20px;
        font-weight:900;
        margin-bottom:10px;
        & svg{
            height:17px;
            margin-right:5px;
            fill:${colors.primary};
        }
    }
`

function createDateEighteenYearsAgo(){
    let today = new Date()
    let year = today.getFullYear() - 18
    let month = today.getMonth()
    let day = today.getDate()
    return new Date(year, month, day)
}
     
function isDifferenceGreaterThan18Years(date1, date2) {
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

function CreateEmployee(){
    
    const [opened, { open, close }] = useDisclosure(false)

    const dispatch = useDispatch()  

    const [firstName, setFirstName] = useState('')
    const [isFirstNameError, setIsFirstNameError] = useState()
    const [lastName, setLastName] = useState('')
    const [isLastNameError, setIsLastNameError] = useState()
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [isDateOfBirthError, setIsDateOfBirthError] = useState()
    const [startDate, setStartDate] = useState(null)
    const [isStartDateError, setIsStartDateError] = useState()
    const [startDateCodeError, setStartDateCodeError] = useState(0)
    const [department, setDepartment] = useState(null)
    const [isDepartmentError, setIsDepartmentError] = useState()
    const [street, setStreet] = useState('')
    const [isStreetError, setIsStreetError] = useState()
    const [city, setCity] = useState('')
    const [isCityError, setIsCityError] = useState()
    const [state, setUsState] = useState(null)
    const [isStateError, setIsStateError] = useState()
    const [zipCode, setZipCode] = useState()
    const [isZipCodeError, setIsZipCodeError] = useState()

    const [isFormValid, setFormValid] = useState(false)

    useEffect(()=> {
        if((isFirstNameError === false) &&
            (isLastNameError === false) &&
            (isDateOfBirthError === false) &&
            (isStartDateError === false) &&
            (isDepartmentError === false) &&
            (isStreetError === false) &&
            (isCityError === false) &&
            (isStateError === false) &&
            (isZipCodeError === false)){
                setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [isCityError, isDateOfBirthError, isDepartmentError, isFirstNameError, isLastNameError, isStartDateError, isStateError, isStreetError, isZipCodeError])


    function handleLoginSubmit(event){
        event.preventDefault()
        const newEmployee = {
            firstName,
            lastName,
            dateOfBirth: formatDateString(dateOfBirth),
            startDate: formatDateString(startDate),
            department,
            street,
            city,
            state,
            zipCode,
        }
        dispatch(addEmployee(newEmployee))
    }

    function fillTheForm(){
        const birth = new Date()
        birth.setFullYear(getRandomValue(randomBirthYears))
        birth.setMonth(getRandomValue(randomMonths))
        birth.setDate(getRandomValue(randomDays))
        const start = new Date()
        start.setFullYear(getRandomValue(randomStartYears))
        start.setMonth(getRandomValue(randomMonths))
        start.setDate(getRandomValue(randomDays))
        setFirstName(getRandomValue(randomFirstNames))
        setIsFirstNameError(false)
        setLastName(getRandomValue(randomLastNames))
        setIsLastNameError(false)
        setDateOfBirth(birth)
        setIsDateOfBirthError(false)
        setStartDate(start)
        setIsStartDateError(false)
        setDepartment(getRandomValue(departmentsList))
        setIsDepartmentError(false)
        setStreet(getRandomValue(randomStreets))
        setIsStreetError(false)
        setCity(getRandomValue(randomCities))
        setIsCityError(false)
        setUsState(getRandomValue(randomStates))
        setIsStateError(false)
        setZipCode(getRandomValue(randomZipCodes))
        setIsZipCodeError(false)
    }


    const validateInputText = (event, setText, setIsError) => {
        let content = event.currentTarget.value
        setText(content)
        const regexText = /[^a-zA-ZÀ-ÿ\-']/g // used to find special characters
        content.match(regexText) || content.length === 0 ? setIsError(true) : setIsError(false)
    }
    const errorMessageInputText = "Should not be empty or contain special characters."


    const validateInputSelect = (option, setSelect, setIsError) => {
        setSelect()
        option === null || option === undefined ? setIsError(true) : setIsError(false)
    }
    const errorMessageInputSelect = "Should not be empty."


    const validateInputNumber = (value, setNumber, setIsError) => {
        setNumber(value)
        const regexOnlyNumbers = /^[0-9]+$/
        regexOnlyNumbers.test(value) && value > 0 ? setIsError(false) : setIsError(true)
    }
    const errorMessageInputNumber = "Should not be empty and should only contain positive numbers."


    const validateDateOfBirth = (value, setDate, setIsError) => {
        setDate(value)
        value === null ? setIsError(true) : setIsError(false)
    }
    const errorMessageDateOfBirth = "Should not be empty."


    const validateStartDate = (value, birthDateValue, setDate, setIsError, setCodeError) => {
        if(birthDateValue === undefined || birthDateValue === null){
            setIsError(true)
            setCodeError(1) // "Date of birth should be filled first"
        } else {
            if(isDifferenceGreaterThan18Years(birthDateValue, value )){
                setIsError(false)
                setCodeError(0)
                setDate(value)
            } else {
                setIsError(true) 
                setCodeError(2) // "Employee must have 18 years old at start date"
                setDate(value)
            }
        }
        if(value === null || value === undefined){
            setIsError(true)
            setCodeError(3) // "Should not be empty."
        }
    }

    const errorMessageStartDate = (startDateCodeError) => {
        if(startDateCodeError === 1){ return "Date of birth should be filled first."}
        if(startDateCodeError === 2){ return "Employee must have 18 years old at start date."}
        if(startDateCodeError === 3){ return "Should not be empty."}
        if(startDateCodeError === 0){ return false}
    } 

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title"><span>Create</span> an employee.</h1>
                <FillForm onClick={() => fillTheForm()}>
                    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    fill the form
                </FillForm>
                <form onSubmit={handleLoginSubmit}>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                value={firstName}
                                required
                                onChange={(event) => validateInputText(event, setFirstName, setIsFirstNameError)}
                                error={isFirstNameError && errorMessageInputText}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                value={lastName}
                                required
                                onChange={(event) => validateInputText(event, setLastName, setIsLastNameError)}
                                error={isLastNameError && errorMessageInputText}
                            />
                            <DatePickerInput
                                label="Date of birth"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                description="Employee should have 18 years old minimum."
                                clearable
                                required
                                hideOutsideDates
                                maxDate={createDateEighteenYearsAgo()} // = 18 years from now
                                value={dateOfBirth}
                                onChange={(dateOfBirth) => validateDateOfBirth(dateOfBirth, setDateOfBirth, setIsDateOfBirthError)}
                                error={isDateOfBirthError && errorMessageDateOfBirth}
                            />
                            <DatePickerInput
                                label="Start date"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                clearable
                                required
                                hideOutsideDates
                                maxDate={new Date()} 
                                value={startDate}
                                onChange={(startDate) => validateStartDate(startDate, dateOfBirth, setStartDate, setIsStartDateError, setStartDateCodeError)}
                                error={errorMessageStartDate(startDateCodeError)}
                            />
                            <Select
                                label="Department"
                                placeholder="Your department"
                                data={departmentsList}
                                clearable
                                required
                                value={department}
                                onChange={(department) => validateInputSelect(department, setDepartment, setIsDepartmentError)}
                                error={isDepartmentError && errorMessageInputSelect}
                            />
                        </div>
                        <div className="inputs-col input-col-address">
                            <InputsAddress>
                                <h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                    Address
                                </h2>
                                <TextInput
                                    label="Street"
                                    placeholder="Your street"
                                    value={street}
                                    required
                                    onChange={(event) => validateInputText(event, setStreet, setIsStreetError)}
                                    error={isStreetError && errorMessageInputText}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Your city"
                                    value={city}
                                    required
                                    onChange={(event) => validateInputText(event, setCity, setIsCityError)}
                                    error={isCityError && errorMessageInputText}
                                />
                                <Select
                                    label="State"
                                    placeholder="Your state"
                                    searchable
                                    clearable
                                    required
                                    nothingFound="No options"
                                    data={statesNames}
                                    value={state}
                                    onChange={(state) => validateInputSelect(state, setUsState, setIsStateError)}
                                    error={isStateError && errorMessageInputSelect}
                                />
                                <NumberInput
                                    label="Zip code"
                                    placeholder="Your zip code"
                                    required
                                    value={zipCode}
                                    onChange={(zipCode) => validateInputNumber(zipCode, setZipCode, setIsZipCodeError)}
                                    error={isZipCodeError && errorMessageInputNumber}
                                />
                            </InputsAddress>
                        </div>
                    </InputsWrapper>

                    {isFormValid &&
                        <button onClick={open}>Save</button>
                    }
                    
                    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                        <p>New employee added: <strong>{firstName} {lastName}</strong>.</p>
                        <p><span onClick={close}>Add a new one</span></p>
                        <p><NavLink to="/">Check the list</NavLink></p>
                    </Modal>
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee