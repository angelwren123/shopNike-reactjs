import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import ContactPage from './pages/ContactPage'
import DetailProductPage from './pages/DetailProductPage'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import ProductsPage from './pages/ProductsPage'
import ProtectedRouters from './ProtectedRouters'
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage /> } />
      <Route element={<ProtectedRouters/>}>
        <Route path="/product/:id" element={<DetailProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default Routers