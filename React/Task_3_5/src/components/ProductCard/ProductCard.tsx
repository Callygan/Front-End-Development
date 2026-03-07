import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import type { ProductCardProps } from '../../types';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = (): void => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="h-48 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title}
                </h3>

                <p className="text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;