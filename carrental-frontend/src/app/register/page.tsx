"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  // "async function" = ye function await use kar sakta hai (server ka response aane tak ruk kar)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();   // form ka default behaviour (page reload) rok do
    setError("");
    try {
      const res = await authApi.register({ name, email, password });
      login(res.data.token, res.data);   // token + user info context/localStorage me save karo
      router.push("/");                    // home page par bhej do
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-brand text-ink py-2 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
          Register
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Already have an account? <Link href="/login" className="text-brand-dark font-semibold">Login</Link>
      </p>
    </div>
  );
}
