export const isValidAmount = (amount: string) => /^\d+(\.\d{2})?$/.test(amount);
