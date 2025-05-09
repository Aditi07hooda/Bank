import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInterface } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { withdrawMoney, withdrawMoneyFailure, withdrawMoneySuccess } from '../../actions/depositWithdraw.action';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-withdraw',
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent {
  constructor(
     private store: Store<{'appStore': AppStateInterface}>,
     private action$: Actions
  ) {
    this.actionSub = this.action$.pipe(ofType(withdrawMoneySuccess)).subscribe((data)=>{
      console.log(data);
      this.success = 'Withdrawal successful!';
      this.error = '';
    })
    this.actionSub.add(
      this.actionSub = this.action$.pipe(ofType(withdrawMoneyFailure)).subscribe((data)=>{
        console.log(data);
        this.error = 'Error during withdrawal. Please try again.';
        this.success = '';
      })
    )
  }

  money: number = 0;
  name: string = localStorage.getItem('Name') || '';
  withdraw: boolean = false;

  success: string = '';
  error: string ='';

  private actionSub: Subscription;

  withdrawMoney() {
    this.success = '';
    this.error = '';
    this.store.dispatch(withdrawMoney({ name: this.name, money: this.money }));
    this.withdraw = true;
  }
}
