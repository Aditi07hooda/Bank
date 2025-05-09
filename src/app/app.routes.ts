import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { DepositComponent } from './Components/deposit/deposit.component';
import { WithdrawComponent } from './Components/withdraw/withdraw.component';
import { TransferMoneyComponent } from './Components/transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { LoanComponent } from './Components/loan/loan.component';
import { HomeLoanComponent } from './Components/home-loan/home-loan.component';
import { EducationLoanComponent } from './Components/education-loan/education-loan.component';
import { PersonalLoanComponent } from './Components/personal-loan/personal-loan.component';
import { LoanHistoryComponent } from './Components/loan-history/loan-history.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { UserComponent } from './Components/admin/users/user.component';
import { LoanRequestComponent } from './Components/admin/loan-request/loan-request.component';
import { HomeLoanComponent as AdminHomeLoan } from './Components/admin/loan-request/home-loan/home-loan.component';
import { EducationLoanComponent as AdminEducationLoan } from './Components/admin/loan-request/education-loan/education-loan.component';
import { PersonalLoanComponent as AdminPersonalLoan } from './Components/admin/loan-request/personal-loan/personal-loan.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account',
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'Transactions',
  },
  {
    path: 'deposit',
    component: DepositComponent,
    title: 'Deposit',
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
    title: 'Withdraw',
  },
  {
    path: 'transfer',
    component: TransferMoneyComponent,
    title: 'Transfer',
  },
  {
    path: 'transactionHistory',
    component: TransactionHistoryComponent,
    title: 'History',
  },
  {
    path: 'loan',
    component: LoanComponent,
    title: 'Loan',
  },
  {
    path: 'home-loan',
    component: HomeLoanComponent,
    title: 'Home Loan',
  },
  {
    path: 'education-loan',
    component: EducationLoanComponent,
    title: 'Education Loan',
  },
  {
    path: 'personal-loan',
    component: PersonalLoanComponent,
    title: 'Personal Loan',
  },
  {
    path: 'loan-history',
    component: LoanHistoryComponent,
    title: 'Loan History',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      {
        path: 'loan-request',
        component: LoanRequestComponent,
        children: [
          { path: 'admin-home-loan', component: AdminHomeLoan },
          { path: 'admin-education-loan', component: AdminEducationLoan },
          { path: 'admin-personal-loan', component: AdminPersonalLoan },
        ],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
