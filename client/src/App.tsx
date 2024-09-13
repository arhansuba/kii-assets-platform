import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tokenize from './pages/Tokenize';
import Trade from './pages/Trade';
import Dashboard from './pages/Dashboard';
import { Web3Provider } from './contexts/Web3Context';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Web3Provider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tokenize" element={<Tokenize />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App;