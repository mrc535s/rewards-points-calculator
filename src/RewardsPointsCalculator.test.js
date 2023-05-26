import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardPointsCalculator from './RewardPointsCalculator';
import { fetchTransactions } from './transactionApi';

jest.mock('./transactionApi', () => ({
  fetchTransactions: jest.fn(),
}));

describe('RewardPointsCalculator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays error message when API call fails', async () => {
    fetchTransactions.mockRejectedValueOnce(new Error('API error'));
    render(<RewardPointsCalculator />);
    const errorMessage = await screen.findByText('Error: Error fetching transaction data');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays rewards information when data is fetched successfully', async () => {
    const transactionData = [
      { id: 1, customerId: 1, customerName: 'John', month: 'January', amount: 120.5 },
      { id: 2, customerId: 1, customerName: 'John', month: 'January', amount: 80.25 },
      { id: 3, customerId: 1, customerName: 'John', month: 'February', amount: 50.75 },
      
    ];
    fetchTransactions.mockResolvedValueOnce(transactionData);

    render(<RewardPointsCalculator />);

    const customerName = await screen.findByText('Customer Name: John');
    const totalRewards = await screen.findByText('Total Rewards: 120')
    const monthOneTotal = await screen.findByText('January: 120')
    const monthTwoTotal = await screen.findByText('February: 0')
    
    expect(customerName).toBeInTheDocument();
    expect(totalRewards).toBeInTheDocument();
    expect(monthOneTotal).toBeInTheDocument();
    expect(monthTwoTotal).toBeInTheDocument();
  });
});
