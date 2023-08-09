import { NavLink } from 'react-router-dom'
import { Menu, Button } from '@mantine/core'
import { IconTable, IconUser } from '../utils/Icons'

/**
 * Displays the navigation menu of the application.
 * @returns {JSX.Element} - The JSX markup for the NavigationMenu component.
 */
function NavigationMenu(){
    return(
        <Menu shadow="md" width={150} withArrow={true}>
            <Menu.Target>
                <Button>Menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>HR Employees</Menu.Label>
                <Menu.Item component={NavLink} to="/create" icon={<IconUser/>}>Add new</Menu.Item>
                <Menu.Item component={NavLink} to="/" icon={<IconTable/>}>Current list</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default NavigationMenu