import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import NavigationBar from "../NavigationBar";


const ProfilePage = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  getAccessTokenSilently().then((token) => console.log(token))
  return (
    <>
      <NavigationBar />
      {isAuthenticated ? <Profile /> : <h1>Please Try Logging In Again</h1>}
    </>
  );
};

export default ProfilePage;
