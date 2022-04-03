import CardComponent from '../components/card-component';
import LinkComponent from '../components/link-component';
import LogoComponent from '../components/logo-component';

export default function SuccessfullyChangedPassword() {
  return (
    <div>
      <div className="login__wrapper">
        <div className="centered__card">
          <LogoComponent className="center down logo__pos" />
          <CardComponent>
            <p className=" word_rule main">Parola dumneavoastră a fost schimbată cu succes!</p>
            <div className="password">
              <p className="word_rule">
                Vă puteți întoarce acum la &nbsp;
                {' '}
              </p>

              <LinkComponent
                className="word_rule link"
                path="/"
                label="log in"
              />
              {' '}
              <p className="word_rule"> &nbsp; pagină și vă puteți introduce noile credențiale </p>
            </div>
            <p className="word_rule">
              folosind parola pe care tocmai ați setat-o.
            </p>

          </CardComponent>
        </div>
      </div>
    </div>
  );
}
