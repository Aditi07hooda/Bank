import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStructure } from '../../states/user.state';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-transactions',
  imports: [CommonModule, RouterModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  store = inject(Store<{user: UserStructure}>);
  myAcc: String = localStorage.getItem('token') || '';
}
