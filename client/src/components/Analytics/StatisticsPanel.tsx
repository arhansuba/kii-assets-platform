import React, { useState, useEffect } from 'react';
import { Box, Stat, StatLabel, StatNumber, StatGroup, Spinner } from '@chakra-ui/react';
import { fetchUserStatistics } from '../../services/api';

interface UserStatistics {
  totalAssets: number;
  totalValue: number;
  tradesCompleted: number;
}

const StatisticsPanel: React.FC = () => {
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await fetchUserStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching user statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!statistics) {
    return <Box>Unable to load statistics</Box>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <StatGroup>
        <Stat>
          <StatLabel>Total Assets</StatLabel>
          <StatNumber>{statistics.totalAssets}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Value</StatLabel>
          <StatNumber>${statistics.totalValue.toFixed(2)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Trades Completed</StatLabel>
          <StatNumber>{statistics.tradesCompleted}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default StatisticsPanel;