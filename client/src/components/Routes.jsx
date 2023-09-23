import React, { useContext } from "react";
import RegisterAndLogin from "../pages/RegisterAndLogin.jsx";
import { UserContext } from "../context/UserContext.jsx";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) return "logged in" + username;
  return <RegisterAndLogin />;
};
export default Routes;
