import { useState, useEffect } from "react"
import DataTable from 'react-data-table-component'
import { generateMockedData } from "../utils/randomData"
import { useSelector } from "react-redux"

function reverseDataOrder(data){
    const reversedData = [...data].reverse()
    return reversedData
}

/**
 * Transform a string date to be sortable
 * @param {String} stringDate date should be a string and have this format MM-DD-YYYY
 * @returns a string ready to be sorted : YYYYMMMDD
 */
function makeDateSortable(stringDate){
    const arrayDate = stringDate.split("-")
    return arrayDate[2] + arrayDate[0] + arrayDate[1]
}

// retrieves sorted rows
const customSort = (rows, selector, direction) => {
    // ! \\ we assume date columns have ID 3 and 4
    const colID = event.target.getAttribute("data-column-id")
    let isDate = false
    colID === "3" || colID === "4" ? isDate = true : isDate = false

    return rows.sort((rowA, rowB) => {
        let aField = ""
        let bField = ""
        if(isDate){
            aField = makeDateSortable(selector(rowA))
            bField = makeDateSortable(selector(rowB))
        } else {
            // text fields should not be case sensitive
            aField = selector(rowA).toLowerCase()
            bField = selector(rowB).toLowerCase()
        }

        let comparison = 0
    
        if (aField > bField) {
            comparison = 1
        } else if (aField < bField) {
            comparison = -1
        }
        return direction === 'desc' ? comparison * -1 : comparison
    })
}


function CurrentEmployees(){

    const currentEmployees = useSelector((state) => state.employees.data)

    const [dataTable, setDataTable] = useState()

    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Date of birth',
            selector: row => row.dataOfBirth,
            sortable: true,
        },
        {
            name: 'Start date',
            selector: row => row.startDate,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {
            name: 'Street',
            selector: row => row.street,
            sortable: true,
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
        },
        {
            name: 'State',
            selector: row => row.state,
            sortable: true,
        },
        {
            name: 'Zip code',
            selector: row => row.zipCode,
            sortable: true,
        },
    ];

    useEffect(() => {
        // currentEmployees order is reversed, 
        // to show the last added employee first
        function datatable() {
            const reverseCurrentEmployees = reverseDataOrder(currentEmployees)
            return reverseCurrentEmployees.map((employee, index) => (
                {id: index,
                 firstName: employee[0],
                 lastName: employee[1],
                 dataOfBirth: employee[2],
                 startDate: employee[3],
                 department: employee[4],
                 street: employee[5],
                 city: employee[6],
                 state: employee[7],
                 zipCode: employee[8],
                }
            ))
        }
        setDataTable(datatable())
    }, [currentEmployees])

    return(
        <main>
            <section className="content_width">
                <h1 className="section-title" onClick={() => generateMockedData()}><span>Find</span> current employees.</h1>
                {dataTable &&
                    <DataTable
                        columns={columns}
                        data={dataTable}
                        pagination
                        sortFunction={customSort}
                    />
                }
            </section>
        </main>
    )
}

export default CurrentEmployees