import InputWrapper from "./InputWrapper"
import DateField from "./DateField"
import PropTypes from 'prop-types'

/**
 * Displays a date input field for the application.
 * @returns {JSX.Element} - The JSX markup for the InputFieldDate component.
 */
function InputFieldDate({ label, description, isRequired, placeHolder, value, icon, isError, errorMessage, onChange, maxDate }){

    const inputId = label ? `input-${label.replace(/[^a-zA-Z0-9]/g, '')}` : undefined

    return(
        <InputWrapper
            label={label}
            description={description}
            inputId={inputId}
            isRequired={isRequired} 
            placeHolder={placeHolder} 
            icon={icon} 
            isError={isError} 
            errorMessage={errorMessage}
            >
            <DateField 
                value={value} 
                inputId={inputId}
                icon={icon} 
                isError={isError} 
                placeHolder={placeHolder} 
                onChange={onChange}
                maxDate={maxDate}
            />
        </InputWrapper>
    )
}

export default InputFieldDate

InputFieldDate.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    value: PropTypes.object,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    maxDate: PropTypes.object,
}