import { Navigate, Route, Routes } from "react-router-dom";
import { getRoutePath } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import ShopProductList from "./ShopProductList";
import ShopNavMenu from "./ShopNavMenu";
import CartProvider from "../../providers/CartProvider";
import ShopCart from "./ShopCart";

export default function Shop() {
    return <div>
        <CartProvider>
            <ShopNavMenu />
            <Routes>
                <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.SHOP_PRODUCTS)} />} />
                <Route path={getRoutePath(ROUTES_PATH.SHOP_PRODUCTS)} element={<ShopProductList />} />
                <Route path={getRoutePath(ROUTES_PATH.SHOPPING_CART)} element={<ShopCart />} />

                <Route path='*' element={<h1>Page not found!</h1>} />
            </Routes>
        </CartProvider>
    </div>
}
