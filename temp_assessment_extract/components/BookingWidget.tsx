
import React from 'react';
import { BOOKING_URL } from '../constants';

const BookingWidget: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] border border-slate-100">
      <iframe 
        src={BOOKING_URL}
        style={{ width: '100%', border: 'none', minHeight: '600px' }} 
        scrolling="no" 
        id="ghl-booking-iframe"
      />
    </div>
  );
};

export default BookingWidget;
