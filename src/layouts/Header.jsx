import styled from 'styled-components'
import { colors } from '../utils/colors'
import { NavLink } from 'react-router-dom'

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
const Menu = styled.nav`
    & ul li{
        display:inline-block;
        line-height:33px;
    }
`
const MenuLink = styled(NavLink)`
    color:${colors.primary};
    font-size:12px;
    text-transform:uppercase;
    padding:8px 12px;
    margin-left:15px;
    border:1px solid ${colors.light1};
    background-color:transparent;
    border-radius:4px;
    transition:0.1s background-color ease-in-out, 0.1s border-color ease-in-out;
    &.active{
        border:1px solid ${colors.primary};
        background-color:${colors.primary};
        color:#fff;
        transition:0.1s background-color ease-in-out, 0.1s border-color ease-in-out;
    }
    &:hover{
        border:1px solid transparent;
        background-color:${colors.light1};
        transition:0.1s background-color ease-in-out, 0.1s border-color ease-in-out;
        &.active{
            border:1px solid ${colors.primary};
            background-color:${colors.primary};
            color:#fff;
            transition:0.1s background-color ease-in-out, 0.1s border-color ease-in-out;
        }
    }
    & svg{
        fill: ${colors.primary1};
        height:12px;
        margin-right:7px;
        vertical-align:-1px;
    }
`

function Header(){
    return(
        <>
            <HeaderContainer>
                <HeaderContent className="content_width">
                    <Branding><NavLink to="/"><span>HR</span>net</NavLink></Branding>
                    <Menu>
                        <ul>
                            <li>
                                <MenuLink to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
                                    Find
                                </MenuLink>
                            </li>
                            <li>
                                <MenuLink to="/create">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                                    Create
                                </MenuLink>
                            </li>
                        </ul>
                    </Menu>
                </HeaderContent>
            </HeaderContainer>
        </>
    )
}

export default Header