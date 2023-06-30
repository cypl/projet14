import { useEffect } from "react"
import Router from "./router/Router"
import { createGlobalStyle } from 'styled-components'
import { GetDataEmployees } from "./api/Api"
import { colors } from "./utils/colors"
import { useDispatch } from "react-redux"
import { setInitialData } from "./store/dataSlice"

function App() {
  
  const dispatch = useDispatch()  
  const employees = GetDataEmployees()
  
  useEffect(()=> {
    if(employees.isLoaded && employees.isError === null){
      const employeesData = employees.data
      // transform object to array
      const employeesList = employeesData.map(obj => [
        obj.firstName,
        obj.lastName,
        obj.dateOfBirth,
        obj.startDate,
        obj.department,
        obj.street,
        obj.city,
        obj.state,
        obj.zipCode
      ])
      dispatch(setInitialData(employeesList)) 
    }
  }, [dispatch, employees.data, employees.isError, employees.isLoaded])



  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  html {
    color: ${colors.secondary2};
    background-color:${colors.light1};
  }
  .section-title{
    font-weight:900;
    letter-spacing:-1px;
  }
  .section-title span{
    color: ${colors.primary};
  }
  h1.section-title{
    margin-bottom:1rem;
  }
`