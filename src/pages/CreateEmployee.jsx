import { useState } from "react"
import { TextInput, Select, NumberInput } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import styled from 'styled-components'
import { colors } from "../utils/colors"
import { statesNames } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"
import { getRandomValue, randomFirstNames, randomLastNames, randomBirthYears, randomStartYears, randomMonths, randomDays, randomStreets, randomCities, randomStates, randomZipCodes } from "../utils/randomData"
import { formatDateString } from "../utils/formatDate"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/dataSlice"

// function formatEmployeeData(data){
//     return {
//         firstName: data.firstName ?? "",
//         lastName: data.lastName ?? "",
//         dateOfBirth: formatDateString(data.dateOfBirth) ?? "",
//         startDate: formatDateString(data.startDate) ?? "",
//         department: data.department ?? "",
//         street: data.street ?? "",
//         city: data.city ?? "",
//         state: data.state ?? "",
//         zipCode: "" + data.zipCode ?? "",
//     }
// }
       
function CreateEmployee(){

    const dispatch = useDispatch()  

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [department, setDepartment] = useState(null)
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [usState, setUsState] = useState(null)
    const [zipCode, setZipCode] = useState()


    function handleLoginSubmit(event){
        event.preventDefault()
        // const newEmployee = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     dateOfBirth: dateOfBirth,
        //     startDate: startDate,
        //     department: department,
        //     street: street,
        //     city: city,
        //     state: usState,
        //     zipCode: zipCode,
        // }
        const newEmployee = [
            firstName,
            lastName,
            formatDateString(dateOfBirth),
            formatDateString(startDate),
            department,
            street,
            city,
            usState,
            zipCode,
        ]
        dispatch(addEmployee(newEmployee))
        //console.log(formatEmployeeData(newEmployee))
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
        setLastName(getRandomValue(randomLastNames))
        setDateOfBirth(birth)
        setStartDate(start)
        setDepartment(getRandomValue(departmentsList))
        setStreet(getRandomValue(randomStreets))
        setCity(getRandomValue(randomCities))
        setUsState(getRandomValue(randomStates))
        setZipCode(getRandomValue(randomZipCodes))
    }

    

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title"><span>Create</span> an employee.</h1>
                <FillForm onClick={() => fillTheForm()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
                    fill the form
                </FillForm>
                <form onSubmit={handleLoginSubmit}>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.currentTarget.value)}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                value={lastName}
                                onChange={(event) => setLastName(event.currentTarget.value)}
                            />
                            <DatePickerInput
                                label="Date of birth"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                clearable
                                hideOutsideDates
                                hideWeekdays
                                // minDate={new Date(2022, 1, 1)} // = 01/02/2022
                                // maxDate={new Date(2022, 8, 1)} // = 01/09/2022
                                value={dateOfBirth}
                                onChange={setDateOfBirth}
                            />
                            <DatePickerInput
                                label="Start date"
                                placeholder="Pick date"
                                valueFormat="MM-DD-YYYY"
                                clearable
                                hideOutsideDates
                                hideWeekdays
                                // minDate={new Date(2022, 1, 1)} // = 01/02/2022
                                // maxDate={new Date(2022, 8, 1)} // = 01/09/2022
                                value={startDate}
                                onChange={setStartDate}
                            />
                            <Select
                                label="Department"
                                placeholder="Your department"
                                data={departmentsList}
                                clearable
                                value={department}
                                onChange={setDepartment}
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
                                    onChange={(event) => setStreet(event.currentTarget.value)}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Your city"
                                    value={city}
                                    onChange={(event) => setCity(event.currentTarget.value)}
                                />
                                <Select
                                    label="State"
                                    placeholder="Your state"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    data={statesNames}
                                    value={usState}
                                    onChange={setUsState}
                                />
                                <NumberInput
                                    label="Zip code"
                                    placeholder="Your zip code"
                                    value={zipCode}
                                    onChange={setZipCode}
                                />
                            </InputsAddress>
                        </div>
                    </InputsWrapper>

                    <button>Save</button>
                    
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee

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
        height: 12px;
        margin-right: 7px;
        vertical-align: -1px;
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