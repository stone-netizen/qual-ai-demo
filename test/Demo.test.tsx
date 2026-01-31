import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock framer-motion before importing Demo
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { animate, initial, variants, transition, whileInView, viewport, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    section: ({ children, ...props }: any) => {
      const { animate, initial, variants, transition, ...rest } = props;
      return <section {...rest}>{children}</section>;
    },
    span: ({ children, ...props }: any) => {
      const { animate, initial, variants, transition, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
    button: ({ children, ...props }: any) => {
      const { animate, initial, variants, transition, whileHover, whileTap, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Retell SDK with a class constructor
const mockStartCall = vi.fn();
const mockStopCall = vi.fn();
const mockOn = vi.fn();

vi.mock('retell-client-js-sdk', () => {
  return {
    RetellWebClient: function() {
      this.startCall = mockStartCall;
      this.stopCall = mockStopCall;
      this.on = mockOn;
      return this;
    },
  };
});

// Import Demo after mocks are set up
import Demo from '../pages/Demo';

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

const renderDemo = () => {
  return render(
    <MemoryRouter>
      <Demo />
    </MemoryRouter>
  );
};

describe('Demo Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
    mockStartCall.mockReset();
    mockStopCall.mockReset();
    mockOn.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('renders the page title', { timeout: 15000 }, () => {
      renderDemo();

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/Talk to/i);
      expect(heading).toHaveTextContent(/Qual AI/i);
    });

    it('displays Live AI Demo badge', () => {
      renderDemo();

      expect(screen.getByText('Live AI Demo')).toBeInTheDocument();
    });

    it('shows Start Conversation button when idle', () => {
      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      expect(startButton).toBeInTheDocument();
    });

    it('does not show End Call button when idle', () => {
      renderDemo();

      expect(screen.queryByRole('button', { name: /End Call/i })).not.toBeInTheDocument();
    });

    it('does not display error message initially', () => {
      renderDemo();

      // Error messages would contain the specific error text
      expect(screen.queryByText(/Could not start/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Connection error/i)).not.toBeInTheDocument();
    });
  });

  describe('Starting a Call', () => {
    it('calls API to get access token when Start Conversation is clicked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test-token' }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/create-web-call', {
          method: 'POST',
        });
      });
    });

    it('shows End Call button after call starts', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test-token' }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /End Call/i })).toBeInTheDocument();
      });
    });

    it('shows Listening status during active call', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test-token' }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByText('Listening...')).toBeInTheDocument();
      });
    });

    it('starts Retell call with access token from API', async () => {
      const testToken = 'test-access-token-123';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: testToken }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(mockStartCall).toHaveBeenCalledWith({ accessToken: testToken });
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error when API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByText(/Could not start the call/i)).toBeInTheDocument();
      });
    });

    it('displays error when network request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByText(/Could not start the call/i)).toBeInTheDocument();
      });
    });

    it('returns to idle state after error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        // Should show Start Conversation again (not End Call)
        expect(screen.getByRole('button', { name: /Start Conversation/i })).toBeInTheDocument();
      });
    });
  });

  describe('Ending a Call', () => {
    it('calls stopCall when End Call button is clicked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test-token' }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /End Call/i })).toBeInTheDocument();
      });

      const endButton = screen.getByRole('button', { name: /End Call/i });
      fireEvent.click(endButton);

      expect(mockStopCall).toHaveBeenCalled();
    });

    it('returns to idle state after ending call', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test-token' }),
      });
      mockStartCall.mockResolvedValueOnce(undefined);

      renderDemo();

      const startButton = screen.getByRole('button', { name: /Start Conversation/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /End Call/i })).toBeInTheDocument();
      });

      const endButton = screen.getByRole('button', { name: /End Call/i });
      fireEvent.click(endButton);

      expect(screen.getByRole('button', { name: /Start Conversation/i })).toBeInTheDocument();
    });
  });

  describe('Retell Event Listeners', () => {
    it('registers event listeners on mount', () => {
      renderDemo();

      // Verify that event listeners were registered
      expect(mockOn).toHaveBeenCalledWith('agent_start_talking', expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith('agent_stop_talking', expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith('call_ended', expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function));
    });
  });

  describe('Page Content', () => {
    it('shows description text about the demo', () => {
      renderDemo();

      expect(screen.getByText(/Experience the 60-second booking speed/i)).toBeInTheDocument();
    });

    it('shows powered by attribution', () => {
      renderDemo();

      expect(screen.getByText(/powered by Retell AI/i)).toBeInTheDocument();
    });
  });
});
