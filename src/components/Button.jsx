import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../utils/colors'

const ButtonComponent = styled.button`
    border:none;
    font-size:0.875rem;
    white-space:nowrap;
    font-weight:600;
    padding:0 1.125rem;
    height:2.25rem;
    border-radius:0.25rem;
    cursor:pointer;
    background-color:${colors.primary};
    border:0.0625rem solid ${colors.primary};
    transition:0.1s background-color ease-in-out;
    color:#fff;
    &.button-icon{
        display: flex;
        align-items: center;
        padding-left:0.875rem;
    }
    &:hover{
        background-color:${colors.primary2};
        transition:0.1s background-color ease-in-out;
    }
    &.button-deactivate{
        background-color:${colors.light1};
        border:0.0625rem solid ${colors.light1};
        color:${colors.secondary2};
        cursor:not-allowed;
        &:hover{
            background-color:${colors.light1};
            color:${colors.secondary2};
        }
    }
    &.outline{
        background-color:transparent;
        color:${colors.primary};
        transition:0.1s background-color ease-in-out;
        &:hover{
            background-color:${colors.primary1};
            transition:0.1s background-color ease-in-out;
        }
        &.button-deactivate{
            background-color:${colors.light1};
            border:0.0625rem solid ${colors.secondary1};
            color:${colors.secondary2};
            cursor:not-allowed;
            &:hover{
                background-color:${colors.light1};
            }
        }
    }
    & .svg-wrapper{
        height:100%;
        width:1.4rem;
        display:flex;
        align-items:center;
        justify-content:left;
        & svg{
            height:1rem;
            width:auto;
        }
    }
`

/**
 * Displays the Button component.
 * @returns {JSX.Element} - The JSX markup for the Button component.
 */
function Button({text, onClick, outline, deactivate, icon, className}){

    return(
        <ButtonComponent onClick={!deactivate ? onClick : (event) => event.preventDefault()} className={`${outline && "outline"} ${icon && "button-icon"} ${deactivate && "button-deactivate"} ${className && className}`}>
            {icon &&
                <span className="svg-wrapper">
                    {icon}
                </span>
            }
            {text}
        </ButtonComponent>
    )
}

export default Button

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    deactivate: PropTypes.bool,
    icon: PropTypes.element,
    className: PropTypes.string,
}