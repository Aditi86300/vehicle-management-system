"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { CarLogoIcon } from "./Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-ink text-white px-6 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-30">
      <Link href="/" className="flex items-center gap-2 text-brand">
        <CarLogoIcon className="w-9 h-9" />
        <span className="font-heading text-xl font-bold text-white">CarRental</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-brand transition-colors">Cars</Link>

        {user && user.role === "CUSTOMER" && (
          <Link href="/bookings" className="hover:text-brand transition-colors">My Bookings</Link>
        )}

        {user && user.role === "ADMIN" && (
          <Link href="/admin" className="hover:text-brand transition-colors">Admin Dashboard</Link>
        )}

        {!user && (
          <>
            <Link href="/login" className="hover:text-brand transition-colors">Login</Link>
            <Link
              href="/register"
              className="bg-brand text-ink px-4 py-1.5 rounded-full font-semibold hover:bg-brand-dark transition-colors"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-white/70">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-brand text-ink px-4 py-1.5 rounded-full font-semibold hover:bg-brand-dark transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
