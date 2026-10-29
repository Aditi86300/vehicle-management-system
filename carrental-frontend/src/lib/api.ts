import axios from "axios";

// Ek hi jagah se saare backend calls jaate hain, taaki URL/headers baar baar na likhna pade
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
});

// "Interceptor" = har request bhejne se PEHLE ye function chalta hai.
// Yahan hum localStorage se JWT token uthakar har request ke header me chipka dete hain.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ---- Types (TypeScript: batate hain data ka "shape" kaisa hoga) ----
export interface Car {
  id: number;
  brand: string;
  model: string;
  type: string;
  seats: number;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  imageUrl: string;
  available: boolean;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface Booking {
  id: number;
  car: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

// ---- API functions ----
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/login", data),
};

export const carApi = {
  getAll: () => api.get<Car[]>("/cars"),
  getById: (id: string | number) => api.get<Car>(`/cars/${id}`),
};

export const bookingApi = {
  create: (data: { carId: number; startDate: string; endDate: string }) =>
    api.post<Booking>("/bookings", data),
  getMy: () => api.get<Booking[]>("/bookings/my"),
  cancel: (id: number) => api.delete(`/bookings/${id}`),
};

export const adminApi = {
  getAllCars: () => api.get<Car[]>("/admin/cars"),
  addCar: (data: Partial<Car>) => api.post<Car>("/admin/cars", data),
  updateCar: (id: number, data: Partial<Car>) => api.put<Car>(`/admin/cars/${id}`, data),
  deleteCar: (id: number) => api.delete(`/admin/cars/${id}`),
  getAllBookings: () => api.get<Booking[]>("/admin/bookings"),
  getAllUsers: () => api.get("/admin/users"),
};
