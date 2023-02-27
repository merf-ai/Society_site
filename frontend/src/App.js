import logo from './logo.svg';
import './App.css';
import RegPage from './components/templates/registration_page/registraion_form';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/templates/loginPage/login_form';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path='/users/reg' element={<RegPage />}/>
        <Route path='/users/profile' element={<RegPage />}/>
      </Routes>
    </div>
  );
}

export default App;
