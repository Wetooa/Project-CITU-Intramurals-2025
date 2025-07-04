"use client";

import BookingSummary, { BookingData } from "@/components/feature/booking-summary";

// Sample booking data for demonstration
const sampleBookingData: BookingData = {
  passengerInfo: {
    referenceNumber: "PASS-2025-001234",
    route: "CITU Campus - Downtown Terminal",
    departureTime: "08:30 AM",
    arrivalTime: "09:15 AM",
    fare: "₱25.00",
    seatNumber: "A-12",
  },
  vehicleInfo: {
    referenceNumber: "VEH-2025-001234",
    route: "CITU Campus - Downtown Terminal",
    departureTime: "08:30 AM",
    arrivalTime: "09:15 AM",
    fare: "₱120.00",
    vehicleNumber: "ABC-1234",
  },
};

export default function BookingDemoPage() {
  const qrCodeData = "BOOKING:PASS-2025-001234:VEH-2025-001234";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          BookingSummary Component Demo
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Thermal Printing Layout - Postcard Format (100 x 144 mm)
          </h2>
          
          <div className="mb-6 text-sm text-gray-600">
            <p><strong>Improvements made:</strong></p>
            <ul className="list-disc ml-5 mt-2">
              <li>QR code size increased from 50px to 85px for better scanning</li>
              <li>Reference number moved to first row of trip information table</li>
              <li>Removed separate reference number paragraph above QR code</li>
              <li>Optimized layout spacing for postcard format</li>
              <li>Applied changes to both passenger and vehicle receipts</li>
            </ul>
          </div>

          {/* Postcard Dimensions Guide */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Postcard Format:</strong> 100mm × 144mm (3.94&quot; × 5.67&quot;) - 
              Rendered at 70% scale for web display
            </p>
          </div>

          {/* BookingSummary Component in Postcard Format */}
          <div className="border-2 border-dashed border-gray-300 p-4 flex justify-center">
            <div 
              className="relative border border-gray-400 bg-gray-50 p-2"
              style={{
                width: '100mm',
                height: '144mm',
                transform: 'scale(0.7)',
                transformOrigin: 'top center'
              }}
            >
              <div className="absolute top-1 left-1 text-xs text-gray-500">100×144mm</div>
              <BookingSummary 
                bookingData={sampleBookingData} 
                qrCodeData={qrCodeData}
                className="w-full h-full overflow-hidden text-xs"
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Note:</strong> This demo shows the thermal printing layout optimized for postcard dimensions. In a real implementation, you would integrate this with a QR code library and thermal printer drivers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}