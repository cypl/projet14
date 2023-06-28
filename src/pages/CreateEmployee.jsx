import { useState } from "react"
import { Button } from '@mantine/core';
import { DatePickerInput } from "@mantine/dates"

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
                <p>Here, you can create an employee.</p>
                <form className="sign-in-form" onSubmit={handleLoginSubmit}>

                    <div>
                        <label htmlFor="firstname">First name</label>
                        <input type="text" id="firstname" onChange={(event) => setFirstName(event.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="lastname">Last name</label>
                        <input type="text" id="lastname" onChange={(event) => setLastName(event.target.value)}/>
                    </div>

                    <div>
                        <DatePickerInput
                            label="Date of birth"
                            placeholder="Pick date"
                            valueFormat="MM-DD-YYYY"
                            mx="left"
                            maw={300}
                            clearable
                            hideOutsideDates
                            hideWeekdays
                            // minDate={new Date(2022, 1, 1)} // = 01/02/2022
                            // maxDate={new Date(2022, 8, 1)} // = 01/09/2022
                            onChange={setDateOfBirth}
                            />
                    </div>

                    <div>
                        <DatePickerInput
                            label="Start date"
                            placeholder="Pick date"
                            valueFormat="MM-DD-YYYY"
                            mx="left"
                            maw={300}
                            clearable
                            hideOutsideDates
                            hideWeekdays
                            // minDate={new Date(2022, 1, 1)} // = 01/02/2022
                            // maxDate={new Date(2022, 8, 1)} // = 01/09/2022
                            onChange={setStartDate}
                            />
                    </div>

                    <button>Save</button>
                    <Button>
                    Save
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee