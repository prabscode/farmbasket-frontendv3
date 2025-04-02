import './App.css'
import { NavbarMenu } from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import Productspage from './pages/Productspage'
import Bundles from './pages/Bundles'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const authUserId = `user_${user?.sub?.split('|')[1] || Math.random().toString(36).substring(2, 10)}`;
      setUserId(authUserId);
      localStorage.setItem("userId", authUserId);
    } else {
      // Check localStorage as fallback
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        // If no stored userId exists, create a new anonymous one
        const anonymousId = `anon_${Math.random().toString(36).substring(2, 10)}`;
        setUserId(anonymousId);
        localStorage.setItem("userId", anonymousId);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <BrowserRouter>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products userId={userId} />} />
          <Route path="/products-page" element={<Productspage userId={userId} />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/cart" element={<div className="p-8">Cart Page Under Construction</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App