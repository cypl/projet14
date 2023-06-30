import { useState, useEffect } from "react"
import { Table } from '@mantine/core'
import { generateMockedData } from "../utils/randomData"
import { useSelector } from "react-redux"


function CurrentEmployees(){

    const currentEmployees = useSelector((state) => state.employees.data)
    const[tableRows, setTableRows] = useState()

    useEffect(() => {
        function rows(){
            return currentEmployees.map((employee, index) => (
                <tr key={index}>
                    <td>{employee[0]}</td>
                    <td>{employee[1]}</td>
                    <td>{employee[2]}</td>
                    <td>{employee[3]}</td>
                    <td>{employee[4]}</td>
                    <td>{employee[5]}</td>
                    <td>{employee[6]}</td>
                    <td>{employee[7]}</td>
                    <td>{employee[8]}</td>
                </tr>
            ))
        }
        setTableRows(rows())
    }, [currentEmployees])

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title" onClick={() => generateMockedData()}><span>Find</span> current employees.</h1>
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