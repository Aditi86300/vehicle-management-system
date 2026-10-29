// Chhote reusable SVG icons. Emoji font-dependent hote hain (device pe alag dikhte hain),
// isliye inline SVG use kar rahe hain - crisp aur consistent har jagah dikhega.

export function CarLogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6 20 L9 11c1-2.6 2.6-4 5.4-4h19.2c2.8 0 4.4 1.4 5.4 4l3 9"
        stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <rect x="2" y="19" width="44" height="9" rx="3.5" fill="currentColor" />
      <circle cx="13" cy="28" r="4.2" fill="#14213D" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="35" cy="28" r="4.2" fill="#14213D" stroke="currentColor" strokeWidth="2.2" />
      <rect x="12" y="13" width="9" height="6" rx="1.2" fill="#14213D" opacity="0.35" />
      <rect x="24" y="13" width="11" height="6" rx="1.2" fill="#14213D" opacity="0.35" />
    </svg>
  );
}

export function SeatIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7 4v8a2 2 0 0 0 2 2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 4a2 2 0 1 1 4 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 14v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 12v6a2 2 0 0 1-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FuelIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="3" width="10" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 8.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 8l3.3 2c.7.4 1.1 1.1 1.1 1.9V17a1.6 1.6 0 0 1-3.2 0v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TransmissionIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 3v6M12 9c-3 0-5 2-5 5v4M12 9c3 0 5 2 5 5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="3" r="1.6" fill="currentColor" />
      <circle cx="7" cy="19" r="1.6" fill="currentColor" />
      <circle cx="17" cy="19" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 1.5l2.47 5.24 5.78.68-4.3 3.94 1.16 5.71L10 14.9l-5.11 2.17 1.16-5.71-4.3-3.94 5.78-.68L10 1.5z"
        fill={filled ? "#FCA311" : "none"}
        stroke="#FCA311"
        strokeWidth="1"
      />
    </svg>
  );
}
