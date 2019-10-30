import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';

import AuthPage from './AuthPage.jsx';

const JoinPage = () => {
  const [errors, setErrors] = useState({});
  const [redirectTo, setRedirectTo] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    const email = this.email.value;
    const password = this.password.value;
    const confirm = this.confirm.value;
    const newErrors = {};

    if (!email) {
      newErrors.email = i18n.__('pages.authPageJoin.emailRequired');
    }
    if (!password) {
      newErrors.password = i18n.__('pages.authPageJoin.passwordRequired');
    }
    if (confirm !== password) {
      newErrors.confirm = i18n.__('pages.authPageJoin.passwordConfirm');
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        setErrors({ none: err.reason });
      }
      setRedirectTo('/');
    });
  };

  const errorMessages = Object.values(errors);
  const errorClass = key => errors[key] && 'error';

  const link = (
    <Link to="/signin" className="link-auth-alt">
      {i18n.__('pages.authPageJoin.haveAccountSignIn')}
    </Link>
  );

  return redirectTo
    ? <Redirect to={redirectTo} />
    : (
      <AuthPage link={link}>
        <div className="wrapper-auth">
          <h1 className="title-auth">
            {i18n.__('pages.authPageJoin.join')}
          </h1>
          <p className="subtitle-auth">
            {i18n.__('pages.authPageJoin.joinReason')}
          </p>
          <form onSubmit={onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <div className={`input-symbol ${errorClass('email')}`}>
              <input
                type="email"
                name="email"
                ref={(c) => { this.email = c; }}
                placeholder={i18n.__('pages.authPageJoin.yourEmail')}
              />
              <span
                className="icon-email"
                title={i18n.__('pages.authPageJoin.yourEmail')}
              />
            </div>
            <div className={`input-symbol ${errorClass('password')}`}>
              <input
                type="password"
                name="password"
                ref={(c) => { this.password = c; }}
                placeholder={i18n.__('pages.authPageJoin.password')}
              />
              <span
                className="icon-lock"
                title={i18n.__('pages.authPageJoin.password')}
              />
            </div>
            <div className={`input-symbol ${errorClass('confirm')}`}>
              <input
                type="password"
                name="confirm"
                ref={(c) => { this.confirm = c; }}
                placeholder={i18n.__('pages.authPageJoin.confirmPassword')}
              />
              <span
                className="icon-lock"
                title={i18n.__('pages.authPageJoin.confirmPassword')}
              />
            </div>
            <button type="submit" className="btn-primary">
              {i18n.__('pages.authPageJoin.joinNow')}
            </button>
          </form>
        </div>
      </AuthPage>
    );
};

export default JoinPage;
