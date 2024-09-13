import React, { useState } from 'react';
import { placeOrder } from '../../services/api';

interface TradeInterfaceProps {
  assetId: string;
}

const TradeInterface: React.FC<TradeInterfaceProps> = ({ assetId }) => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placeOrder({ assetId, orderType, price, amount });
      // Handle success (e.g., show success message, reset form)
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Order Type</label>
        <div className="mt-1">
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'buy' | 'sell')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (KII)</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Place Order
      </button>
    </form>
  );
};

export default TradeInterface;