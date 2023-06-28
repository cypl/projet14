import Router from "./router/Router"
import { createGlobalStyle } from 'styled-components'
import { colors } from "./utils/colors"

function App() {
  
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