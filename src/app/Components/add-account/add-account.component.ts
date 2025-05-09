import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserStructure } from '../../states/user.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-account',
  imports: [RouterModule,CommonModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css',
})
export class AddAccountComponent {
  store = inject(Store<{ user: UserStructure }>);
  myAcc : string = localStorage.getItem('token') || '';
}
