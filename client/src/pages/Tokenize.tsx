import React, { useState } from 'react';
import { tokenizeAsset } from '../services/api';

interface AssetData {
  assetType: string;
  value: string;
  location: string;
  metadata: string;
}

const Tokenize: React.FC = () => {
  const [assetData, setAssetData] = useState<AssetData>({
    assetType: '',
    value: '',
    location: '',
    metadata: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await tokenizeAsset(assetData);
      console.log('Asset tokenized:', result);
      // Handle success (e.g., show success message, reset form)
    } catch (error) {
      console.error('Error tokenizing asset:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tokenize Your Asset</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="assetType" className="block mb-2">Asset Type</label>
          <input
            type="text"
            id="assetType"
            name="assetType"
            value={assetData.assetType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="value" className="block mb-2">Value</label>
          <input
            type="number"
            id="value"
            name="value"
            value={assetData.value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={assetData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="metadata" className="block mb-2">Metadata</label>
          <textarea
            id="metadata"
            name="metadata"
            value={assetData.metadata}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Tokenize Asset
        </button>
      </form>
    </div>
  );
};

export default Tokenize;