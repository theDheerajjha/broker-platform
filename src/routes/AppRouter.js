import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrokerLogin from '../components/BrokerLogin';
import Holdings from '../pages/Holdings';
import Orderbook from '../pages/Orderbook';
import Positions from '../pages/Positions';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import OrderPadModal from '../components/OrderPadModal';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderPadModal, setOrderPadModal] = useState({
    isOpen: false,
    stock: null,
    orderType: null
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleOpenOrderPad = (stock, orderType) => {
    setOrderPadModal({
      isOpen: true,
      stock,
      orderType
    });
  };

  const handleCloseOrderPad = () => {
    setOrderPadModal({
      isOpen: false,
      stock: null,
      orderType: null
    });
  };

  const handleOrderSubmit = (orderData) => {
    console.log('Order submitted:', orderData);
  };

  const getCurrentPageStocks = () => {
    return [{
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 175.50
    }];
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <BrokerLogin onLoginSuccess={handleLoginSuccess} />
      </Router>
    );
  }

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

        <BottomNav />
        <FAB 
          onOpenOrderPad={handleOpenOrderPad}
          stocks={getCurrentPageStocks()}
        />
        
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