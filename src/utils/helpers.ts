// Helper to shorten Ethereum addresses for display
export const shortenAddress = (address: string, start = 6, end = 4): string => {
  if (!address) return '';
  return `${address.substring(0, start)}...${address.substring(
    address.length - end
  )}`;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Generate random color - useful for charts
export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
