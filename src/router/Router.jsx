import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalProvider } from "react-modal-classic"
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import CurrentEmployees from '../pages/CurrentEmployees'
import CreateEmployee from '../pages/CreateEmployee'
import Error from '../pages/Error'

/**
 * Displays the routes of the application.
 * @returns {JSX.Element} - The JSX markup for the Router component.
 */
function Router(){
    return (
        <BrowserRouter>
            <ModalProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<CurrentEmployees />} />
                    <Route path="/create" element={<CreateEmployee />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </ModalProvider>
        </BrowserRouter>
    )
}

export default Router