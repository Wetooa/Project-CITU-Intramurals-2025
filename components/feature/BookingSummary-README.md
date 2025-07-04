# BookingSummary Component

A React component for generating thermal printing layouts optimized for postcard format (100 × 144 mm) booking receipts.

## Features

- **Optimized QR Code Size**: 85px (increased from 50px) for better scanning on postcard format
- **Integrated Reference Number**: Reference number is included as the first row in the trip information table
- **Dual Receipt Support**: Supports both passenger and vehicle receipts
- **Postcard Format Layout**: Optimized spacing and layout for 100 × 144 mm dimensions
- **TypeScript Support**: Fully typed with TypeScript interfaces

## Usage

```tsx
import BookingSummary, { BookingData } from "@/components/feature/booking-summary";

const bookingData: BookingData = {
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

const qrCodeData = "BOOKING:PASS-2025-001234:VEH-2025-001234";

<BookingSummary 
  bookingData={bookingData} 
  qrCodeData={qrCodeData}
  className="your-custom-classes"
/>
```

## Props

### BookingSummaryProps
- `bookingData: BookingData` - The booking information for passenger and optional vehicle
- `qrCodeData: string` - The data to encode in the QR code
- `className?: string` - Optional additional CSS classes

### BookingData
- `passengerInfo: TripInfo` - Passenger trip information
- `vehicleInfo?: TripInfo` - Optional vehicle trip information

### TripInfo
- `referenceNumber: string` - Booking reference number
- `route: string` - Trip route information
- `departureTime: string` - Departure time
- `arrivalTime: string` - Arrival time  
- `fare: string` - Trip fare
- `seatNumber?: string` - Seat number (passenger only)
- `vehicleNumber?: string` - Vehicle number (vehicle only)

## Key Improvements Made

1. **QR Code Size**: Increased from 50px to 85px for better scanning on postcard format
2. **Reference Number Integration**: Moved reference number from separate paragraph to first row of trip information table
3. **Layout Optimization**: Reduced spacing and margins for better fit in 100 × 144 mm format
4. **Dual Receipt Support**: Both passenger and vehicle receipts use the same optimized layout

## Demo

Visit `/booking-demo` to see the component in action with sample data.

## Integration Notes

For production use:
- Replace the placeholder QR code component with a real QR code library (e.g., `qrcode.js`, `react-qr-code`)
- Integrate with thermal printer drivers for actual printing
- Add proper error handling and validation
- Consider adding print-specific CSS for thermal printers