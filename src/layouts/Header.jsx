import styled from 'styled-components'
import { colors } from '../utils/colors'
import { NavLink } from 'react-router-dom'
import { Menu, Button } from '@mantine/core'

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
function Header(){
    return(
        <>
            <HeaderContainer>
                <HeaderContent className="content_width">
                    <Branding><NavLink to="/"><span>HR</span>net</NavLink></Branding>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button>Menu</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component={NavLink} to="/create">Create new employee</Menu.Item>
                                <Menu.Item component={NavLink} to="/">Find current employees</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                </HeaderContent>
            </HeaderContainer>
        </>
    )
}

export default Header