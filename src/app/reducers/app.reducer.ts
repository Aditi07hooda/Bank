import { reducer as AccountReducer} from "./account.reducer";
import { reducer as sharedReducer } from "./sharedState.reducer";
import { reducer as TransactionReducer } from "./transactionHistory.reducer";

export const AppReducer = {
  user: AccountReducer,
  transactionHistory: TransactionReducer,
  shared: sharedReducer,
}
