import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Admin from './components/admin/Admin'
import Shop from './components/shop/Shop'
import ShopProductList from './components/shop/ShopProductList'
import ShopCart from './components/shop/ShopCart'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import AdminDashboard from './components/admin/AdminDashboard'
import AddProductForm from './components/admin/AddProductForm'
import AdminViewProductList from './components/admin/AdminViewProductList'
import AdminProductInfo from './components/admin/AdminProductInfo'
import AdminLogin from './components/auth/AdminLogin'
import InProgress from './components/pages/InProgress'
import AuthProvider from './providers/AuthProvider'
import Checkout from './components/shop/Checkout'

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to="shop" />} />
                    <Route path="shop" element={<Shop />} >
                        <Route index element={<Navigate to="products" />} />
                        <Route path="products" element={<ShopProductList />} />
                        <Route path="cart" element={<ShopCart />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path='checkout' element={<Checkout />} />
                        <Route path='profile' element={<InProgress />} />
                    </Route>
                    <Route path="auth/admin-login" element={<AdminLogin />} />
                    <Route path={"admin"} element={<Admin />} >
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="add-product" element={<AddProductForm />} />
                        <Route path="products" element={<AdminViewProductList />} />
                        <Route path="product/:id" element={<AdminProductInfo />} />
                    </Route>

                    <Route path='*' element={<h1>Page not found!</h1>} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </AuthProvider>
    )
}