import { useState, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../utils/colors"
import DataTable from 'react-data-table-component'
import { useSelector } from "react-redux"
import { TextInput } from "@mantine/core"
import { IconSearch } from "../utils/Icons"


const HeadWithSearch = styled.div`
    background-color:${colors.light1};
    padding:40px 40px 20px 40px;
    border-radius:5px;
    margin-bottom:30px;
`

/**
 * Transform a string date to be sortable
 * @param {String} stringDate date should be a string and have this format MM-DD-YYYY
 * @returns a string ready to be sorted : YYYYMMMDD
 */
function makeDateSortable(stringDate){
    // const arrayDate = stringDate.split("-")
    // return arrayDate[2] + arrayDate[0] + arrayDate[1]
    return new Date(stringDate).getTime()
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

const createEmployee = (employee, index) => ({
    id: index,
    ...employee
})

function CurrentEmployees(){

    const currentEmployees = useSelector((state) => state.employees.data)

    const [dataTable, setDataTable] = useState()
    const [searchExpression, setSearchExpression] = useState("")

    // table definitions
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Date of birth',
            selector: row => row.dateOfBirth,
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
            sortable: true
        },
    ];

    useEffect(() => {
        // currentEmployees order is reversed, 
        // to show the last added employee first
        function generateDataTable() {
            const reverseCurrentEmployees = [...currentEmployees].reverse()
            if(searchExpression.length === 0){
                return reverseCurrentEmployees.map(createEmployee)
            }
            if(searchExpression.length >= 1){
                let emp = null
                const searchLower = searchExpression.toLowerCase()
                // const searchNumber = +searchExpression
                return reverseCurrentEmployees.filter((employee) => {
                    const res = [...Object.keys(employee)].find(k => {
                            if (emp===null)console.log(k)
                            const value = employee[k]
                            if (k==="zipCode") return (""+ (+value)).startsWith(""+(+searchLower))
                            if (typeof value === "string") return value.toLowerCase().includes(searchLower)
                        })
                        emp=employee
                        return res
                    }

                    // employee.some((field) => { // field is an element of an employee array (eg.: firstName)
                    //     if (typeof field === 'string')
                    //         return field.toLowerCase().includes(searchLower)
                    //     if (typeof field === "number")
                    //         return field == searchNumber
                    //     return false
                    // })
                    )
                    .map(createEmployee)
            }
        }
        setDataTable(generateDataTable())
    }, [currentEmployees, searchExpression])

    function searchEmployees(event){
        setSearchExpression(event.target.value)
    }


    return(
        <main>
            <section className="content_width">
                <HeadWithSearch>
                    <h1 className="section-title"><span>Find</span> current employees.</h1>
                    <TextInput
                        label="Search for an employee"
                        placeholder="Type anything (name, zip code…)"
                        icon={<IconSearch />}
                        //value={lastName}
                        //required
                        onChange={searchEmployees}
                    />
                </HeadWithSearch>
                {dataTable &&
                    <DataTable
                        columns={columns}
                        data={dataTable}
                        pagination
                        sortFunction={customSort}
                        noDataComponent={"There's no results found."}
                    />
                }
            </section>
        </main>
    )
}

export default CurrentEmployees