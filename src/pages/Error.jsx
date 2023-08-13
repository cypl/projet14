import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import Button from "../components/Button"

const SectionError = styled.section`
    & .section-title{
        text-align:center;
    }
    & p{
        text-align:center;
    }
`
const BtnWrapper = styled.div`
    padding-top:20px;
    display:flex;
    justify-content:center;
`

/**
 * Displays the error page.
 * @returns {JSX.Element} - The JSX markup for the Error page component.
 */
function Error(){
    return(
        <main>
            <SectionError className="content_width">
                <h1 className="section-title">Error <span>404</span></h1>
                <p>Sorry, this page doesn’t exist.</p>
                <BtnWrapper>
                    <NavLink to="/">
                        <Button
                            text="Go to homepage"
                        />
                    </NavLink>
                </BtnWrapper>
            </SectionError>
        </main>
    )
}

export default Error