
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import PostBooking from './pages/PostBooking';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import SMSTerms from './pages/SMSTerms';
import CookiePolicy from './pages/CookiePolicy';
import Security from './pages/Security';
import { ROUTES } from './constants';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isPostBooking = pathname === ROUTES.POST_BOOKING;

  return (
    <Layout hideHeader={isPostBooking} hideFooter={isPostBooking}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.POST_BOOKING} element={<PostBooking />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.TERMS} element={<TermsOfService />} />
        <Route path={ROUTES.SMS_TERMS} element={<SMSTerms />} />
        <Route path={ROUTES.COOKIE_POLICY} element={<CookiePolicy />} />
        <Route path={ROUTES.SECURITY} element={<Security />} />
      </Routes>
    </Layout>
  );
};

export default App;
