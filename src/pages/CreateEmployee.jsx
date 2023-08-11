import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"
import { Select, Button, Tooltip } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import { ModalContext } from "react-modal-classic"
import { colors } from "../utils/colors"
import { IconCalendar, IconMagic, IconAdress } from "../utils/Icons"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { useDateValidation, validateInputSelect, errorMessages } from "../utils/validationsForm"
import { createDateEighteenYearsAgo, formatDateString } from "../utils/dates"
import SuccessModalContent from "../layouts/SuccessModalContent"
import InputText from "../components/InputText"

const HeadSection = styled.header`
    position:relative;
    display:flex;
    justify-content:space-between;
    @media (max-width: 640px) {
        display:block;
        padding-bottom:20px;
    }
`
const Btn = styled(Button)`
    margin-top:8px;
    @media (max-width: 640px) {
        margin-top:0px;
    }
`
const InputsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    margin-bottom:20px;
    & .inputs-col{
        width:calc(50% - 20px);
        @media (max-width: 768px) {
            width:100%;
        }
    }
    & .input-col-address{
        padding-top:22px;
        @media (max-width: 768px) {
            padding-top:15px;
        }
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

/**
 * Displays the CreateEmployee page.
 * @returns {JSX.Element} - The JSX markup for the CreateEmployee component page.
 */
function CreateEmployee(){

    const { openModal } = useContext(ModalContext)
    const { dateOfBirth, setDateOfBirth, startDate, setStartDate, isDatesError, setDatesError, updateDate } = useDateValidation()
    
    const dispatch = useDispatch()  

    const [firstName, setFirstName] = useState('')
    const [isFirstNameError, setIsFirstNameError] = useState()
    const [lastName, setLastName] = useState('')
    const [isLastNameError, setIsLastNameError] = useState()
    const [department, setDepartment] = useState(null)
    const [isDepartmentError, setIsDepartmentError] = useState()
    const [street, setStreet] = useState('')
    const [isStreetError, setIsStreetError] = useState()
    const [city, setCity] = useState('')
    const [isCityError, setIsCityError] = useState()
    const [state, setUsState] = useState(null)
    const [isStateError, setIsStateError] = useState()
    const [zipCode, setZipCode] = useState('')
    const [isZipCodeError, setIsZipCodeError] = useState()
    const [isFormValid, setFormValid] = useState(false)

    // Check for errors and the presence of certain values to determine the validity of the form.
    useEffect(()=> {
        if((isFirstNameError === false) &&
            (isLastNameError === false) &&
            (isDatesError === false) &&
            (dateOfBirth != null) && 
            (startDate != null) && 
            (isDepartmentError === false) &&
            (isStreetError === false) &&
            (isCityError === false) &&
            (isStateError === false) &&
            (isZipCodeError === false)){
                setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [dateOfBirth, isCityError, isDatesError, isDepartmentError, isFirstNameError, isLastNameError, isStateError, isStreetError, isZipCodeError, startDate])


    /**
     * Fill the form with randomized values.
     */
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
        setStartDate(start)
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

    function emptyForm(){
        setFirstName("")
        setIsFirstNameError()
        setLastName("")
        setIsLastNameError()
        setDateOfBirth(null)
        setStartDate(null)
        setDatesError(false)
        setDepartment("")
        setIsDepartmentError()
        setStreet("")
        setIsStreetError()
        setCity("")
        setIsCityError()
        setUsState(null)
        setIsStateError()
        setZipCode("")
        setIsZipCodeError()
    }

    function handleSubmit(event){
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
        openModal(<SuccessModalContent/>)
        emptyForm()
    }

    return(
        <main>
            <section className="content_width">
                <HeadSection>
                    <h1 className="section-title"><span>Create</span> an employee.</h1>
                    <Btn onClick={fillTheForm} variant="outline" leftIcon={<IconMagic/>}>Fill the form</Btn>
                </HeadSection>
                <form>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <InputText 
                                label={"First name"}
                                isRequired
                                placeHolder={"Your first name"}
                                value={firstName}
                                match={"text-only"}
                                setText={setFirstName}
                                setIsError={setIsFirstNameError}
                                isError={isFirstNameError}
                                errorMessage={errorMessages.get("inputTextOnly")}
                            />
                            <InputText 
                                label={"Last name"}
                                isRequired
                                placeHolder={"Your last name"}
                                value={lastName}
                                match={"text-only"}
                                setText={setLastName}
                                setIsError={setIsLastNameError}
                                isError={isLastNameError}
                                errorMessage={errorMessages.get("inputTextOnly")}
                            />
                            <DatePickerInput
                                label="Date of birth"
                                description="Employee must have 18 years old at start date."
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                required
                                hideOutsideDates
                                icon={<IconCalendar/>}
                                maxDate={createDateEighteenYearsAgo()}
                                value={dateOfBirth}
                                onChange={(value) => updateDate(value, "birth")}
                                error={isDatesError && errorMessages.get("dateOfBirth")}
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
                                onChange={(value) => updateDate(value, "start")}
                                error={isDatesError && errorMessages.get("startDate")}
                            />
                            <Select
                                label="Department"
                                placeholder="Your department"
                                data={departmentsList}
                                required
                                value={department}
                                onChange={(department) => validateInputSelect(department, setDepartment, setIsDepartmentError)}
                                error={isDepartmentError && errorMessages.get("inputSelect")}
                            />
                        </div>
                        <div className="inputs-col input-col-address">
                            <InputsAddress>
                                <h2>
                                    <IconAdress/>
                                    Address
                                </h2>
                                <InputText 
                                    label={"Street"}
                                    isRequired
                                    placeHolder={"Your street"}
                                    value={street}
                                    match={"text-and-numbers"}
                                    setText={setStreet}
                                    setIsError={setIsStreetError}
                                    isError={isStreetError}
                                    errorMessage={errorMessages.get("inputTextNumbers")}
                                />
                                <InputText
                                    label={"City"}
                                    isRequired
                                    placeHolder={"Your city"}
                                    value={city}
                                    match={"text-only"}
                                    setText={setCity}
                                    setIsError={setIsCityError}
                                    isError={isCityError}
                                    errorMessage={errorMessages.get("inputTextOnly")}
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
                                    error={isStateError && errorMessages.get("inputSelect")}
                                />
                                <InputText 
                                    label={"Zip code"}
                                    isRequired
                                    placeHolder={"Your zip code"}
                                    value={zipCode}
                                    match={"zip-code"}
                                    setText={setZipCode}
                                    setIsError={setIsZipCodeError}
                                    isError={isZipCodeError}
                                    errorMessage={errorMessages.get("inputZipCode")}
                                />
                            </InputsAddress>
                        </div>
                    </InputsWrapper>

                    {isFormValid ? 
                        <Button onClick={handleSubmit}>Save</Button>
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
                                        
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee