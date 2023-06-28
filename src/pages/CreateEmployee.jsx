import { useState } from "react"

function formatEmployeeData(data){
    return {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        startDate: data.startDate ?? "",
        department: data.department ?? "",
        street: data.street ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        zipCode: data.zipCode ?? "",
    }
}
        
function CreateEmployee(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    function handleLoginSubmit(event){
        event.preventDefault()
        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
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
                        <label htmlFor="dateofbirth">Date of birth</label>
                        <input type="date" id="dateofbirth" min="01-01-2018" max="12-31-2018" onChange={(event) => setDateOfBirth(event.target.value)}/>
                    </div>

                    <button>Save</button>
                </form>
            </section>
        </main>
    )
}

export default CreateEmployee