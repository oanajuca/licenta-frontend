import LogoComponent from '../components/logo-component';
import ChangePass from '../templates/ChangePassword';
import './change-password-page.css';

export default function ChangePassword() {
  return (
    <div className="login__wrapper">
      <LogoComponent className="center down logo__pos" />
      <ChangePass />
    </div>
  );
}
