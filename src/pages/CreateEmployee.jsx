import { useState } from "react"
import { TextInput, Select, NumberInput } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import styled from 'styled-components'
import { colors } from "../utils/colors"
import { statesList } from "../utils/statesList"
import { departmentsList } from "../utils/departmentsList"


const statesNames = statesList.map((s) => s.name)
console.log(statesNames)
function getRandomValue(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


function formatEmployeeData(data){
    return {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        dateOfBirth: formatDateString(data.dateOfBirth) ?? "",
        startDate: formatDateString(data.startDate) ?? "",
        department: data.department ?? "",
        street: data.street ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        zipCode: "" + data.zipCode ?? "",
    }
}
function formatDateString(dateObject){
    if(dateObject != null){
        var month = ('0' + (dateObject.getMonth() + 1)).slice(-2) // +1 because month start from 0
        var day = ('0' + dateObject.getDate()).slice(-2)
        var year = dateObject.getFullYear()
        return month + '-' + day + '-' + year
    } else {
        return ""
    }
}
       
function CreateEmployee(){
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
        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
            department: department,
            street: street,
            city: city,
            state: usState,
            zipCode: zipCode,
        }
        console.log(formatEmployeeData(newEmployee))
    }

    function fillTheForm(id){
        if(id === 1){
            const birth = new Date()
            birth.setFullYear(1983)
            birth.setMonth(6)
            birth.setDate(27)
            const start = new Date()
            start.setFullYear(2017)
            start.setMonth(11)
            start.setDate(1)
            setFirstName("John")
            setLastName("Smith")
            setDateOfBirth(birth)
            setStartDate(start)
            setDepartment("Engineering")
            setStreet("34th Peace St")
            setCity("Chicago")
            setUsState(getRandomValue(statesNames))
            setZipCode(60018)
        } else {
            const birth = new Date()
            birth.setFullYear(1992)
            birth.setMonth(8)
            birth.setDate(30)
            const start = new Date()
            start.setFullYear(2020)
            start.setMonth(3)
            start.setDate(9)
            setFirstName("Elsa")
            setLastName("Young")
            setDateOfBirth(birth)
            setStartDate(start)
            setDepartment("Marketing")
            setStreet("3rd East St")
            setCity("Detroit")
            setUsState("Michigan")
            setZipCode(48201)
        }
    }

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title"><span>Create</span> an employee.</h1>
                <FillForm onClick={() => fillTheForm(1)}>fill form</FillForm>
                <form onSubmit={handleLoginSubmit}>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                value={firstName}
                                onChange={setFirstName}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                value={lastName}
                                onChange={setLastName}
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
                                    onChange={setStreet}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Your city"
                                    value={city}
                                    onChange={setCity}
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
    font-size:12px;
    line-height:1;
    text-transform:uppercase;
    padding:8px 12px;
    background-color:${colors.light1};
    color:${colors.primary};
    border-radius:4px;
    cursor:pointer;
    transition:0.1s background-color ease-in-out;
    &:hover{
        background-color:${colors.light2};
        transition:0.1s background-color ease-in-out;
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