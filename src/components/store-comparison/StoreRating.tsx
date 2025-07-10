import { Star } from "lucide-react";

interface StoreRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

export const StoreRating = ({ rating, reviewCount, size = "sm" }: StoreRatingProps) => {
  const starSize = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground dark:text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <span className={`font-medium text-foreground dark:text-foreground ${textSize}`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount && (
        <span className={`text-muted-foreground dark:text-muted-foreground ${textSize}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};