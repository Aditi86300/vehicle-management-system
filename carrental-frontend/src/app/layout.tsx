import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";

// next/font automatically downloads + self-hosts the font at build time, so there's
// no external network request in the browser (fast, and works offline once built).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Metadata -> browser tab ka title/description (SEO ke liye bhi useful)
export const metadata: Metadata = {
  title: "CarRental - Book your ride",
  description: "Simple car rental booking system",
};

// RootLayout = poore app ka "skeleton". Har page isi ke andar render hota hai ({children}).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        {/* AuthProvider poore app ko wrap karta hai taaki har page "logged-in user" jaan sake */}
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
