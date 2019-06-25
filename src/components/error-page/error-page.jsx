import React from 'react';
import Footer from '../footer/footer.jsx';
import Logo from '../logo/logo.jsx';

const ErrorPage = () => {
  return <div className="user-page">
    <header className="page-header">
      <Logo />
    </header>
    <div className="page-content">
      <div className="">Sorry, we have some server`s problems. Try again later...</div>
    </div>
    <Footer />
  </div>;
};

export default ErrorPage;
