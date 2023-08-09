import styled from 'styled-components'
import { colors } from '../utils/colors'

const FooterContainer = styled.footer`
    border-top:1px solid ${colors.light2};
`
const FooterContent = styled.div`
    padding:40px 0;
`

const currentYear = new Date().getFullYear()

/**
 * Displays the footer of the application.
 * @returns {JSX.Element} - The JSX markup for the Footer component.
 */
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