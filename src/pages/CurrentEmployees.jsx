import { useState, useEffect } from "react"
import { GetDataEmployees } from "../api/Api"
import { Table } from '@mantine/core'

function CurrentEmployees(){

    const employees = GetDataEmployees()
    const[tableRows, setTableRows] = useState()

    useEffect(() => {
        const employeesData = employees.data
        function rows(){
            return employeesData.map((employee) => (
                <tr key={employee.firstName}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td>{employee.startDate}</td>
                    <td>{employee.department}</td>
                    <td>{employee.street}</td>
                    <td>{employee.city}</td>
                    <td>{employee.state}</td>
                    <td>{employee.zipCode}</td>
                </tr>
            ))
        }

        if(employees.isLoaded){
            setTableRows(rows())
        }
        
    }, [employees.data, employees.isLoaded])
    

    return(
        <main>
            <section className="content_width">
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Date of birth</th>
                            <th>Start date</th>
                            <th>Department</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </Table>
            </section>
        </main>
    )
}

export default CurrentEmployees