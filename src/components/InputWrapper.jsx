import styled from 'styled-components'
import { colors } from '../utils/colors'
import PropTypes from 'prop-types'


function InputWrapper({ label, description, inputId, isRequired, icon, isError, errorMessage, children }){
    
    return (
        <InputContainer>
            {label && label.length > 0 &&
                <InputLabel htmlFor={inputId}>
                    {label}{isRequired && <span className="is-required">*</span>}
                </InputLabel>
            }
            {description && description.length > 0 &&
                <Description>{description}</Description>
            }
            <InputFieldWrapper>
                {icon && 
                    <InputFieldIcon className={isError && "input-error"}>
                        {icon}
                    </InputFieldIcon>
                }
                {children}
            </InputFieldWrapper>
            {isError && <ErrorMessage>{errorMessage.length > 0 && errorMessage}</ErrorMessage>}
        </InputContainer>
    )
}

export default InputWrapper

InputWrapper.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    inputId: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.element,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    children: PropTypes.any,
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
    z-index:1;
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
const InputContainer = styled.div`
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
const Description = styled.p`
    font-size:0.75rem;
    line-height:1;
    padding:0.1rem 0 0.4rem 0;
    color:${colors.secondary2};
`
const ErrorMessage = styled.p`
    font-size:0.75rem;
    color:${colors.error};
    line-height: 1;
    padding-top: 0.35rem;
`