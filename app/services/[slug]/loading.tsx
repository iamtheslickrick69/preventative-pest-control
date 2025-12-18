export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading service details...</p>
      </div>
    </div>
  )
}
