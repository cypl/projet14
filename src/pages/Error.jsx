import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import { Button } from "@mantine/core"

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

function Error(){
    return(
        <main>
            <SectionError className="content_width">
                <h1 className="section-title">Error <span>404</span></h1>
                <p>Sorry, this page doesn’t exist.</p>
                <BtnWrapper>
                    <Button><NavLink to="/">Go to homepage</NavLink></Button>
                </BtnWrapper>
            </SectionError>
        </main>
    )
}

export default Error