import React, { useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchPortfolioHistory } from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PortfolioData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const PortfolioChart: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const history = await fetchPortfolioHistory();
      const labels = history.map(item => item.date);
      const data = history.map(item => item.value);
      
      setPortfolioData({
        labels,
        datasets: [
          {
            label: 'Portfolio Value',
            data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching portfolio history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!portfolioData) {
    return <Box>Unable to load portfolio data</Box>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Value Over Time',
      },
    },
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Line options={options} data={portfolioData} />
    </Box>
  );
};

export default PortfolioChart;