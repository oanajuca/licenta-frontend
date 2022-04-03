import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import TrailPage from './pages/trail-page';
import EditTrailPage from './pages/edittrail-page';
import NewTrailPage from './pages/addnewtrail';
import ChangePassword from './pages/change-password-page';
import SuccessfullyChangedPassword from './templates/SuccessfullyChangedPassword';
import UserContextProvider from './helpers/UseContext/UserContextProvider';


function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path ="/register" element={<RegisterPage />} />
      <Route path ="/home" element={<HomePage />} />
      <Route exact path = "/trail/:id" element={<TrailPage />} />
      <Route exact  = "/addnewtrail" element={<NewTrailPage />} />
      <Route path="edit/:id" element={<EditTrailPage />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/successfully" element={<SuccessfullyChangedPassword />} /> 
    </Routes>
    </UserContextProvider>
  );
}

export default App;