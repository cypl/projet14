import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../utils/colors'

const Menu = styled.ul`
    line-height:1;
    display:flex;
    align-items:center;
    font-size:0.875rem;
`
const MenuItem = styled.li`
    line-height:1;
    margin: 0 0.4rem;
    &:last-child{
        margin-right:0;
    }
    & a{
        padding:5px 0;
        color:${colors.secondary2};
        border-bottom:transparent;
        transition:0.1s color ease-in-out, 0.1s border-color ease-in-out;
        &:hover{
            color:${colors.primary2};
            border-bottom:1px solid ${colors.primary1};
            transition:0.1s color ease-in-out, 0.1s border-color ease-in-out;
        }
    }
    & a.active{
        color:${colors.primary2};
        border-bottom:1px solid ${colors.primary1};
        transition:0.1s color ease-in-out, 0.1s border-color ease-in-out;
    }
`
/**
 * Displays the navigation menu of the application.
 * @returns {JSX.Element} - The JSX markup for the NavigationMenu component.
 */
function NavigationMenu(){
    return(
        <Menu>
            <MenuItem>
                <NavLink to="/add">Add new</NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink to="/">Current list</NavLink>
            </MenuItem>
        </Menu>
    )
}

export default NavigationMenu