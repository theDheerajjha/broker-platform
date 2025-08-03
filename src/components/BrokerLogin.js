import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from '../mock/api';

const BrokerLogin = ({ onLoginSuccess }) => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const brokers = [
    { id: 1, name: 'Interactive Brokers', color: 'bg-blue-500' },
    { id: 2, name: 'TD Ameritrade', color: 'bg-green-500' },
    { id: 3, name: 'E*TRADE', color: 'bg-purple-500' },
    { id: 4, name: 'Charles Schwab', color: 'bg-red-500' },
    { id: 5, name: 'Fidelity', color: 'bg-yellow-500' },
    { id: 6, name: 'Robinhood', color: 'bg-pink-500' }
  ];

  const handleBrokerSelect = (broker) => {
    setSelectedBroker(broker);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await mockLogin(email, password);
      
      if (response.status === 200) {
        onLoginSuccess();
        navigate('/holdings');
      } else if (response.status === 400) {
        setError('Invalid credentials');
      } else {
        setError('Server error');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Liquide Broker</h1>
          <p className="text-gray-600">Select your broker to continue</p>
        </div>

        {!selectedBroker ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose Your Broker</h2>
            <div className="grid grid-cols-2 gap-4">
              {brokers.map((broker) => (
                <button
                  key={broker.id}
                  onClick={() => handleBrokerSelect(broker)}
                  className={`${broker.color} hover:opacity-80 text-white font-medium py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-105`}
                >
                  {broker.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Login to {selectedBroker.name}</h2>
              <button
                onClick={() => setSelectedBroker(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Demo Credentials:</p>
                <p>Email: test@liquide.com</p>
                <p>Password: 1234</p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerLogin; 