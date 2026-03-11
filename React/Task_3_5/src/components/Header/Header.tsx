import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectCartItemsCount } from '../../store/selectors';
import logoImg from '../../assets/images/Logo.png';
import cartImg from '../../assets/images/cart.png';

/**
 * Header component with navigation logo and cart button.
 * Displays the total number of items in the cart.
 */
const Header: React.FC = () => {
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <header style={{ backgroundColor: '#1a1a1a' }} className="text-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Site Title */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="OfficeChairs Logo" className="h-8 w-8 object-contain" />
          <span className="text-white font-semibold text-lg">OfficeChairs</span>
        </Link>

        {/* Cart Button */}
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          <img src={cartImg} alt="Cart" className="h-4 w-4 object-contain" />
          <span>Cart</span>
          {cartItemsCount > 0 && (
            <span className="bg-white text-green-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount > 99 ? '99+' : cartItemsCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
