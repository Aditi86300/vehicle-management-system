import { StarIcon } from "./Icons";

// Rating ko 5 stars ke roop me dikhata hai (half-star ke liye simple round-off).
// reviewCount diya ho to "(128)" jaisa count bhi dikhata hai.
export default function StarRating({
  rating,
  reviewCount,
  size = "w-4 h-4",
}: {
  rating: number;
  reviewCount?: number;
  size?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} className={size} filled={i <= rounded} />
        ))}
      </div>
      <span className="text-sm font-semibold text-ink">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-sm text-slate-500">({reviewCount})</span>
      )}
    </div>
  );
}
