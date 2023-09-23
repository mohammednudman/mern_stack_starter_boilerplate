import axios from "axios";
import Routes from "./components/Routes.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/api";
  axios.defaults.withCredentials = true;

  return (
        <Routes />
  )
}

export default App
