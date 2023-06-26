import styled from 'styled-components'

const currentYear = new Date().getFullYear()

function Footer(){
    return(
        <FooterContainer>
            <FooterContent className="content_width">
                <p className="legende">©{currentYear} HRNET - Wealth Health</p>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
    border-top:1px solid rgba(0,0,0,0.1);
`
const FooterContent = styled.div`
    padding:20px 0;
`