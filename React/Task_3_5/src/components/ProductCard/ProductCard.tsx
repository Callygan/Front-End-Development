import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { selectCartItems } from '../../store/selectors';
import type { ProductCardProps } from '../../types';

/**
 * ProductCard component - renders a single product with image, title, price,
 * and an "Add to Cart" / "Added" button matching the Figma design.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const [justAdded, setJustAdded] = useState(false);

  /** Dispatch the addToCart action with the product details. */
  const handleAddToCart = (): void => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const added = isInCart || justAdded;

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="h-44 flex items-center justify-center p-4 bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-700 line-clamp-2 mb-2 flex-1 leading-tight">
          {product.title}
        </p>

        <p className="text-sm font-semibold text-gray-900 mb-3">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          className={`w-full text-white text-xs font-medium py-2 px-3 rounded transition-colors flex items-center justify-center gap-1 ${
            added
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {added ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Added
            </>
          ) : (
            <>
              <span className="text-base leading-none">+</span>
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;