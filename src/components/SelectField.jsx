import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { selectStyles } from '../utils/selectStyles'

const InputField = styled(Select)`
    width:100%;
    font-size:0.875rem;
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
`

/**
 * Displays the select input for the application.
 * @returns {JSX.Element} - The JSX markup for the SelectField component.
 */
function SelectField({value, inputId, icon, isError, placeHolder, onChange, optionsSelect}){
    return(
        <InputField 
            value={value}
            inputId={inputId}
            placeholder={placeHolder.length > 0 && placeHolder} 
            onChange={onChange}
            options={optionsSelect}
            isSearchable={true}
            className={`${isError ? "input-error" : ""}`}
            styles={selectStyles(icon)}
        />
    )
}

export default SelectField

SelectField.propTypes = {
    value: PropTypes.object,
    inputId: PropTypes.string,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    optionsSelect: PropTypes.array,
}