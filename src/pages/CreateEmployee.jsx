import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"
import { ModalContext } from "react-modal-classic"
import { colors } from "../utils/colors"
import { IconCalendar, IconMagic, IconAdress, IconUser } from "../utils/Icons"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomZipCodes } from "../utils/randomData"
import { useDateValidation, validateInputSelect, errorMessages } from "../utils/validationsForm"
import { createDateEighteenYearsAgo, formatDateString } from "../utils/dates"
import SuccessModalContent from "../layouts/SuccessModalContent"
import Button from "../components/Button"
import InputFieldText from "../components/InputFieldText"
import { validateInputText } from "../utils/validationsForm"
import InputFieldDate from "../components/InputFieldDate"
import InputFieldSelect from "../components/InputFieldSelect"


const HeadSection = styled.header`
    position:relative;
    display:flex;
    justify-content:space-between;
    @media (max-width: 640px) {
        display:block;
        padding-bottom:20px;
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
        setUsState(getRandomValue(statesNames))
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
        setDepartment(null)
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
            department: department.value,
            street,
            city,
            state: state.value,
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
                    <h1 className="section-title"><span>Add</span> an employee.</h1>
                    <Button 
                        text="Fill the form"
                        onClick={fillTheForm}
                        outline
                        icon={<IconMagic/>}
                    />
                </HeadSection>
                <form>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <InputFieldText
                                label={"First name"}
                                isRequired
                                placeHolder={"First name"}
                                value={firstName}
                                icon={<IconUser/>}
                                isError={isFirstNameError}
                                errorMessage={errorMessages.get("inputTextOnly")}
                                onChange={(event) => validateInputText(event, "text-only", setFirstName, setIsFirstNameError)}
                            />
                            <InputFieldText
                                label={"Last name"}
                                isRequired
                                placeHolder={"Last name"}
                                value={lastName}
                                icon={<IconUser/>}
                                isError={isLastNameError}
                                errorMessage={errorMessages.get("inputTextOnly")}
                                onChange={(event) => validateInputText(event, "text-only", setLastName, setIsLastNameError)}
                            />
                            <InputFieldDate 
                                label={"Date of birth"}
                                description={"Employee must have 18 years old at start date."}
                                isRequired
                                placeHolder={"Pick a date"}
                                value={dateOfBirth}
                                icon={<IconCalendar/>}
                                isError={isDatesError}
                                errorMessage={errorMessages.get("dateOfBirth")}
                                onChange={(value) => updateDate(value, "birth")}
                                maxDate={createDateEighteenYearsAgo()}
                            />
                            <InputFieldDate 
                                label={"Start date"}
                                isRequired
                                placeHolder={"Pick a date"}
                                value={startDate}
                                icon={<IconCalendar/>}
                                isError={isDatesError}
                                errorMessage={errorMessages.get("startDate")}
                                onChange={(value) => updateDate(value, "start")}
                                maxDate={new Date()}
                            />
                            <InputFieldSelect
                                label={"Department"}
                                isRequired
                                placeHolder={"Department"}
                                value={department}
                                isError={isStateError}
                                errorMessage={errorMessages.get("inputSelect")}
                                onChange={(department) => validateInputSelect(department, setDepartment, setIsDepartmentError)}
                                optionsSelect={departmentsList}
                            />
                        </div>
                        <div className="inputs-col input-col-address">
                            <InputsAddress>
                                <h2>
                                    <IconAdress/>
                                    Address
                                </h2>
                                <InputFieldText
                                    label={"Street"}
                                    isRequired
                                    placeHolder={"Street"}
                                    value={street}
                                    isError={isStreetError}
                                    errorMessage={errorMessages.get("inputTextNumbers")}
                                    onChange={(event) => validateInputText(event, "text-and-numbers", setStreet, setIsStreetError)}
                                />
                                <InputFieldText
                                    label={"City"}
                                    isRequired
                                    placeHolder={"City"}
                                    value={city}
                                    isError={isCityError}
                                    errorMessage={errorMessages.get("inputTextOnly")}
                                    onChange={(event) => validateInputText(event, "text-only", setCity, setIsCityError)}
                                />
                                <InputFieldSelect
                                    label={"State"}
                                    isRequired
                                    placeHolder={"State"}
                                    value={state}
                                    icon={<IconAdress/>}
                                    isError={isStateError}
                                    errorMessage={errorMessages.get("inputSelect")}
                                    onChange={(state) => validateInputSelect(state, setUsState, setIsStateError)}
                                    optionsSelect={statesNames}
                                />
                                <InputFieldText
                                    label={"Zip code"}
                                    isRequired
                                    placeHolder={"Zip code"}
                                    value={zipCode}
                                    isError={isZipCodeError}
                                    errorMessage={errorMessages.get("inputZipCode")}
                                    onChange={(event) => validateInputText(event, "zip-code", setZipCode, setIsZipCodeError)}
                                />
                            </InputsAddress>
                        </div>
                    </InputsWrapper>

                    {isFormValid ? 
                        <Button text="Save" onClick={handleSubmit}/>
                    : 
                        <Button text="Save" deactivate/>
                    }
                                        
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee