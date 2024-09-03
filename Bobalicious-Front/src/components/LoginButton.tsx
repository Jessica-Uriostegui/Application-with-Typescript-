import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button 
    onClick={() => loginWithRedirect()}
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
  
  
  >Log In</button>;
};

export default LoginButton;
