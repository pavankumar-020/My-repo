import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginComponent from "./GoogleLoginComponent";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Cart from "./Cart";
import PurchaseHistory from "./PurchaseHistory";
import './App.css';
import { useState } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  const totalitems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return (
    <GoogleOAuthProvider clientId="36134673297-7qt6ostq5nalnkmml3mt0f2ofkhdhv0h.apps.googleusercontent.com">
      <BrowserRouter>
        {!isLoggedIn ? (
          <>
          <h3>Welcome to login page</h3>
          <GoogleLoginComponent onLoginSuccess={() => handleLoginSuccess(userName)} /></>
        ) : (
          <>
            <nav>
              <Link to='/Home'>My Shop</Link>
              <Link to='/Veg'>Veg</Link>
              <Link to='/NonVeg'>Nonveg</Link>
              <Link to='/Cart'>Cart {totalitems}</Link>
              <Link to='/PurchaseHistory'>Purchase History</Link>
            </nav>
            <h2>Welcome, {userName}!</h2> {/* Display welcome message here */}
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Veg" element={<Veg />} />
              <Route path="/NonVeg" element={<NonVeg />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
              <Route path="*" element={<Navigate to="/Home" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
