import { PopupModal } from 'react-calendly';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export const CalendlyModal = ({ 
  isOpen, 
  onClose, 
  url = "https://calendly.com/your-link/15min" 
}: CalendlyModalProps) => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) return null;
  
  return (
    <PopupModal
      url={url}
      onModalClose={onClose}
      open={isOpen}
      rootElement={rootElement}
    />
  );
};
