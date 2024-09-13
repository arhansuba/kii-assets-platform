import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to KiiChain Asset Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/tokenize" className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition">
          <h2 className="text-2xl font-semibold mb-2">Tokenize Assets</h2>
          <p>Convert your real-world assets into digital tokens on the blockchain.</p>
        </Link>
        <Link to="/trade" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition">
          <h2 className="text-2xl font-semibold mb-2">Trade Assets</h2>
          <p>Buy and sell tokenized assets on our decentralized marketplace.</p>
        </Link>
        <Link to="/dashboard" className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition">
          <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
          <p>View your portfolio and manage your tokenized assets.</p>
        </Link>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Learn More</h2>
          <p>Discover how blockchain technology is revolutionizing asset management.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;