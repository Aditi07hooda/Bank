import { Component } from '@angular/core';
import { AppStateInterface } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { Transaction } from '../../states/transactionHistory.state';
import { CommonModule } from '@angular/common';
import { getTransactionList } from '../../actions/transactionHistory.action';

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  transactionList!: Transaction[];

  constructor(
    private store: Store<AppStateInterface>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTransactionList({name: localStorage.getItem('Name')!}));
    this.store.select((state: AppStateInterface) => state.transactionHistory).subscribe((data) => {
      console.log(data);
      this.transactionList = data;
    });
  }
}
