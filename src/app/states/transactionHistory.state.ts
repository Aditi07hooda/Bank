export interface Transaction {
  id: number;
  transactionType: string;
  amount: number;
  transactionDate: string;
}

export const TransactionList: Transaction[] = [];
