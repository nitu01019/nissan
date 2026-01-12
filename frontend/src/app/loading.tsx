export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 flex items-center justify-center">
      {/* Instant skeleton that matches hero section */}
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
