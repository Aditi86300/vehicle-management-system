"use client";

import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { adminApi, Car } from "@/lib/api";

const emptyCar: Partial<Car> = {
  brand: "", model: "", type: "", seats: 5, fuelType: "Petrol",
  transmission: "Manual", pricePerDay: 1000, imageUrl: "", description: "", available: true,
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState<Partial<Car>>(emptyCar);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tab, setTab] = useState<"cars" | "bookings" | "users">("cars");
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Route guard: agar admin nahi hai to bahar bhej do
  useEffect(() => {
    if (user && user.role !== "ADMIN") router.push("/");
    if (!user) router.push("/login");
  }, [user]);

  const loadCars = () => adminApi.getAllCars().then((res) => setCars(res.data));

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    if (tab === "bookings") adminApi.getAllBookings().then((res) => setBookings(res.data));
    if (tab === "users") adminApi.getAllUsers().then((res) => setUsers(res.data as any[]));
  }, [tab]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await adminApi.updateCar(editingId, form);
    } else {
      await adminApi.addCar(form);
    }
    setForm(emptyCar);
    setEditingId(null);
    loadCars();
  };

  const handleEdit = (car: Car) => {
    setForm(car);
    setEditingId(car.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this car?")) return;
    await adminApi.deleteCar(id);
    loadCars();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 mb-6 border-b">
        {(["cars", "bookings", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 px-2 capitalize font-medium ${
              tab === t ? "border-b-2 border-brand text-brand-dark" : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "cars" && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add / Update car form */}
          <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-3 h-fit">
            <h2 className="font-semibold text-lg">{editingId ? "Update Car" : "Add New Car"}</h2>

            <input placeholder="Brand" className="w-full border rounded px-3 py-2"
              value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
            <input placeholder="Model" className="w-full border rounded px-3 py-2"
              value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
            <input placeholder="Type (SUV/Sedan...)" className="w-full border rounded px-3 py-2"
              value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required />
            <input type="number" placeholder="Seats" className="w-full border rounded px-3 py-2"
              value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} />
            <input placeholder="Fuel Type" className="w-full border rounded px-3 py-2"
              value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} />
            <input placeholder="Transmission" className="w-full border rounded px-3 py-2"
              value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} />
            <input type="number" placeholder="Price per day" className="w-full border rounded px-3 py-2"
              value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })} />
            <input placeholder="Image URL" className="w-full border rounded px-3 py-2"
              value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <textarea placeholder="Description" className="w-full border rounded px-3 py-2"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <button type="submit" className="w-full bg-brand text-ink py-2 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
              {editingId ? "Update Car" : "Add Car"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setForm(emptyCar); setEditingId(null); }}
                className="w-full border py-2 rounded">
                Cancel Edit
              </button>
            )}
          </form>

          {/* Car list */}
          <div className="space-y-3">
            {cars.map((car) => (
              <div key={car.id} className="bg-white border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{car.brand} {car.model}</p>
                  <p className="text-sm text-gray-500">₹{car.pricePerDay}/day · {car.available ? "Available" : "Unavailable"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(car)} className="text-sm text-brand-dark font-semibold">Edit</button>
                  <button onClick={() => handleDelete(car.id)} className="text-sm text-red-600 font-semibold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "bookings" && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white border rounded-xl p-4">
              <p className="font-semibold">{b.car?.brand} {b.car?.model} — {b.user?.name}</p>
              <p className="text-sm text-gray-500">{b.startDate} → {b.endDate} · ₹{b.totalPrice} · {b.status}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="bg-white border rounded-xl p-4">
              <p className="font-semibold">{u.name} ({u.role})</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
