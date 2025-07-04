"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Types for the booking data
interface TripInfo {
  referenceNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  fare: string;
  seatNumber?: string;
  vehicleNumber?: string;
}

interface BookingData {
  passengerInfo: TripInfo;
  vehicleInfo?: TripInfo;
}

interface BookingSummaryProps {
  bookingData: BookingData;
  qrCodeData: string;
  className?: string;
}

// QR Code placeholder component (in a real app, you'd use a QR code library)
const QRCode: React.FC<{ data: string; size: number; className?: string }> = ({
  data,
  size,
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-center bg-white border-2 border-black text-black text-xs font-mono",
      className
    )}
    style={{ width: size, height: size }}
    title={`QR Code: ${data}`}
  >
    QR
    <br />
    {size}px
  </div>
);

// Trip Information Table Component
const TripInfoTable: React.FC<{ tripInfo: TripInfo; type: "passenger" | "vehicle" }> = ({
  tripInfo,
  type,
}) => (
  <div className="w-full">
    <table className="w-full text-xs border-collapse">
      <tbody>
        <tr className="border-b border-black">
          <td className="py-1 pr-2 font-medium">Reference No:</td>
          <td className="py-1">{tripInfo.referenceNumber}</td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-1 pr-2 font-medium">Route:</td>
          <td className="py-1">{tripInfo.route}</td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-1 pr-2 font-medium">Departure:</td>
          <td className="py-1">{tripInfo.departureTime}</td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-1 pr-2 font-medium">Arrival:</td>
          <td className="py-1">{tripInfo.arrivalTime}</td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-1 pr-2 font-medium">Fare:</td>
          <td className="py-1">{tripInfo.fare}</td>
        </tr>
        {type === "passenger" && tripInfo.seatNumber && (
          <tr className="border-b border-black">
            <td className="py-1 pr-2 font-medium">Seat No:</td>
            <td className="py-1">{tripInfo.seatNumber}</td>
          </tr>
        )}
        {type === "vehicle" && tripInfo.vehicleNumber && (
          <tr className="border-b border-black">
            <td className="py-1 pr-2 font-medium">Vehicle No:</td>
            <td className="py-1">{tripInfo.vehicleNumber}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Main BookingSummary Component
const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  qrCodeData,
  className,
}) => {
  const qrCodeSize = 85; // Increased from 50px to 85px for better scanning

  return (
    <div className={cn("font-mono text-black bg-white text-xs", className)}>
      {/* Passenger Receipt */}
      <div className="minimalBookingSummary mb-4 p-2 border border-black">
        {/* Header */}
        <div className="text-center mb-3 pb-1 border-b border-black">
          <h2 className="text-xs font-bold">PASSENGER RECEIPT</h2>
          <p className="text-xs">Postcard Format - 100 x 144 mm</p>
        </div>

        {/* Content Layout optimized for postcard format */}
        <div className="flex gap-3">
          {/* Trip Information Table */}
          <div className="flex-1">
            <TripInfoTable tripInfo={bookingData.passengerInfo} type="passenger" />
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center">
            <QRCode 
              data={qrCodeData} 
              size={qrCodeSize} 
              className="mb-1"
            />
            <p className="text-xs text-center">Scan for details</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-1 border-t border-black text-center">
          <p className="text-xs">Thank you for your booking</p>
        </div>
      </div>

      {/* Vehicle Receipt (if vehicle info is provided) */}
      {bookingData.vehicleInfo && (
        <div className="minimalBookingSummary p-2 border border-black">
          {/* Header */}
          <div className="text-center mb-3 pb-1 border-b border-black">
            <h2 className="text-xs font-bold">VEHICLE RECEIPT</h2>
            <p className="text-xs">Postcard Format - 100 x 144 mm</p>
          </div>

          {/* Content Layout optimized for postcard format */}
          <div className="flex gap-3">
            {/* Trip Information Table */}
            <div className="flex-1">
              <TripInfoTable tripInfo={bookingData.vehicleInfo} type="vehicle" />
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center">
              <QRCode 
                data={qrCodeData} 
                size={qrCodeSize} 
                className="mb-1"
              />
              <p className="text-xs text-center">Scan for details</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-1 border-t border-black text-center">
            <p className="text-xs">Thank you for your booking</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
export type { BookingData, TripInfo, BookingSummaryProps };