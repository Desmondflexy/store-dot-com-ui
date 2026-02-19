import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getRoutePath } from './utils/helpers'
import { ROUTES_PATH } from './utils/constants'
import { Auth } from './components/auth/Auth'
import { ToastContainer } from 'react-toastify'
import { Admin } from './components/admin/Admin'
import Shop from './components/shop/Shop'
import UserProvider from './providers/UserProvider'

function App() {

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.SHOP)} />} />
                    <Route path={getRoutePath(ROUTES_PATH.SHOP, true)} element={<Shop />} />
                    <Route path={getRoutePath(ROUTES_PATH.AUTH, true)} element={<Auth />} />
                    <Route path={getRoutePath(ROUTES_PATH.ADMIN, true)} element={<Admin />} />

                    <Route path='*' element={<h1>Page not found!</h1>} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
