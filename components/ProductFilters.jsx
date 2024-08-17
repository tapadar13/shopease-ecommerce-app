export default function ProductFilters({
  category,
  sortBy,
  onFilterChange,
  onSortChange,
}) {
  const handleCategoryChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-auto">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>
      <div className="w-full sm:w-auto">
        <label
          htmlFor="sortBy"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}
