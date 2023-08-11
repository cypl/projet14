import styled from 'styled-components'
import { colors } from '../utils/colors'

function InputTextCy(){
    return(
        <InputWrapper>
            <InputLabel>Label<span className="is-required">*</span></InputLabel>
            <InputField type="text" placeholder="Ecrire un truc"></InputField>
            <ErrorMessage>Error message</ErrorMessage>
        </InputWrapper>
    )
}

export default InputTextCy

const InputWrapper = styled.div`
    padding-bottom:8px;
`
const InputLabel = styled.label`
    width:100%;
    font-size:0.875rem;
    font-weight:500;
    line-height:1;
    color:${colors.secondary2};
    padding-bottom:0.1rem;
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
    color:${colors.secondary2};
    &:focus{
        outline:none;
        border:1px solid ${colors.primary};
    }
    &::placeholder{
        opacity:0.5;
    }
`
const ErrorMessage = styled.p`
    font-size:0.875rem;
    color:red;
`