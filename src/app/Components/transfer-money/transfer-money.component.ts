import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../states/app.state';
import {
  transferMoney,
  transferMoneyFailure,
  transferMoneySuccess,
} from '../../actions/depositWithdraw.action';
import { selectError } from '../../selectors/sharedState.selector';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-transfer-money',
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-money.component.html',
  styleUrl: './transfer-money.component.css',
})
export class TransferMoneyComponent {
  store = inject(Store<{ appStore: AppStateInterface }>);

  constructor(private action$: Actions) {
    this.actionsSub = this.action$
      .pipe(ofType(transferMoneySuccess))
      .subscribe((data) => {
        console.log(data);
        this.success = 'The transfer is successful';
        this.error = '';
      });

    this.actionsSub.add(
      this.action$.pipe(ofType(transferMoneyFailure)).subscribe((data) => {
        console.log(data);
        this.success = '';
        this.error = 'The transfer is unsuccessful';
      })
    );
  }

  fromAccName: string = localStorage.getItem('Name') || '';
  toAccName: string = '';
  money: number = 0;
  transfer: boolean = false;
  hasAttemptedTransfer = false;
  error: string = '';
  success: string = '';
  private actionsSub: Subscription;

  transferMoney() {
    this.hasAttemptedTransfer = true;
    this.store.dispatch(
      transferMoney({
        fromAcc: this.fromAccName,
        toAcc: this.toAccName,
        money: this.money,
      })
    );
    this.toAccName = '';
    this.money = 0;
    this.transfer = true;
  }
}
