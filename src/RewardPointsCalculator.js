import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './transactionApi';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const transactionData = await fetchTransactions();
        setTransactions(transactionData);
      } catch (error) {
        setError('Error fetching transaction data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  useEffect(() => {
    const calculateRewards = () => {
      const rewardsByCustomer = {};

      transactions.forEach((transaction) => {
        const { customerId, customerName, month, amount } = transaction;

        if (!rewardsByCustomer[customerId]) {
          rewardsByCustomer[customerId] = {
            total: 0,
            byMonth: {},
            customerName: customerName,
          };
        }

        const roundedAmount = Math.floor(amount);
        const pointsOver100 = Math.max(roundedAmount - 100, 0) * 2;
        const pointsBetween50And100 = Math.max(Math.min(roundedAmount, 100) - 50, 0);

        const rewardPoints = pointsOver100 + pointsBetween50And100;

        rewardsByCustomer[customerId].total += rewardPoints;

        if (!rewardsByCustomer[customerId].byMonth[month]) {
          rewardsByCustomer[customerId].byMonth[month] = 0;
        }

        rewardsByCustomer[customerId].byMonth[month] += rewardPoints;
      });

      setRewards(rewardsByCustomer);
    };

    calculateRewards();
  }, [transactions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      {Object.entries(rewards).map(([customerId, rewardData]) => (
        <div key={customerId}>
          <h3>Customer Name: {rewardData.customerName}</h3>
          <p>Total Rewards: {rewardData.total}</p>
          <h4>Rewards by Month:</h4>
          {Object.entries(rewardData.byMonth).map(([month, rewardPoints]) => (
            <p key={month}>
              {month}: {rewardPoints}
            </p>
          ))}
        </div>
      ))}
      </section>
  );
};

export default RewardPointsCalculator;
