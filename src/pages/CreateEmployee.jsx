import { useState, useEffect, useContext } from "react"
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addEmployee } from "../store/dataSlice"
import { TextInput, Select, Button, Tooltip } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import { ModalContext } from "react-modal-classic"
import { colors } from "../utils/colors"
import { IconCalendar, IconMagic, IconAdress } from "../utils/Icons"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { formatDateString } from "../utils/formatDate"
import { validateInputText, validateInputSelect, validateInputZipCode, errorMessages } from "../utils/validationsForm"
import { createDateEighteenYearsAgo } from "../utils/dates"
import useDateValidation from "../utils/validationsForm"

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
const ContentModal = styled.div`
    padding:30px;
    text-align:center;
    & .modal-content-newemployee{
        padding-bottom:20px;
        & strong{
            font-weight:900;
            color:${colors.primary};
        }
    }
    & .modal-content-button{
        margin:0 10px;
    }
`

function CreateEmployee(){

    const { openModal, closeModal } = useContext(ModalContext)
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


    function SuccessModalContent(){
        const currentEmployees = useSelector((state) => state.employees.data)
        const reverseCurrentEmployees = [...currentEmployees].reverse()
        return (
            <ContentModal>
                <p className="modal-content-newemployee">New employee added:<br/>
                <strong>{reverseCurrentEmployees[0].firstName} {reverseCurrentEmployees[0].lastName}</strong></p>
                <Button variant={"outline"} onClick={closeModal} className="modal-content-button">Add a new one</Button>
                <NavLink to="/"><Button className="modal-content-button">Check the list</Button></NavLink>
            </ContentModal>
        )
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
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                value={firstName}
                                required
                                onChange={(event) => validateInputText(event, "text-only", setFirstName, setIsFirstNameError)}
                                error={isFirstNameError && errorMessages.get("inputTextOnly")}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                value={lastName}
                                required
                                onChange={(event) => validateInputText(event, "text-only", setLastName, setIsLastNameError)}
                                error={isLastNameError && errorMessages.get("inputTextOnly")}
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
                                <TextInput
                                    label="Street"
                                    placeholder="Your street"
                                    value={street}
                                    required
                                    onChange={(event) => validateInputText(event, "text-and-numbers", setStreet, setIsStreetError)}
                                    error={isStreetError && errorMessages.get("inputTextNumbers")}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Your city"
                                    value={city}
                                    required
                                    onChange={(event) => validateInputText(event, "text-only", setCity, setIsCityError)}
                                    error={isCityError && errorMessages.get("inputTextOnly")}
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
                                <TextInput
                                    label="Zip code"
                                    placeholder="Your zip code"
                                    required
                                    value={zipCode}
                                    onChange={(event) => validateInputZipCode(event, setZipCode, setIsZipCodeError)}
                                    error={isZipCodeError && errorMessages.get("inputZipCode")}
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