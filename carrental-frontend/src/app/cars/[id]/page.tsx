"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { carApi, bookingApi, Car } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import StarRating from "@/components/StarRating";
import { SeatIcon, FuelIcon, TransmissionIcon, StarIcon } from "@/components/Icons";

// Illustrative reviews shown under every car - this is demo/sample content, not real user data.
const SAMPLE_REVIEWS = [
  { name: "Rohan M.", rating: 5, text: "Smooth pickup and the car was spotless. Would rent again." },
  { name: "Priya S.", rating: 4, text: "Great value for the price. AC could be a touch stronger." },
  { name: "Arjun K.", rating: 5, text: "Booking took two minutes and the car matched the photos exactly." },
];

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();   // URL se "/cars/[id]" ka id nikalna
  const router = useRouter();
  const { user } = useAuth();

  const [car, setCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    carApi.getById(id).then((res) => setCar(res.data));
  }, [id]);

  const totalDays =
    startDate && endDate
      ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1)
      : 0;

  const totalPrice = car ? totalDays * car.pricePerDay : 0;

  const handleBook = async () => {
    setError("");
    setMessage("");

    if (!user) {
      router.push("/login");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    try {
      await bookingApi.create({ carId: Number(id), startDate, endDate });
      setMessage("Booking confirmed! Check 'My Bookings'.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Booking failed");
    }
  };

  if (!car) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-72 rounded-2xl overflow-hidden">
          <Image src={car.imageUrl} alt={car.model} fill className="object-cover" />
        </div>

        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">{car.brand} {car.model}</h1>
          <div className="mt-1 mb-3">
            <StarRating rating={car.rating} reviewCount={car.reviewCount} />
          </div>

          <div className="flex items-center gap-4 text-slate-600 text-sm mb-4">
            <span className="flex items-center gap-1"><SeatIcon /> {car.seats} seats</span>
            <span className="flex items-center gap-1"><FuelIcon /> {car.fuelType}</span>
            <span className="flex items-center gap-1"><TransmissionIcon /> {car.transmission}</span>
          </div>

          <p className="text-slate-700 mb-4">{car.description}</p>
          <p className="text-brand-dark text-xl font-bold mb-6">
            ₹{car.pricePerDay} <span className="text-slate-400 font-normal text-sm">/ day</span>
          </p>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-ink">Start date</label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-ink">End date</label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {totalDays > 0 && (
              <p className="text-sm text-slate-600">
                {totalDays} day(s) × ₹{car.pricePerDay} = <span className="font-bold text-ink">₹{totalPrice}</span>
              </p>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              onClick={handleBook}
              className="w-full bg-brand text-ink py-2 rounded-lg font-semibold hover:bg-brand-dark transition-colors"
            >
              {user ? "Book this car" : "Login to book"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-12">
        <h2 className="font-heading text-xl font-bold text-ink mb-4">What renters say</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SAMPLE_REVIEWS.map((review, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarIcon key={n} className="w-4 h-4" filled={n <= review.rating} />
                ))}
              </div>
              <p className="text-sm text-slate-600 mb-2">"{review.text}"</p>
              <p className="text-sm font-semibold text-ink">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
