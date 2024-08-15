export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="w-full h-64 bg-gray-300 animate-pulse" />
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="p-6">
        <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse mr-2" />
          <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between">
          <div className="w-20 h-8 bg-gray-300 rounded animate-pulse" />
          <div className="w-32 h-10 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
