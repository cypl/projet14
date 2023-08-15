import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateField({value, inputId, icon, isError, placeHolder, maxDate, onChange}){
    return(
        <InputFieldWrapper>
            <InputField 
                selected={value}
                id={inputId}
                placeholderText={placeHolder}
                dateFormat="MM-dd-yyyy"
                onChange={onChange}
                maxDate={maxDate}
                className={`${isError ? "input-error" : ""} ${icon ? "input-icon" : ""}`}
                showYearDropdown
                scrollableYearDropdown
            />
        </InputFieldWrapper>
    )
}

export default DateField

DateField.propTypes = {
    value: PropTypes.object,
    inputId: PropTypes.string,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    placeHolder: PropTypes.string,
    maxDate: PropTypes.object,
    onChange: PropTypes.func,
}
const InputFieldWrapper = styled.div`
    & .react-datepicker-popper{
        z-index:2;
    }
    & .react-datepicker-wrapper{
        width:100%;
    }
    & .react-datepicker__triangle{
        display:none;
    }
`
const InputField = styled(DatePicker)`
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