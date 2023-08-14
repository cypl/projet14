import { useState, useEffect } from "react"
import styled from "styled-components"
import DataTable from 'react-data-table-component'
import { useSelector } from "react-redux"
import { colors } from "../utils/colors"
import { IconSearch } from "../utils/Icons"
import { errorMessages } from "../utils/validationsForm"
import { makeDateStringSortable } from "../utils/dates"
import { dataTableStyles } from "../utils/dataTableStyles"
import InputFieldText from "../components/InputFieldText"
import { validateInputText } from "../utils/validationsForm"

const HeadWithSearch = styled.div`
    background-color:${colors.light1};
    padding:40px 40px 20px 40px;
    border-radius:5px;
    margin-bottom:30px;
`

/**
 * Formats an employee object with an added 'id' property based on a given index.
 *
 * @param {Object} employee - The employee data to format.
 * @param {number} index - The index to use as the 'id' for the formatted employee object.
 * @returns {Object} - The formatted employee object with an added 'id' property.
 */
const createEmployee = (employee, index) => ({
    id: index,
    ...employee
})

/** 
 * DataTable function to sort string rows using lowerCase
 */
const stringSortLowerCase = (selector) => ( rowA, rowB ) => {
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

/** 
 * DataTable function to sort string rows without using lowerCase
 */
const stringSort = (selector) => ( rowA, rowB ) => {
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

/** 
 * DataTable function to sort dates rows (dates as a string)
 */
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


/** 
 * DataTable definitions
*/
const columns = [
    {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
        sortFunction: stringSortLowerCase(row => row.firstName)
    },
    {
        name: 'Last Name',
        selector: row => row.lastName,
        sortable: true,
        sortFunction: stringSortLowerCase(row => row.lastName)
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
        sortFunction: stringSortLowerCase(row => row.department)
    },
    {
        name: 'Street',
        selector: row => row.street,
        sortable: true,
        sortFunction: stringSortLowerCase(row => row.street)
    },
    {
        name: 'City',
        selector: row => row.city,
        sortable: true,
        sortFunction: stringSortLowerCase(row => row.city)
    },
    {
        name: 'State',
        selector: row => row.state,
        sortable: true,
        sortFunction: stringSortLowerCase(row => row.state)
    },
    {
        name: 'Zip code',
        selector: row => row.zipCode,
        sortable: true,
        sortFunction: stringSort(row => row.zipCode)
    },
]

/**
 * Displays the CurrentEmployees page.
 * @returns {JSX.Element} - The JSX markup for the CurrentEmployees component page.
 */
function CurrentEmployees(){

    const currentEmployees = useSelector((state) => state.employees.data)

    const [dataTable, setDataTable] = useState()
    const [searchExpression, setSearchExpression] = useState("")
    const [isSearchExpressionError, setIsSearchExpressionError] = useState()
    
    /**
     * Updates the dataTable state based on the currentEmployees, searchExpression, and search input validity.
     * 
     * - If no search expression is provided or the search expression contains unauthorized characters,
     *   all current employees are displayed (with the latest additions first).
     * - If a valid search expression is provided, only the employees matching the search criteria are displayed.
     * 
     * Dependencies:
     * - currentEmployees: ensures dataTable updates when the employees data changes.
     * - isSearchExpressionError: checks whether the search input is valid.
     * - searchExpression: to filter the employees data based on the search criteria.
     */
    useEffect(() => {
        function generateDataTable() {
            // currentEmployees order is reversed, to show the last added employee first
            const reverseCurrentEmployees = [...currentEmployees].reverse()
            // if there is no search or search contains a unauthorized character
            if(searchExpression.length === 0 || isSearchExpressionError){
                return reverseCurrentEmployees.map(createEmployee)
            }
            // if search expression exist
            if(searchExpression.length >= 1){
                const searchExpressionLowerCase = searchExpression.toLowerCase()
                return reverseCurrentEmployees.filter((employee) => {
                    // convert all employee properties to lowercase
                    // and check if they contain the search expression
                    return Object.values(employee).some(value => 
                        value.toLowerCase().includes(searchExpressionLowerCase)
                    )
                }).map(createEmployee)
            }
        }
        setDataTable(generateDataTable())
    }, [currentEmployees, isSearchExpressionError, searchExpression])


    return(
        <main>
            <section className="content_width">
                <HeadWithSearch>
                    <h1 className="section-title"><span>Find</span> current employees.</h1>
                    <InputFieldText
                        label={"Search for an employee"}
                        placeHolder={"Type anything (name, zip code…)"}
                        icon={<IconSearch />}
                        isError={isSearchExpressionError}
                        errorMessage={errorMessages.get("inputTextSearch")}
                        onChange={(event) => validateInputText(event, "search", setSearchExpression, setIsSearchExpressionError)}
                    />
                </HeadWithSearch>
                {dataTable &&
                    <DataTable
                        columns={columns}
                        data={dataTable}
                        pagination
                        noDataComponent={"Whoops, there's no results found."}
                        customStyles={dataTableStyles}
                    />
                }
            </section>
        </main>
    )
}

export default CurrentEmployees