import { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from '@mantine/core'
import styled from 'styled-components'
import { ModalContext } from "react-modal-classic"
import { colors } from '../utils/colors'

const ContentModal = styled.div`
    padding:30px;
    text-align:center;
    & .modal-content-newemployee{
        padding-bottom:20px;
        & strong{
            font-weight:900;
            color:${colors.primary};
        }
    }
    & .modal-content-button{
        margin:0 10px;
    }
`

/**
 * Displays the content of the modal, after successfull form submit (see CreateEmployee page component).
 * @returns {JSX.Element} - The JSX markup for the SuccessModalContent component.
 */
function SuccessModalContent(){
    
    const currentEmployees = useSelector((state) => state.employees.data)
    const reverseCurrentEmployees = [...currentEmployees].reverse()
    
    const { closeModal } = useContext(ModalContext)
    const navigate = useNavigate()

    function checkTheList(){
        closeModal()
        navigate("/")
    }

    return (
        <ContentModal>
            <p className="modal-content-newemployee">New employee added:<br/>
            <strong>{reverseCurrentEmployees[0].firstName} {reverseCurrentEmployees[0].lastName}</strong></p>
            <Button variant={"outline"} onClick={closeModal} className="modal-content-button">Add a new one</Button>
            <Button onClick={checkTheList} className="modal-content-button">Check the list</Button>
        </ContentModal>
    )
}

export default SuccessModalContent