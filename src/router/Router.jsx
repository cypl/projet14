import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalProvider } from "react-modal-classic"
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Loader from '../pages/Loader'

// Charge page components using lazy
const CurrentEmployees = lazy(() => import('../pages/CurrentEmployees'))
const AddEmployee = lazy(() => import('../pages/AddEmployee'))
const Error = lazy(() => import('../pages/Error'))

/**
 * Defines the main routing structure for the application.
 * 
 * The application is wrapped with a `ModalProvider` to enable modal display functionality
 * throughout the app. The `Header` component is consistently displayed at the top of the 
 * application across all routes, whereas the `Footer` is displayed at the bottom.
 * 
 * @returns {JSX.Element} - The JSX markup for the Router component.
 */
function Router() {
    return (
        <BrowserRouter>
            <ModalProvider>
                <Header />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<CurrentEmployees />} />
                        <Route path="/add" element={<AddEmployee />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Suspense>
                <Footer />
            </ModalProvider>
        </BrowserRouter>
    );
}

export default Router