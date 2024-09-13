import React, { useEffect, useState } from 'react';
import { getOrderBook } from '../../services/api';

interface Order {
  id: string;
  price: string;
  amount: string;
  type: 'buy' | 'sell';
}

const OrderBook: React.FC = () => {
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderBook();
  }, []);

  const fetchOrderBook = async () => {
    try {
      const { buyOrders, sellOrders } = await getOrderBook();
      setBuyOrders(buyOrders);
      setSellOrders(sellOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order book:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading order book...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Buy Orders</h3>
        <ul className="bg-green-50 rounded-md overflow-hidden">
          {buyOrders.map((order) => (
            <li key={order.id} className="px-4 py-2 border-b border-green-100 last:border-b-0">
              <span className="font-medium">{order.price} KII</span>
              <span className="ml-4 text-sm text-gray-600">{order.amount} units</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Sell Orders</h3>
        <ul className="bg-red-50 rounded-md overflow-hidden">
          {sellOrders.map((order) => (
            <li key={order.id} className="px-4 py-2 border-b border-red-100 last:border-b-0">
              <span className="font-medium">{order.price} KII</span>
              <span className="ml-4 text-sm text-gray-600">{order.amount} units</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;