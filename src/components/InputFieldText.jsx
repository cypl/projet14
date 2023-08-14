import InputWrapper from "./InputWrapper"
import TextField from "./TextField"
import PropTypes from 'prop-types'


function InputFieldText({ label, description, isRequired, placeHolder, value, icon, isError, errorMessage, onChange }){

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
            <TextField 
                value={value} 
                inputId={inputId}
                isRequired={isRequired}
                icon={icon} 
                isError={isError} 
                placeHolder={placeHolder} 
                onChange={onChange}
            />
        </InputWrapper>
    )

}

export default InputFieldText 

InputFieldText.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
}