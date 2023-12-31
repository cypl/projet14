import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
    & .react-datepicker{
        border:1px solid ${colors.light2};
        font-size:0.75rem;
    }
    & .react-datepicker__header{
        background-color:${colors.light1};
        border-bottom:1px solid ${colors.light2};
    }
    & .react-datepicker__current-month{color:${colors.secondary2};font-size:0.875rem;font-weight:500;}
    & .react-datepicker__header{color:${colors.secondary2};}
    & .react-datepicker__day-name{color:${colors.secondary2};}
    & .react-datepicker__year-read-view--down-arrow{margin-top:2px;}
    & .react-datepicker__day{
        color:${colors.primary};
        &:hover{
            background-color:${colors.light1};
        }
        &.react-datepicker__day--disabled{
            color:${colors.light2};
            &:hover{
                background-color:transparent;
            }
        }
        &.react-datepicker__day--selected{
            background-color:${colors.primary};
            color:#fff;
        }
        &.react-datepicker__day--keyboard-selected{
            background-color:${colors.primary1};
        }
        &.react-datepicker__day--today{
            font-weight:900;
        }
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

/**
 * Displays the date input for the application.
 * @returns {JSX.Element} - The JSX markup for the DateField component.
 */
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