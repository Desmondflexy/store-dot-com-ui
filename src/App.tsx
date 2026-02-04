import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getRoutePath } from './utils/helpers'
import { ROUTES_PATH } from './utils/constants'
import { Auth } from './components/auth/Auth'
import { ToastContainer } from 'react-toastify'
import { Admin } from './components/admin/Admin'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRoutePath(ROUTES_PATH.HOME)} element={<div>Hello World</div>} />
                <Route path={getRoutePath(ROUTES_PATH.AUTH, true)} element={<Auth />} />
                <Route path={getRoutePath(ROUTES_PATH.ADMIN, true)} element={<Admin />} />
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    )
}

export default App
