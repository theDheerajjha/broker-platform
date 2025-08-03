import React, { useState } from 'react';

// Modal for placing buy/sell orders
const OrderPadModal = ({ isOpen, onClose, stock, orderType, onOrderSubmit }) => {
  // Form state
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [orderTypeValue, setOrderTypeValue] = useState('MARKET');

  if (!isOpen) return null;

  const isBuy = orderType === 'BUY';
  const themeColor = isBuy ? 'green' : 'red';

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      symbol: stock?.symbol || 'AAPL',
      side: orderType,
      quantity: parseInt(quantity),
      orderType: orderTypeValue,
      price: orderTypeValue === 'LIMIT' ? parseFloat(price) : null,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order submitted:', orderData);
    onOrderSubmit?.(orderData);
    onClose();
  };

  // Reset form and close modal
  const handleClose = () => {
    setQuantity('');
    setPrice('');
    setOrderTypeValue('MARKET');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header with stock info */}
        <div className={`${isBuy ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded-t-lg`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {orderType} {stock?.symbol || 'AAPL'}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          {stock && (
            <p className="text-sm opacity-90 mt-1">
              {stock.name} - ${stock.currentPrice || stock.lastPrice || stock.askPrice}
            </p>
          )}
        </div>

        {/* Order form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Type
            </label>
            <select
              value={orderTypeValue}
              onChange={(e) => setOrderTypeValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
            </select>
          </div>

          {/* Show price field for limit orders */}
          {orderTypeValue === 'LIMIT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                step="0.01"
                min="0"
                required
              />
            </div>
          )}

          {/* Estimated value */}
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Value:</span>
              <span className="font-medium">
                ${((parseFloat(quantity) || 0) * (parseFloat(price) || stock?.currentPrice || stock?.lastPrice || stock?.askPrice || 0)).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 ${isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white rounded-md transition-colors`}
            >
              {orderType} {stock?.symbol || 'AAPL'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPadModal; 