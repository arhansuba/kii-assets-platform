import React, { useEffect, useState } from 'react';
import { getAssets, buyAsset } from '../services/api';

interface Asset {
  id: string;
  assetType: string;
  value: string;
  owner: string;
}

const Trade: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const fetchedAssets = await getAssets();
      setAssets(fetchedAssets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setLoading(false);
    }
  };

  const handleBuy = async (assetId: string) => {
    try {
      await buyAsset(assetId);
      // Refresh assets after purchase
      fetchAssets();
    } catch (error) {
      console.error('Error buying asset:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trade Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map(asset => (
          <div key={asset.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{asset.assetType}</h2>
            <p className="mb-2">Value: {asset.value} KII</p>
            <p className="mb-4">Owner: {asset.owner}</p>
            <button
              onClick={() => handleBuy(asset.id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Buy Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;