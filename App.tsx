
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PostBooking from './pages/PostBooking';
import { ROUTES } from './constants';

// Lazy-loaded pages for code splitting
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Demo = lazy(() => import('./pages/Demo'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SMSTerms = lazy(() => import('./pages/SMSTerms'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Security = lazy(() => import('./pages/Security'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-navy-950">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
  </div>
);

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isPostBooking = pathname === ROUTES.POST_BOOKING;

  return (
    <Layout hideHeader={isPostBooking} hideFooter={isPostBooking}>
      <Suspense fallback={<PageLoader />}>
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
          <Route path={ROUTES.DEMO} element={<Demo />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
