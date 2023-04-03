import { Outlet, Route, Routes } from "react-router-dom"
import { ProductList } from "../products/ProductList"
import { OrderForm } from "../orders/OrderForm"
import { ProductOrderList } from "../orders/ProductOrderList"


export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={

                <>
                    <h1>Queen Roots Natural Hair Care</h1>
                    <div> Where we believe healthy hair starts at the Root.</div>

                    <Outlet />
                </>
            }>
                <Route path= "QR.jpg" element={ <queenRootsImage /> } />
                <Route path="products" element={ <ProductList /> } />
                <Route path="order/create" element={ <OrderForm /> } />
                <Route path="orders" element={ <ProductOrderList /> } />
                
            </Route>
        </Routes>
    )
}