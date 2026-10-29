"use client";

import { useEffect, useState } from "react";
import { bookingApi, Booking } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    bookingApi.getMy().then((res) => setBookings(res.data)).finally(() => setLoading(false));
  }, [user]);

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this booking?")) return;
    await bookingApi.cancel(id);
    // list ko turant refresh kar do (dobara API call kiye bina), status update kar ke
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
    );
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && <p className="text-gray-500">No bookings yet.</p>}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <h2 className="font-semibold">{b.car.brand} {b.car.model}</h2>
              <p className="text-sm text-gray-500">{b.startDate} → {b.endDate}</p>
              <p className="text-sm font-bold text-brand-dark">₹{b.totalPrice}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  b.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : b.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {b.status}
              </span>
            </div>

            {b.status === "CONFIRMED" && (
              <button
                onClick={() => handleCancel(b.id)}
                className="text-red-600 border border-red-600 px-3 py-1 rounded text-sm font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
