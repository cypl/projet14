import { useState, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../utils/colors"
import DataTable from 'react-data-table-component'
import { useSelector } from "react-redux"
import { TextInput } from "@mantine/core"
import { IconSearch } from "../utils/Icons"
import { validateInputSearch, errorMessageInputSearch } from "../utils/validationsForm"
import { makeDateStringSortable } from "../utils/dates"

const HeadWithSearch = styled.div`
    background-color:${colors.light1};
    padding:40px 40px 20px 40px;
    border-radius:5px;
    margin-bottom:30px;
`

const createEmployee = (employee, index) => ({
    id: index,
    ...employee
})

// sort string rows
const stringSort = (selector) => ( rowA, rowB ) => {
    const a = selector(rowA).toLowerCase()
    const b = selector(rowB).toLowerCase()
    if (a > b) {
        return 1
    }
    else if (b > a) {
        return -1
    }
    return 0
}

// sort string rows
const numberSort = (selector) => ( rowA, rowB ) => {
    const a = selector(rowA)
    const b = selector(rowB)
    if (a > b) {
        return 1
    }
    else if (b > a) {
        return -1
    }
    return 0
}

// sort dates rows
const dateSort = (selector) => ( rowA, rowB ) => {
    const a = makeDateStringSortable(selector(rowA))
    const b = makeDateStringSortable(selector(rowB))
    if (a > b) {
        return 1
    }
    else if (b > a) {
        return -1
    }
    return 0
}


// table definitions
const columns = [
    {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
        sortFunction: stringSort(row => row.firstName)
    },
    {
        name: 'Last Name',
        selector: row => row.lastName,
        sortable: true,
        sortFunction: stringSort(row => row.lastName)
    },
    {
        name: 'Date of birth',
        selector: row => row.dateOfBirth,
        sortable: true,
        sortFunction: dateSort(row => row.dateOfBirth)
    },
    {
        name: 'Start date',
        selector: row => row.startDate,
        sortable: true,
        sortFunction: dateSort(row => row.startDate)
    },
    {
        name: 'Department',
        selector: row => row.department,
        sortable: true,
        sortFunction: stringSort(row => row.department)
    },
    {
        name: 'Street',
        selector: row => row.street,
        sortable: true,
        sortFunction: stringSort(row => row.street)
    },
    {
        name: 'City',
        selector: row => row.city,
        sortable: true,
        sortFunction: stringSort(row => row.city)
    },
    {
        name: 'State',
        selector: row => row.state,
        sortable: true,
        sortFunction: stringSort(row => row.state)
    },
    {
        name: 'Zip code',
        selector: row => row.zipCode,
        sortable: true,
        sortFunction: numberSort(row => row.zipCode)
    },
]

function CurrentEmployees(){

    const currentEmployees = useSelector((state) => state.employees.data)

    const [dataTable, setDataTable] = useState()
    const [searchExpression, setSearchExpression] = useState("")
    const [isSearchExpressionError, setIsSearchExpressionError] = useState()
    
    useEffect(() => {
        
        function generateDataTable() {
            // currentEmployees order is reversed, to show the last added employee first
            const reverseCurrentEmployees = [...currentEmployees].reverse()
            
            if(searchExpression.length === 0){
                return reverseCurrentEmployees.map(createEmployee)
            }
            
            if(searchExpression.length >= 1){
                const searchExpressionLowerCase = searchExpression.toLowerCase()
                return reverseCurrentEmployees.filter((employee) => {
                    // convert all employee properties to string (because zipCode is a number)
                    // and check if they contain the search expression
                    return Object.values(employee).some(val => 
                        val.toString().toLowerCase().includes(searchExpressionLowerCase)
                    )
                }).map(createEmployee)
            }
        }
        setDataTable(generateDataTable())
    }, [currentEmployees, searchExpression])


    return(
        <main>
            <section className="content_width">
                <HeadWithSearch>
                    <h1 className="section-title"><span>Find</span> current employees.</h1>
                    <TextInput
                        label="Search for an employee"
                        placeholder="Type anything (name, zip code…)"
                        icon={<IconSearch />}
                        onChange={(event) => validateInputSearch(event, setSearchExpression, setIsSearchExpressionError)}
                        error={isSearchExpressionError && errorMessageInputSearch}
                    />
                </HeadWithSearch>
                {dataTable &&
                    <DataTable
                        columns={columns}
                        data={dataTable}
                        pagination
                        //sortFunction={customSort}
                        noDataComponent={"Whoops, there's no results found."}
                    />
                }
            </section>
        </main>
    )
}

export default CurrentEmployees