import React, { useState } from 'react';
import { tokenizeAsset } from '../../services/api';

interface AssetFormData {
  assetType: string;
  value: string;
  location: string;
  metadata: string;
}

const AssetForm: React.FC = () => {
  const [formData, setFormData] = useState<AssetFormData>({
    assetType: '',
    value: '',
    location: '',
    metadata: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await tokenizeAsset(formData);
      console.log('Asset tokenized:', result);
      // Handle success (e.g., show success message, reset form)
    } catch (error) {
      console.error('Error tokenizing asset:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="assetType" className="block text-sm font-medium text-gray-700">Asset Type</label>
        <input
          type="text"
          id="assetType"
          name="assetType"
          value={formData.assetType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">Metadata</label>
        <textarea
          id="metadata"
          name="metadata"
          value={formData.metadata}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Tokenize Asset
      </button>
    </form>
  );
};

export default AssetForm;