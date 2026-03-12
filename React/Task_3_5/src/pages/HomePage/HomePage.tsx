import { useProducts } from '../../hooks';
import { ProductCard } from '../../components';

/**
 * HomePage component - displays a grid of products fetched from the API.
 * Shows a loading spinner while fetching and an error message on failure.
 */
const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();

  /* Loading state - show a spinner */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  /* Error state - show an error message with a retry button */
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-emerald-600 hover:underline"
        >
          Try again!
        </button>
      </div>
    );
  }

  /* Product grid */
  return (
    <div className="container mx-auto px-20 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;