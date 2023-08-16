import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'

const InputField = styled.input`
    width:100%;
    line-height:1;
    font-size:0.875rem;
    padding:10px 8px;
    border-radius:4px;
    border:1px solid ${colors.light2};
    transition:0.1s border-color ease-in-out;
    color:${colors.secondary2};
    &:focus{
        outline:none;
        border:1px solid ${colors.primary};
        transition:0.1s border-color ease-in-out;
    }
    &::placeholder{
        opacity:1;
        color:${colors.secondary};
    }
    &.input-error{
        border:1px solid ${colors.error};
        transition:0.1s border-color ease-in-out;
        color:${colors.error};
        &::placeholder{
            opacity:1;
            color:${colors.error};
        }
    }
    &.input-icon{
        padding-left:2rem;
    }
`

/**
 * Displays the text input for the application.
 * @returns {JSX.Element} - The JSX markup for the TextField component.
 */
function TextField({value, inputId, isRequired, icon, isError, placeHolder, onChange}){
    return(
        <InputField 
            type="text" 
            id={inputId}
            aria-required={isRequired ? "true" : "false"}
            aria-invalid={isError ? "true" : "false"}
            value={value}
            placeholder={placeHolder.length > 0 && placeHolder} 
            onChange={onChange} 
            className={`${isError ? "input-error" : ""} ${icon ? "input-icon" : ""}`}
        />
    )
}

export default TextField

TextField.propTypes = {
    value: PropTypes.string,
    inputId: PropTypes.string,
    isRequired: PropTypes.bool,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
}