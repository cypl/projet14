import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'
import { validateInputText } from '../utils/validationsForm'


function InputTextCy({ label, isRequired, placeHolder, icon, match, setText, setIsError, isError, errorMessage }){
    return(
        <InputWrapper>
            
            {label && label.length > 0 &&
                <InputLabel>
                    {label}{isRequired && <span className="is-required">*</span>}
                </InputLabel>
            }
            
            <InputFieldWrapper>
                {icon && 
                    <InputFieldIcon className={isError && "input-error"}>
                        {icon}
                    </InputFieldIcon>
                }
                <InputField 
                    type="text" 
                    placeholder={placeHolder.length > 0 && placeHolder} 
                    onChange={(event) => validateInputText(event, match, setText, setIsError)} 
                    className={`${isError ? "input-error" : ""} ${icon ? "input-icon" : ""}`}
                />
            </InputFieldWrapper>

            {isError && <ErrorMessage>{errorMessage.length > 0 && errorMessage}</ErrorMessage>}

        </InputWrapper>
    )
}

export default InputTextCy

InputTextCy.propTypes = {
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    icon: PropTypes.element,
    match: PropTypes.oneOf(["text-and-numbers", "text-only", "search"]).isRequired,
    setText: PropTypes.func,
    setIsError: PropTypes.func,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
}

const InputFieldWrapper = styled.div`
    position:relative;
`
const InputFieldIcon = styled.div`
    position:absolute;
    height:100%;
    width:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    & svg{
        height:0.875rem;
        width:auto;
        color:${colors.secondary2};
        opacity:0.5;
    }
    &.input-error svg{
        color:${colors.error};
        opacity:1;
    }
`
const InputWrapper = styled.div`
    padding-bottom:8px;
`
const InputLabel = styled.label`
    width:100%;
    font-size:0.875rem;
    font-weight:500;
    line-height:1;
    color:${colors.secondary2};
    padding-bottom:0.2rem;
    & .is-required{
        color:${colors.primary};
        margin-left:3px;
    }
`
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
        opacity:0.5;
    }
    &.input-error{
        border:1px solid ${colors.error};
        transition:0.1s border-color ease-in-out;
        color:${colors.error};
    }
    &.input-icon{
        padding-left:2rem;
    }
`
const ErrorMessage = styled.p`
    font-size:0.75rem;
    color:${colors.error};
    line-height: 1;
    padding-top: 0.35rem;
`