import React, { useEffect, useState } from 'react';
import { getUserAssets, getUserBalance } from '../services/api';

interface Asset {
  id: string;
  assetType: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [fetchedAssets, fetchedBalance] = await Promise.all([
        getUserAssets(),
        getUserBalance()
      ]);
      setAssets(fetchedAssets);
      setBalance(fetchedBalance);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
        <p className="text-2xl">{balance} KII</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Your Assets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map(asset => (
          <div key={asset.id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">{asset.assetType}</h3>
            <p>Value: {asset.value} KII</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;