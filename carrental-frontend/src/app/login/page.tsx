"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.login({ email, password });
      login(res.data.token, res.data);
      router.push(res.data.role === "ADMIN" ? "/admin" : "/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-brand text-ink py-2 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        No account? <Link href="/register" className="text-brand-dark font-semibold">Register</Link>
      </p>
      <p className="text-xs mt-2 text-center text-gray-400">
        Admin demo login: admin@carrental.com / admin123
      </p>
    </div>
  );
}
