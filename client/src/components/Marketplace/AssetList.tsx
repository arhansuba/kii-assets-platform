import React, { useEffect, useState } from 'react';
import { getAssets } from '../../services/api';

interface Asset {
  id: string;
  assetType: string;
  value: string;
  location: string;
}

const AssetList: React.FC = () => {
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

  if (loading) {
    return <div>Loading assets...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {assets.map((asset) => (
          <li key={asset.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {asset.assetType}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {asset.value} KII
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {asset.location}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    ID: {asset.id}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;