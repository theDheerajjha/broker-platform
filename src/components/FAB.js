import React, { useState, useRef, useEffect } from 'react';

const FAB = ({ onOpenOrderPad, stocks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const fabRef = useRef(null);

  const handleMouseDown = (e) => {
    if (fabRef.current) {
      const rect = fabRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep FAB within viewport bounds
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleFabClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleActionClick = (action) => {
    setIsExpanded(false);

    // Get the first stock from the current page or default to AAPL
    let selectedStock = stocks?.[0];

    if (!selectedStock) {
      // Default stock if no stocks are available
      selectedStock = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currentPrice: 175.50
      };
    }

    onOpenOrderPad(selectedStock, action);
  };

  return (
    <div
      ref={fabRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Main FAB */}
      <button
        onClick={handleFabClick}
        className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform ${isExpanded ? 'scale-110' : 'scale-100'
          }`}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        <span className="text-2xl font-bold">
          {isExpanded ? '×' : '+'}
        </span>
      </button>

      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 left-0 space-y-3">
          {/* Buy Button */}
          <button
            onClick={() => handleActionClick('BUY')}
            className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-lg font-bold">B</span>
          </button>

          {/* Sell Button */}
          <button
            onClick={() => handleActionClick('SELL')}
            className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-lg font-bold">S</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FAB; 