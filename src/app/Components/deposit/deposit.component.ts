import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../states/app.state';
import {
  depositMoney,
  depositMoneyFailure,
  depositMoneySuccess,
} from '../../actions/depositWithdraw.action';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-deposit',
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css',
})
export class DepositComponent {
  constructor(
    private store: Store<{ appStore: AppStateInterface }>,
    private action$: Actions
  ) {
    this.actionSub = this.action$
      .pipe(ofType(depositMoneySuccess))
      .subscribe((data) => {
        this.success = 'Deposit Successful';
        this.error = '';
      });

    this.actionSub.add(
      this.action$.pipe(ofType(depositMoneyFailure)).subscribe((data) => {
        this.success = '';
        this.error = 'Deposit Money Failure';
      })
    );
  }
  money: number = 0;
  name: string = localStorage.getItem('Name') || '';
  deposited: boolean = false;

  success: string = '';
  error: string = '';

  private actionSub: Subscription;

  depositMoney() {
    this.success = '';
    this.error = '';
    this.store.dispatch(depositMoney({ name: this.name, money: this.money }));
    this.deposited = true;
  }
}
