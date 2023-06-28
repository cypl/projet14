import { useState } from "react"
import { TextInput, Select } from '@mantine/core'
import { DatePickerInput } from "@mantine/dates"
import styled from 'styled-components'
import { colors } from "../utils/colors"
import { statesList } from "../utils/statesList"


const statesNames = statesList.map((s) => s.name)

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
        zipCode: data.zipCode ?? "",
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

    function handleLoginSubmit(event){
        event.preventDefault()
        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
        }
        console.log(formatEmployeeData(newEmployee))
    }

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title"><span>Create</span> an employee.</h1>
                <form onSubmit={handleLoginSubmit}>
                    <InputsWrapper>
                        <div className="inputs-col">
                            <TextInput
                                label="First name"
                                placeholder="Your first name"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Your last name"
                                onChange={(event) => setLastName(event.target.value)}
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
                                onChange={setStartDate}
                            />
                            <TextInput
                                label="Department"
                                placeholder="Your department"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className="inputs-col inputs-address">
                            <TextInput
                                label="Street"
                                placeholder="Your street"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <TextInput
                                label="City"
                                placeholder="Your city"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <TextInput
                                label="State"
                                placeholder="Your state"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <Select
                                label="State"
                                placeholder="Your state"
                                searchable
                                nothingFound="No options"
                                data={statesNames}
                            />
                            <TextInput
                                label="Zip code"
                                placeholder="Your zip code"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                    </InputsWrapper>

                    <button>Save</button>
                    
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee

const InputsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    & .inputs-col{
        width:calc(50% - 20px);
        &.inputs-address{
            background-color:${colors.light1};
            padding:20px;
            border-radius:4px;
        }
    }
`