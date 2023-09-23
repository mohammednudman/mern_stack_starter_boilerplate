import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const RegisterAndLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(`/auth/${url}`, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type={"text"}
          placeholder={"username"}
          className={"block w-full rounded-sm p-2 mb-2 border"}
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type={"password"}
          placeholder={"password"}
          className={"block w-full rounded-sm p-2 mb-2 border"}
        />
        <button
          className={"bg-blue-500 text-white block w-full rounded-sm p-2"}
        >
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className={"text-center mt-2"}>
          {isLoginOrRegister === "register" && (
            <div>
              Already registered?
              <button onClick={() => setIsLoginOrRegister("login")}>
                Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Don't have an account?
              <button onClick={() => setIsLoginOrRegister("register")}>
                Register Here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLogin;
