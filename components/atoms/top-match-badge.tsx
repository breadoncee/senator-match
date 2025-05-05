type TopMatchBadgeProps = {
  show: boolean
}

export function TopMatchBadge({ show }: TopMatchBadgeProps) {
  if (!show) return null

  return <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Top Match</div>
}
