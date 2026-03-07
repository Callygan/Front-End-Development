import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectCartItemsCount } from '../../store/selectors';

const Header: React.FC = () => {
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <header className="bg-emerald-500 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo/Title */}
            <Link to="/" className="text-2xl font-bold">
                OfficeChairs
            </Link>

            {/* Right side - Logo image + Cart */}
            <div className="flex items-center gap-4">
                {/* Logo placeholder - poți înlocui cu o imagine reală */}
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🛍️</span>
                </div>

                {/* Cart Icon */}
                <Link 
                    to="/checkout/contact" 
                    className="relative p-2 hover:bg-emerald-600 rounded-full transition-colors"
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                    </svg>
                    
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemsCount > 99 ? '99+' : cartItemsCount}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    </header>
  );
};

export default Header;
