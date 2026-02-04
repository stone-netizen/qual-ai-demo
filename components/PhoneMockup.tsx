import React from 'react';

const PhoneMockup: React.FC = () => {
  return (
    <div className="relative">
        {/* Phone Frame */}
      <div className="w-72 sm:w-80 md:w-96 h-[425px] sm:h-[475px] md:h-[545px] bg-gray-900 rounded-[48px] p-3 shadow-xl border border-gray-800">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10"></div>
        
          {/* Screen */}
        <div className="w-full h-full bg-[#f9fafb] rounded-[40px] overflow-hidden relative pt-12 px-4">
          
          {/* Booking Cards List */}
          <div className="space-y-3">
            {/* Booking 1 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">New Appointment Booked</span>
                </div>
                <span className="text-xs text-gray-400">Just now</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Robert M.</p>
                  <p className="text-xs text-gray-500">HVAC Installation · Thursday 8–12 PM</p>
                </div>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  $10,543
                </span>
              </div>
            </div>

            {/* Booking 2 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">New Appointment Booked</span>
                </div>
                <span className="text-xs text-gray-400">8m ago</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Jennifer T.</p>
                  <p className="text-xs text-gray-500">Furnace Installation · Friday 9–1 PM</p>
                </div>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  $8,750
                </span>
              </div>
              </div>

            {/* Booking 3 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">New Appointment Booked</span>
                </div>
                <span className="text-xs text-gray-400">23m ago</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Mike W.</p>
                  <p className="text-xs text-gray-500">AC Installation · Saturday 10–2 PM</p>
                </div>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  $12,200
                </span>
              </div>
              </div>

            {/* Booking 4 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">New Appointment Booked</span>
                </div>
                <span className="text-xs text-gray-400">41m ago</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Susan K.</p>
                  <p className="text-xs text-gray-500">Heat Pump Install · Monday 8–12 PM</p>
                </div>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  $9,400
                </span>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Subtle reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-6 bg-gray-900/10 blur-xl rounded-full"></div>
    </div>
  );
};

export default PhoneMockup;
