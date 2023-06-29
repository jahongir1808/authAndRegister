import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Profile, Login, Register } from "./pages";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOKEN } from "./const";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";

function App() {
  const token = localStorage.getItem(TOKEN);
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Navbar />
      <Routes>
        <Route
          element={token ? <Profile /> : <NotFound />}
          path={token ? "/home" : "/about"}
        />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<AboutUs />} path="/about" />
      </Routes>
    </Router>
  );
}

export default App;
