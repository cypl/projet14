import { useState, useEffect } from "react"
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"
import { TextInput, Select, NumberInput, Modal, Button, Tooltip } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import { useDisclosure } from '@mantine/hooks'
import { colors } from "../utils/colors"
import { IconCalendar, IconMagic, IconAdress } from "../utils/Icons"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { formatDateString } from "../utils/formatDate"
import { validateInputText, errorMessageInputText, validateInputSelect, errorMessageInputSelect, validateInputNumber, errorMessageInputNumber } from "../utils/validationsForm"


//const Button
const Btn = styled(Button)`
    position:absolute;
    top:0px;
    right:0;
`
const InputsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    margin-bottom:20px;
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
            height:20px;
            width:20px;
            margin-right:5px;
            vertical-align:-2px;
            color:${colors.primary};
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
    
    const [opened, handlers] = useDisclosure(false)

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
        handlers.open()
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
                <Btn onClick={fillTheForm} variant="outline" leftIcon={<IconMagic/>}>Fill the form</Btn>
                <form>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                value={firstName}
                                required
                                onChange={(event) => validateInputText(event, "text-only", setFirstName, setIsFirstNameError)}
                                error={isFirstNameError && errorMessageInputText}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                value={lastName}
                                required
                                onChange={(event) => validateInputText(event, "text-only", setLastName, setIsLastNameError)}
                                error={isLastNameError && errorMessageInputText}
                            />
                            <DatePickerInput
                                label="Date of birth"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                description="Employee should have 18 years old minimum."
                                required
                                hideOutsideDates
                                icon={<IconCalendar/>}
                                maxDate={createDateEighteenYearsAgo()} // = 18 years from now
                                value={dateOfBirth}
                                onChange={(dateOfBirth) => validateDateOfBirth(dateOfBirth, setDateOfBirth, setIsDateOfBirthError)}
                                error={isDateOfBirthError && errorMessageDateOfBirth}
                            />
                            <DatePickerInput
                                label="Start date"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                required
                                hideOutsideDates
                                icon={<IconCalendar/>}
                                maxDate={new Date()} 
                                value={startDate}
                                onChange={(startDate) => validateStartDate(startDate, dateOfBirth, setStartDate, setIsStartDateError, setStartDateCodeError)}
                                error={errorMessageStartDate(startDateCodeError)}
                            />
                            <Select
                                label="Department"
                                placeholder="Your department"
                                data={departmentsList}
                                required
                                value={department}
                                onChange={(department) => validateInputSelect(department, setDepartment, setIsDepartmentError)}
                                error={isDepartmentError && errorMessageInputSelect}
                            />
                        </div>
                        <div className="inputs-col input-col-address">
                            <InputsAddress>
                                <h2>
                                    <IconAdress/>
                                    Address
                                </h2>
                                <TextInput
                                    label="Street"
                                    placeholder="Your street"
                                    value={street}
                                    required
                                    onChange={(event) => validateInputText(event, "text-and-numbers", setStreet, setIsStreetError)}
                                    error={isStreetError && errorMessageInputText}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Your city"
                                    value={city}
                                    required
                                    onChange={(event) => validateInputText(event, "text-only", setCity, setIsCityError)}
                                    error={isCityError && errorMessageInputText}
                                />
                                <Select
                                    label="State"
                                    placeholder="Your state"
                                    searchable
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

                    {isFormValid ? 
                        <Button onClick={handleLoginSubmit}>Save</Button>
                    : 
                        <Tooltip label="Fill out the form before saving.">
                            <Button
                                data-disabled
                                sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                                onClick={(event) => event.preventDefault()}
                                >
                                Save
                            </Button>
                        </Tooltip>
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