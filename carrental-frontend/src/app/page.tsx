"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { carApi, Car } from "@/lib/api";
import StarRating from "@/components/StarRating";
import { SeatIcon, FuelIcon, TransmissionIcon } from "@/components/Icons";

export default function HomePage() {
  // useState = ek "variable" jo change hone par component ko dobara render kar deta hai
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect = "jab ye component pehli baar screen par aaye, to ye code chalao"
  // [] (empty array) ka matlab: sirf ek baar chale, baar baar nahi
  useEffect(() => {
    carApi
      .getAll()
      .then((res) => setCars(res.data))
      .catch(() => setError("Could not load cars. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold max-w-xl leading-tight">
            Pick a car. Pick your dates. Hit the road.
          </h1>
          <p className="mt-3 text-white/75 max-w-lg">
            Rent well-maintained cars by the day, with transparent pricing and instant
            booking confirmation — no phone calls, no paperwork.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-ink">Available Cars</h2>

        {loading && <p className="text-center text-slate-500 py-12">Loading cars...</p>}
        {error && <p className="text-center text-red-600 py-12">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-slate-100"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded-full shadow-sm">
                    <StarRating rating={car.rating} size="w-3 h-3" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-ink">{car.brand} {car.model}</h3>
                  <p className="text-sm text-slate-500 mb-3">{car.type}</p>

                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                    <span className="flex items-center gap-1"><SeatIcon /> {car.seats}</span>
                    <span className="flex items-center gap-1"><FuelIcon /> {car.fuelType}</span>
                    <span className="flex items-center gap-1"><TransmissionIcon /> {car.transmission}</span>
                  </div>

                  <p className="text-brand-dark font-bold">
                    ₹{car.pricePerDay} <span className="text-slate-400 font-normal text-sm">/ day</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
