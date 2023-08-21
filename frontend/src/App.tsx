import "./App.css";
import RegPage from "./pages/registration_page/registraion_form";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/loginPage/login_form";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users/reg" element={<RegPage />} />
        <Route path="/users/profile" element={<RegPage />} />
      </Routes>
    </div>
  );
}

export default App;
