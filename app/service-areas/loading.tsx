export default function Loading() {
  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading service areas...</p>
      </div>
    </div>
  )
}
