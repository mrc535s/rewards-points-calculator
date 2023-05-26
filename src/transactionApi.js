export const fetchTransactions = () => {
    // Simulating an asynchronous API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactionData = [
          { id: 1, customerId: 1, customerName: 'John', month: 'January', amount: 120.50 },
          { id: 2, customerId: 1, customerName: 'John', month: 'January', amount: 80.25 },
          { id: 3, customerId: 1, customerName: 'John', month: 'February', amount: 50.75 },
          { id: 4, customerId: 2, customerName: 'Jane', month: 'January', amount: 150.80 },
          { id: 5, customerId: 2, customerName: 'Jane', month: 'February', amount: 70.40 },
          { id: 6, customerId: 2, customerName: 'Jane', month: 'March', amount: 90.60 },
        ];
  
        resolve(transactionData);
      }, 1000); // Simulating a 1-second delay
    });
  };