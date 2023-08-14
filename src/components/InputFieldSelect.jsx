import InputWrapper from "./InputWrapper"
import SelectField from "./SelectField"
import PropTypes from 'prop-types'


function InputFieldSelect({ label, description, isRequired, placeHolder, value, icon, isError, errorMessage, onChange, optionsSelect }){

    const inputId = label ? `input-${label.replace(/[^a-zA-Z0-9]/g, '')}` : undefined

    return(
        <InputWrapper
            label={label}
            description={description}
            inputId={inputId}
            isRequired={isRequired} 
            placeHolder={placeHolder} 
            value={value} 
            icon={icon} 
            isError={isError} 
            errorMessage={errorMessage}
            >
            <SelectField 
                value={value}
                inputId={inputId}
                icon={icon}
                isError={isError}
                placeHolder={placeHolder}
                onChange={onChange}
                optionsSelect={optionsSelect}
            />
        </InputWrapper>
    )

}

export default InputFieldSelect 

InputFieldSelect.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    optionsSelect: PropTypes.array,
}