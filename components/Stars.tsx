export default function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="text-amber-500">&#x2605;</span>
      <b>{rating.toFixed(1)}</b>
      {reviews !== undefined && <span className="text-muted">({reviews})</span>}
    </span>
  );
}
