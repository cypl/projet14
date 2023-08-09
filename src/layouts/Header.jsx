import styled from 'styled-components'
import { colors } from '../utils/colors'
import { NavLink } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'

const HeaderContainer = styled.header`
    border-bottom:1px solid ${colors.light1};
    background-color:#fff;
`
const Branding = styled.h1`
    font-size:24px;
    line-height:33px;
    font-weight:900;
    letter-spacing:-1px;
    & span{
        color:${colors.primary};
    }
`
const HeaderContent = styled.div`
    padding:40px 0;
    display:flex;
    justify-content:space-between;
`

/**
 * Displays the header of the application.
 * @returns {JSX.Element} - The JSX markup for the Header component.
 */
function Header(){
    return(
        <HeaderContainer>
            <HeaderContent className="content_width">
                <Branding><NavLink to="/"><span>HR</span>net</NavLink></Branding>
                    <NavigationMenu />
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header