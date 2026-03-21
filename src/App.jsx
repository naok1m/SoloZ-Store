import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import Navbar from './components/Navbar'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import Cart from './pages/Cart'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

// Layout com Navbar para páginas públicas
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Rotas públicas (com Navbar) */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
              <Route path="/product/:id" element={<MainLayout><ProductPage /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />

              {/* Rotas admin (sem Navbar) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/products" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/categories" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}
