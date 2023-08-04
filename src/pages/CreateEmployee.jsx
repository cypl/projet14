import { useState, useEffect, useContext } from "react"
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"
import { TextInput, Select, NumberInput, Button, Tooltip } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import { colors } from "../utils/colors"
import { IconCalendar, IconMagic, IconAdress } from "../utils/Icons"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { formatDateString } from "../utils/formatDate"
import { validateInputText, errorMessageInputText, validateInputSelect, errorMessageInputSelect, validateInputNumber, errorMessageInputNumber } from "../utils/validationsForm"
import { createDateEighteenYearsAgo } from "../utils/dates"
import { ModalContext } from "react-modal-classic"
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
    }
    & .modal-content-name{
        padding-bottom:20px;
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
    const [zipCode, setZipCode] = useState()
    const [isZipCodeError, setIsZipCodeError] = useState()

    const [isFormValid, setFormValid] = useState(false)

    useEffect(()=> {
        if((isFirstNameError === false) &&
            (isLastNameError === false) &&
            (isDatesError === false) &&
            (isDepartmentError === false) &&
            (isStreetError === false) &&
            (isCityError === false) &&
            (isStateError === false) &&
            (isZipCodeError === false)){
                setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [isCityError, isDatesError, isDepartmentError, isFirstNameError, isLastNameError, isStateError, isStreetError, isZipCodeError])


    function SuccessModal(){
        return (
            <ContentModal>
                <p className="modal-content-newemployee">New employee added!</p>
                <Button variant={"outline"} onClick={closeModal} className="modal-content-button">Add a new one</Button>
                <Button className="modal-content-button"><NavLink to="/">Check the list</NavLink></Button>
            </ContentModal>
        )
    }
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
        openModal(<SuccessModal/>)
        setTimeout(() => {
            emptyForm()
        }, "500")
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
        setDatesError(null)
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
                                required
                                hideOutsideDates
                                icon={<IconCalendar/>}
                                maxDate={createDateEighteenYearsAgo()} // = 18 years from now
                                value={dateOfBirth}
                                onChange={(value) => updateDate(value, "birth")}
                                error={isDatesError && "Employee should have 18 years old minimum."}
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
                                error={isDatesError && "Employee should have 18 years old minimum."}
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
                                        
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee