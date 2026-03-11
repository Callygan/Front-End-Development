import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';
import {
  HomePage,
  CartPage,
  CheckoutLayout,
  ContactStep,
  ShipmentStep,
  ConfirmStep,
} from './pages';

/**
 * Root application component.
 * Sets up routing: Home, Cart, and Checkout flow.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<CheckoutLayout />}>
              <Route index element={<Navigate to="contact" replace />} />
              <Route path="contact" element={<ContactStep />} />
              <Route path="shipment" element={<ShipmentStep />} />
              <Route path="confirm" element={<ConfirmStep />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
