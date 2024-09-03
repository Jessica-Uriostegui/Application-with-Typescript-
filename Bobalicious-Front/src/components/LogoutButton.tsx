import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button 
    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    style={{
      backgroundColor: "rgb(98, 186, 189)",
        color: "white",
        padding: "3px 10px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",

    }}  

  >Log Out</button>
  
};

export default LogoutButton;