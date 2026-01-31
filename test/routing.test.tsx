import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ROUTES } from '../constants';

// Mock all page components to isolate routing tests from component implementations
vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('../pages/HowItWorks', () => ({
  default: () => <div data-testid="how-it-works-page">How It Works Page</div>,
}));

vi.mock('../pages/Demo', () => ({
  default: () => <div data-testid="demo-page">Demo Page</div>,
}));

vi.mock('../pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>,
}));

vi.mock('../pages/PostBooking', () => ({
  default: () => <div data-testid="post-booking-page">Post Booking Page</div>,
}));

vi.mock('../pages/PrivacyPolicy', () => ({
  default: () => <div data-testid="privacy-page">Privacy Policy</div>,
}));

vi.mock('../pages/TermsOfService', () => ({
  default: () => <div data-testid="terms-page">Terms of Service</div>,
}));

vi.mock('../pages/SMSTerms', () => ({
  default: () => <div data-testid="sms-terms-page">SMS Terms</div>,
}));

vi.mock('../pages/CookiePolicy', () => ({
  default: () => <div data-testid="cookie-policy-page">Cookie Policy</div>,
}));

vi.mock('../pages/Security', () => ({
  default: () => <div data-testid="security-page">Security</div>,
}));

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
};

describe('Application Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Route mapping', () => {
    it('renders Home page at root route', async () => {
      renderWithRouter([ROUTES.HOME]);

      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });
    });

    it('renders How It Works page', async () => {
      renderWithRouter([ROUTES.HOW_IT_WORKS]);

      await waitFor(() => {
        expect(screen.getByTestId('how-it-works-page')).toBeInTheDocument();
      });
    });

    it('renders Demo page', async () => {
      renderWithRouter([ROUTES.DEMO]);

      await waitFor(() => {
        expect(screen.getByTestId('demo-page')).toBeInTheDocument();
      });
    });

    it('renders Contact page', async () => {
      renderWithRouter([ROUTES.CONTACT]);

      await waitFor(() => {
        expect(screen.getByTestId('contact-page')).toBeInTheDocument();
      });
    });

    it('renders PostBooking page', async () => {
      renderWithRouter([ROUTES.POST_BOOKING]);

      await waitFor(() => {
        expect(screen.getByTestId('post-booking-page')).toBeInTheDocument();
      });
    });

    it('renders Privacy Policy page', async () => {
      renderWithRouter([ROUTES.PRIVACY]);

      await waitFor(() => {
        expect(screen.getByTestId('privacy-page')).toBeInTheDocument();
      });
    });

    it('renders Terms of Service page', async () => {
      renderWithRouter([ROUTES.TERMS]);

      await waitFor(() => {
        expect(screen.getByTestId('terms-page')).toBeInTheDocument();
      });
    });

    it('renders SMS Terms page', async () => {
      renderWithRouter([ROUTES.SMS_TERMS]);

      await waitFor(() => {
        expect(screen.getByTestId('sms-terms-page')).toBeInTheDocument();
      });
    });

    it('renders Cookie Policy page', async () => {
      renderWithRouter([ROUTES.COOKIE_POLICY]);

      await waitFor(() => {
        expect(screen.getByTestId('cookie-policy-page')).toBeInTheDocument();
      });
    });

    it('renders Security page', async () => {
      renderWithRouter([ROUTES.SECURITY]);

      await waitFor(() => {
        expect(screen.getByTestId('security-page')).toBeInTheDocument();
      });
    });
  });

  describe('Layout behavior', () => {
    it('shows header on regular pages', async () => {
      renderWithRouter([ROUTES.HOME]);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
    });

    it('hides header on PostBooking page', async () => {
      renderWithRouter([ROUTES.POST_BOOKING]);

      await waitFor(() => {
        expect(screen.getByTestId('post-booking-page')).toBeInTheDocument();
      });

      // Header (navigation) should not be present on post-booking page
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('Route constants', () => {
    it('all routes are defined in ROUTES constant', () => {
      expect(ROUTES.HOME).toBe('/');
      expect(ROUTES.HOW_IT_WORKS).toBe('/how-it-works');
      expect(ROUTES.CONTACT).toBe('/contact');
      expect(ROUTES.POST_BOOKING).toBe('/confirmed');
      expect(ROUTES.PRIVACY).toBe('/privacy');
      expect(ROUTES.TERMS).toBe('/terms');
      expect(ROUTES.SMS_TERMS).toBe('/sms-terms');
      expect(ROUTES.COOKIE_POLICY).toBe('/cookie-policy');
      expect(ROUTES.SECURITY).toBe('/security');
      expect(ROUTES.DEMO).toBe('/demo');
    });
  });
});
