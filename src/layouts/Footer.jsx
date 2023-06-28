import styled from 'styled-components'
import { colors } from '../utils/colors'

const currentYear = new Date().getFullYear()

function Footer(){
    return(
        <FooterContainer>
            <FooterContent className="content_width">
                <p className="legende">©{currentYear} HRnet - Wealth Health</p>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
    border-top:1px solid ${colors.light2};
`
const FooterContent = styled.div`
    padding:40px 0;
`