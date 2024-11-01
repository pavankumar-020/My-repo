import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function GoogleLoginComponent({ onLoginSuccess }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    const userProfile = decodeJwt(credentialResponse.credential);
    setUserName(userProfile.name);
    setIsLoggedIn(true);
    onLoginSuccess(); // Notify parent component about login success
  };

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };

  return (
    <>
      {!isLoggedIn ? (
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={(error) => console.error('Login Failed:', error)} // Handle login errors
        />
      ) : (
        <h2>Welcome, {userName}!</h2> // Display the user's name
      )}
    </>
  );
}

export default GoogleLoginComponent;
