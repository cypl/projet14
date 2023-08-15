import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'
import Select from 'react-select'

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

const customStyles = (icon) => ({
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: icon ? '2rem' : provided.paddingLeft,
      borderWidth: '0'
    }),
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? `${colors.primary}` : `${colors.light2}`,
        '&:hover': {
            borderColor: state.isFocused ? `${colors.primary}` : `${colors.light2}`,
        },
        boxShadow: 'none',
        borderRadius: '4px',
    }),
    menu: (provided) => ({
        ...provided,
        borderColor: `${colors.light2}`,
        borderWidth: '1px', 
        borderStyle: 'solid',
        borderRadius: '4px',
        boxShadow: 'none'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? `${colors.primary}` : provided.backgroundColor,
        color: state.isSelected ? `#fff` : `${colors.secondary2}`,
        '&:hover': {
            backgroundColor: state.isSelected ? `${colors.primary}` : `${colors.primary1}`,
            color: state.isSelected ? `#fff` : `${colors.secondary2}`,
        }
    })
})

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
            styles={customStyles(icon)}
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