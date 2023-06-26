import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

function Header(){
    return(
        <>
            <HeaderContainer>
                <HeaderContent className="content_width">
                    <Branding><NavLink to="/">HRNET</NavLink></Branding>
                    <Menu>
                        <ul>
                            <li><MenuLink to="/">Current employees</MenuLink></li>
                            <li><MenuLink to="/create">Create</MenuLink></li>
                        </ul>
                    </Menu>
                </HeaderContent>
            </HeaderContainer>
        </>
    )
}

export default Header

const HeaderContainer = styled.header`
    border-bottom:1px solid rgba(0,0,0,0.1);
`
const Branding = styled.h1`
    font-size:24px;
    line-height:33px;
    font-weight:900;
    letter-spacing:-1px;
`
const HeaderContent = styled.div`
    padding:40px 0;
    display:flex;
    justify-content:space-between;
`
const Menu = styled.nav`
    & ul li{
        display:inline-block;
        line-height:33px;
    }
`
const MenuLink = styled(NavLink)`
    font-size:13px;
    text-transform:uppercase;
    padding:10px 15px;
    margin-left:15px;
    background-color:rgba(0,0,0,0.1);
    border-radius:4px;
    &.active{
        background-color:rgba(0,0,0,0.25);
    }
`