import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface AssetData {
  assetType: string;
  value: string;
  location: string;
  metadata: string;
}

export const tokenizeAsset = async (assetData: AssetData) => {
  const response = await axios.post(`${API_URL}/assets/tokenize`, assetData);
  return response.data;
};

export const getAssets = async () => {
  const response = await axios.get(`${API_URL}/assets`);
  return response.data;
};

export const buyAsset = async (assetId: string) => {
  const response = await axios.post(`${API_URL}/trades/buy`, { assetId });
  return response.data;
};

export const getUserAssets = async () => {
  const response = await axios.get(`${API_URL}/users/assets`);
  return response.data;
};

export const getUserBalance = async () => {
  const response = await axios.get(`${API_URL}/users/balance`);
  return response.data;
};