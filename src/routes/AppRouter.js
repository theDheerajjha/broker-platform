import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrokerLogin from '../components/BrokerLogin';
import Holdings from '../pages/Holdings';
import Orderbook from '../pages/Orderbook';
import Positions from '../pages/Positions';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import OrderPadModal from '../components/OrderPadModal';

// Main router for the app
const AppRouter = () => {
  // Track if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State for order pad modal
  const [orderPadModal, setOrderPadModal] = useState({
    isOpen: false,
    stock: null,
    orderType: null
  });

  // Called when login is successful
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Open the order pad modal for a stock and type
  const handleOpenOrderPad = (stock, orderType) => {
    setOrderPadModal({
      isOpen: true,
      stock,
      orderType
    });
  };

  // Close the order pad modal
  const handleCloseOrderPad = () => {
    setOrderPadModal({
      isOpen: false,
      stock: null,
      orderType: null
    });
  };

  // Log order data (could send to backend)
  const handleOrderSubmit = (orderData) => {
    console.log('Order submitted:', orderData);
  };

  // Get stocks for FAB (could be dynamic per page)
  const getCurrentPageStocks = () => {
    return [{
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 175.50
    }];
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <Router>
        <BrokerLogin onLoginSuccess={handleLoginSuccess} />
      </Router>
    );
  }

  // Main app routes and layout
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Navigate to="/holdings" replace />} />
          <Route 
            path="/holdings" 
            element={
              <Holdings onOpenOrderPad={handleOpenOrderPad} />
            } 
          />
          <Route 
            path="/orderbook" 
            element={
              <Orderbook onOpenOrderPad={handleOpenOrderPad} />
            } 
          />
          <Route 
            path="/positions" 
            element={
              <Positions onOpenOrderPad={handleOpenOrderPad} />
            } 
          />
        </Routes>
        {/* Bottom navigation and floating action button */}
        <BottomNav />
        <FAB 
          onOpenOrderPad={handleOpenOrderPad}
          stocks={getCurrentPageStocks()}
        />
        {/* Order pad modal for buy/sell */}
        <OrderPadModal
          isOpen={orderPadModal.isOpen}
          stock={orderPadModal.stock}
          orderType={orderPadModal.orderType}
          onClose={handleCloseOrderPad}
          onOrderSubmit={handleOrderSubmit}
        />
      </div>
    </Router>
  );
};

export default AppRouter; 