import { useEffect } from "react"
import Router from "./router/Router"
import { createGlobalStyle } from 'styled-components'
import { GetDataEmployees } from "./api/Api"
import { colors } from "./utils/colors"
import { useDispatch } from "react-redux"
import { setInitialData } from "./store/dataSlice"

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
    line-height:1.2;
  }
`

/**
 * The main application component.
 * This component sets up global styles, fetches initial employee data, and renders the main router.
 */
function App() {
  
  const dispatch = useDispatch()  
  const employees = GetDataEmployees()
  
  /**
   * useEffect hook to dispatch the initial employee data to the Redux store.
   * This effect runs when the employees data is loaded without any errors.
   */
  useEffect(()=> {
    if(employees.isLoaded && employees.isError === null){
      dispatch(setInitialData(employees.data)) 
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
