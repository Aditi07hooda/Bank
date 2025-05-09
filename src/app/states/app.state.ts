import { sharedState } from './sharedState.state';
import { Transaction, TransactionList } from './transactionHistory.state';
import { user } from './user.state';

export const AppState : AppStateInterface = {
  user: user,
  transactionHistory: TransactionList,
  shared: sharedState,
}

export interface AppStateInterface {
  user: {},
  transactionHistory: Transaction[];
  shared?: {},
}

